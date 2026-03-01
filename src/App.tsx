import React, { useState, useEffect } from 'react';
import { GECCompiler, GECResult } from './compiler/GECCompiler';
import { 
  Terminal, 
  Play, 
  Shield, 
  Book, 
  Code2, 
  Lock, 
  Cpu,
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEFAULT_CODE = `// GEC++ Kernel Initialization
fn main() {
    let mut kernel_version = "0.1.0-alpha";
    let memory_limit = 4096;
    
    out << "Initializing GEC++ Secure Kernel...";
    
    audit! {
        Kernel boot sequence initiated.
        Memory Limit: \${memory_limit}MB
    }

    let ptr = alloc(1024);
    out << "Allocated secure buffer at: " << ptr;

    if (memory_limit < 1024) {
        panic!("Insufficient memory for secure boot!");
    }

    out << "Kernel Status: Operational";
}

main();`;

export default function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState<GECResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'docs' | 'cli'>('editor');
  const [compiler] = useState(new GECCompiler());

  const handleRun = async () => {
    setIsRunning(true);
    const res = await compiler.execute(code);
    setResult(res);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E1E1E3] font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0F0F11]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">GEC++ <span className="text-emerald-500 font-mono text-sm ml-1">Kernel v1.0</span></h1>
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Secure Systems Programming</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setActiveTab('editor')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === 'editor' ? "bg-emerald-500 text-black shadow-lg" : "text-white/60 hover:text-white"
                )}
              >
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('docs')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === 'docs' ? "bg-emerald-500 text-black shadow-lg" : "text-white/60 hover:text-white"
                )}
              >
                Docs
              </button>
              <button 
                onClick={() => setActiveTab('cli')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === 'cli' ? "bg-emerald-500 text-black shadow-lg" : "text-white/60 hover:text-white"
                )}
              >
                CLI & Git
              </button>
            </div>
            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 transition-all text-black font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <Play className={cn("w-4 h-4", isRunning && "animate-pulse")} />
              {isRunning ? 'Booting...' : 'Run Kernel'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-88px)]">
        {/* Left Column: Editor/Docs */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' ? (
              <motion.div 
                key="editor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/60">kernel_init.gecpp</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full bg-transparent p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed text-emerald-50/90"
                />
              </motion.div>
            ) : activeTab === 'docs' ? (
              <motion.div 
                key="docs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 bg-[#0F0F11] border border-white/5 rounded-2xl overflow-y-auto p-8 prose prose-invert prose-emerald max-w-none"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Book className="text-emerald-500" /> GEC++ Kernel Specification
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <h3 className="text-emerald-400 mt-0">Rust-Inspired Safety</h3>
                    <p className="text-sm text-white/70">GEC++ adopts Rust's immutability by default. Variables are immutable unless declared with <code className="text-emerald-400">let mut</code>.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <h3 className="text-emerald-400 mt-0">Kernel Primitives</h3>
                    <ul className="text-sm text-white/70 list-disc pl-4">
                      <li><code className="text-emerald-400">alloc()</code>: Secure heap allocation</li>
                      <li><code className="text-emerald-400">panic!()</code>: Immediate kernel halt</li>
                      <li><code className="text-emerald-400">audit!{}</code>: Hardware-level logging</li>
                    </ul>
                  </div>
                </div>

                <h3>Syntax Reference</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2">Keyword</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 font-mono text-emerald-400">fn</td>
                      <td className="py-2">Function declaration (Rust style).</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-emerald-400">let</td>
                      <td className="py-2">Immutable variable declaration.</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-emerald-400">let mut</td>
                      <td className="py-2">Mutable variable declaration.</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-emerald-400">panic!()</td>
                      <td className="py-2">Triggers a kernel panic and halts execution.</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Kernel Example</h3>
                <pre className="bg-black/40 p-4 rounded-lg font-mono text-xs">
{`fn init_hardware() {
    let mut status = 0;
    audit! { Hardware check initiated }
    if (status != 0) {
        panic!("Hardware failure!");
    }
}`}
                </pre>
              </motion.div>
            ) : (
              <motion.div 
                key="cli"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex-1 bg-[#0F0F11] border border-white/5 rounded-2xl overflow-y-auto p-8 prose prose-invert prose-emerald max-w-none"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Terminal className="text-emerald-500" /> CLI & GitHub Integration
                </h2>
                
                <p className="text-white/70">To use GEC++ on your Linux x86-64 system, follow these steps to build and install the compiler from source.</p>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-8">
                  <h4 className="text-emerald-400 m-0 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> GitHub Repository Structure
                  </h4>
                  <pre className="text-xs mt-2 bg-black/20 p-3 rounded">
{`gecpp-kernel/
├── Makefile          # Installation script
├── cli/              # Compiler source
│   ├── gecpp.js      # Core logic
│   ├── package.json  # Build config
│   └── README.md     # CLI docs
└── src/              # IDE source`}
                  </pre>
                </div>

                <h3>1. Push to GitHub</h3>
                <pre className="bg-black/40 p-4 rounded-lg font-mono text-xs">
{`git init
git add .
git commit -m "Initial GEC++ Kernel Release"
git remote add origin https://github.com/user/gecpp.git
git push -u origin main`}
                </pre>

                <h3>2. Build & Install (Linux x86-64)</h3>
                <pre className="bg-black/40 p-4 rounded-lg font-mono text-xs">
{`# Clone and enter directory
git clone https://github.com/user/gecpp.git
cd gecpp

# Use the provided Makefile to build and install
sudo make install`}
                </pre>

                <h3>3. Verify Installation</h3>
                <pre className="bg-black/40 p-4 rounded-lg font-mono text-xs">
{`gecpp --version
# Output: GEC++ Compiler v1.0.0 (x86-64 Linux)`}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Console & Status */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          {/* Output Console */}
          <div className="flex-1 bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">Kernel Console</span>
              </div>
            </div>
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2">
              {!result && (
                <div className="text-white/20 italic">No kernel logs. Click 'Run Kernel' to boot.</div>
              )}
              {result?.error && (
                <div className="flex gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs uppercase mb-1">Kernel Panic</div>
                    {result.error}
                  </div>
                </div>
              )}
              {result?.output.map((line, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className={cn(
                    "flex gap-3 items-start",
                    line.startsWith("[KERNEL_AUDIT]") ? "text-amber-400" : 
                    line.startsWith("[MEM]") ? "text-blue-400" : "text-emerald-50/80"
                  )}
                >
                  <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 opacity-30" />
                  <span>{line}</span>
                </motion.div>
              ))}
              {result && !result.error && (
                <div className="pt-4 flex items-center gap-2 text-emerald-500/60 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Kernel Boot Finished
                </div>
              )}
            </div>
          </div>

          {/* Security Stats */}
          <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Kernel Status
            </h3>
            <div className="space-y-3">
              <StatItem label="Memory Isolation" value="Enabled" color="text-emerald-500" />
              <StatItem label="Rust-Style Safety" value="Active" color="text-blue-400" />
              <StatItem label="Privilege Level" value="Ring 0" color="text-amber-400" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-[#0F0F11] border-t border-white/5 px-6 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Kernel Environment Active
          </div>
          <div>GEC++ v1.0.0-kernel</div>
        </div>
        <div className="flex items-center gap-4">
          <div>Memory: 4096MB</div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" /> Ring 0
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">{label}</span>
      <span className={cn("text-sm font-mono font-bold", color)}>{value}</span>
    </div>
  );
}
