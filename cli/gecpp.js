const fs = require('fs');
const path = require('path');

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

function compile(code) {
  let js = code;
  js = js.replace(/\/\/.*/g, '');
  js = js.replace(/\bfn\b/g, 'async function');
  js = js.replace(/\blet\s+mut\b/g, 'let');
  js = js.replace(/\blet\b/g, 'const');
  js = js.replace(/\bpanic!\((.*?)\)/g, '_sec.panic($1)');
  js = js.replace(/\balloc\((.*?)\)/g, '_sec.alloc($1)');
  js = js.replace(/\baudit!\{(.*?)\}/gs, '_sec.audit(\`$1\`)');
  
  // Handle stream operators out << "msg" << endl;
  js = js.replace(/\bout\s*<<\s*(.*?);/g, (match, p1) => {
    const parts = p1.split('<<').map(p => p.trim());
    return parts.map(p => `out.write(${p === 'endl' ? 'out.endl' : p})`).join('; ') + ';';
  });

  return `
(async () => {
  ${stdLib}
  try {
    ${js}
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();`;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("GEC++ Compiler v1.0.0");
  console.log("Usage: gecpp <file.gecpp>");
  process.exit(0);
}

const filePath = path.resolve(args[0]);
if (!fs.existsSync(filePath)) {
  console.error("Error: File not found " + filePath);
  process.exit(1);
}

const code = fs.readFileSync(filePath, 'utf8');
const compiledJs = compile(code);

// For a real compiler, we might output an executable. 
// Here we execute it via the Node runtime for the demo.
const tempFile = filePath + ".tmp.js";
fs.writeFileSync(tempFile, compiledJs);

const { execSync } = require('child_process');
try {
  execSync(`node ${tempFile}`, { stdio: 'inherit' });
} catch (e) {
  // Error handled by child process stdio
} finally {
  fs.unlinkSync(tempFile);
}
