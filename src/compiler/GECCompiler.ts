export interface GECResult {
  output: string[];
  error?: string;
  jsCode?: string;
}

export class GECCompiler {
  private stdLib = `
    const _sec = {
      sha256: async (text) => {
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      },
      audit: (msg) => console.log("[KERNEL_AUDIT]: " + msg),
      panic: (msg) => { throw new Error("KERNEL PANIC: " + msg); },
      alloc: (size) => { console.log("[MEM]: Allocated " + size + " bytes"); return "0x" + Math.random().toString(16).slice(2, 10); }
    };
    const print = (...args) => _output.push(args.join(' '));
  `;

  compile(code: string): string {
    let js = code;

    // 1. Handle Comments
    js = js.replace(/\/\/.*/g, '');

    // 2. Syntax Transformation (GEC++ to JS)
    
    // Rust-like Keywords
    js = js.replace(/\bfn\b/g, 'async function');
    js = js.replace(/\blet\s+mut\b/g, 'let');
    js = js.replace(/\blet\b/g, 'const');
    
    // Kernel Primitives
    js = js.replace(/\bpanic!\((.*?)\)/g, '_sec.panic($1)');
    js = js.replace(/\balloc\((.*?)\)/g, '_sec.alloc($1)');
    js = js.replace(/\baudit!\{(.*?)\}/gs, '_sec.audit(`$1`)');
    
    // C++ style print
    js = js.replace(/\bout\s*<<\s*(.*?);/g, 'print($1);');
    
    // Wrap in async IIFE
    return `(async () => {
      const _output = [];
      ${this.stdLib}
      try {
        ${js}
      } catch (e) {
        _output.push(e.message);
      }
      return _output;
    })()`;
  }

  async execute(code: string): Promise<GECResult> {
    const jsCode = this.compile(code);
    try {
      const output = await eval(jsCode);
      return { output, jsCode };
    } catch (e: any) {
      return { output: [], error: e.message, jsCode };
    }
  }
}
