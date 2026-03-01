#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION = "1.0.0-kernel-secure";

const stdLib = `
const _sec = {
  sha256: async (text) => {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(text).digest('hex');
  },
  audit: (msg) => console.log("\\x1b[33m[KERNEL_AUDIT]:\\x1b[0m " + msg),
  panic: (msg) => { 
    console.error("\\x1b[31mKERNEL PANIC:\\x1b[0m " + msg);
    process.exit(1);
  },
  alloc: (size) => { 
    const addr = "0x" + Math.random().toString(16).slice(2, 10);
    console.log("\\x1b[34m[MEM]:\\x1b[0m Allocated " + size + " bytes at " + addr); 
    return addr; 
  }
};
const out = {
  write: (msg) => process.stdout.write(msg.toString()),
  endl: "\\n"
};
`;

function compile(code, options = {}) {
  let js = code;

  // Optimization Level -O2
  if (options.optimization === 2) {
    // Remove all comments and extra whitespace
    js = js.replace(/\/\/.*/g, '');
    js = js.replace(/\/\*[\s\S]*?\*\//g, '');
    js = js.replace(/\s+/g, ' ');
  } else {
    js = js.replace(/\/\/.*/g, '');
  }

  // Syntax Transformation
  js = js.replace(/\bfn\b/g, 'async function');
  js = js.replace(/\blet\s+mut\b/g, 'let');
  js = js.replace(/\blet\b/g, 'const');
  js = js.replace(/\bpanic!\((.*?)\)/g, '_sec.panic($1)');
  js = js.replace(/\balloc\((.*?)\)/g, '_sec.alloc($1)');
  js = js.replace(/\baudit!\{(.*?)\}/gs, '_sec.audit(\`$1\`)');
  
  // Stream operators
  js = js.replace(/\bout\s*<<\s*(.*?);/g, (match, p1) => {
    const parts = p1.split('<<').map(p => p.trim());
    return parts.map(p => `out.write(${p === 'endl' ? 'out.endl' : p})`).join('; ') + ';';
  });

  let output = `
(async () => {
  ${stdLib}
  try {
    ${js}
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();`;

  if (options.optimization === 2) {
    output = output.replace(/\s+/g, ' ').trim();
  }

  return output;
}

function printHelp() {
  console.log(`GEC++ Secure Kernel Compiler v${VERSION}`);
  console.log("Usage: gecpp [options] <file.gecpp>");
  console.log("");
  console.log("Options:");
  console.log("  -o <file>      Specify output file");
  console.log("  -O2            Enable high-level optimizations");
  console.log("  -r, --run      Compile and run immediately");
  console.log("  -v, --version  Show version information");
  console.log("  -h, --help     Show this help message");
}

const args = process.argv.slice(2);
let inputFile = null;
let outputFile = null;
let optimization = 0;
let runImmediately = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-o') {
    outputFile = args[++i];
  } else if (arg === '-O2') {
    optimization = 2;
  } else if (arg === '-r' || arg === '--run') {
    runImmediately = true;
  } else if (arg === '-v' || arg === '--version') {
    console.log(`GEC++ v${VERSION}`);
    process.exit(0);
  } else if (arg === '-h' || arg === '--help') {
    printHelp();
    process.exit(0);
  } else if (!arg.startsWith('-')) {
    inputFile = arg;
  }
}

if (!inputFile) {
  printHelp();
  process.exit(1);
}

const fullInputPath = path.resolve(inputFile);
if (!fs.existsSync(fullInputPath)) {
  console.error(`Error: File not found ${fullInputPath}`);
  process.exit(1);
}

const code = fs.readFileSync(fullInputPath, 'utf8');
const compiledJs = compile(code, { optimization });

if (runImmediately) {
  const tempFile = fullInputPath + ".tmp.js";
  fs.writeFileSync(tempFile, compiledJs);
  try {
    execSync(`node ${tempFile}`, { stdio: 'inherit' });
  } catch (e) {}
  fs.unlinkSync(tempFile);
} else {
  const outPath = outputFile || (inputFile.replace(/\.gecpp$/, '') + ".js");
  fs.writeFileSync(outPath, compiledJs);
  console.log(`Successfully compiled ${inputFile} -> ${outPath} [O${optimization}]`);
}
