import React, { useState } from 'react';
import { 
  Terminal, 
  Shield, 
  Book, 
  Code2, 
  Lock, 
  Cpu,
  ChevronRight,
  Download,
  Github,
  Command,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'install' | 'usage' | 'syntax'>('install');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E1E1E3] font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0F0F11]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">GEC++ <span className="text-emerald-500 font-mono text-sm ml-1">CLI v1.0</span></h1>
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Secure Kernel Compiler</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
            <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition-all text-black font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download className="w-4 h-4" />
              Download CLI
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto p-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hero & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest"
              >
                <Zap className="w-3 h-3" />
                Now with -O2 Optimization
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold leading-tight"
              >
                The Secure <br />
                <span className="text-emerald-500">Kernel Compiler</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/60 leading-relaxed"
              >
                GEC++ is a high-performance, Rust-inspired language designed for kernel development. 
                Our CLI compiler provides native x86-64 builds with built-in security auditing.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FeatureCard icon={<Lock />} title="Ring 0 Secure" desc="Hardware-level primitives" />
              <FeatureCard icon={<Cpu />} title="x86-64 Native" desc="Optimized for Linux" />
              <FeatureCard icon={<Zap />} title="-O2 Flags" desc="High-level optimization" />
              <FeatureCard icon={<Command />} title="Simple CLI" desc="Easy build integration" />
            </div>
          </div>

          {/* Right Column: Terminal & Docs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex border-b border-white/5 bg-white/[0.02]">
                <TabButton active={activeTab === 'install'} onClick={() => setActiveTab('install')} label="Installation" />
                <TabButton active={activeTab === 'usage'} onClick={() => setActiveTab('usage')} label="Usage & Flags" />
                <TabButton active={activeTab === 'syntax'} onClick={() => setActiveTab('syntax')} label="Syntax" />
              </div>

              <div className="p-8 min-h-[400px]">
                {activeTab === 'install' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-emerald-400 font-bold">One-Step Installation</h3>
                      <p className="text-sm text-white/40">Run the following command in your project root to build and install the compiler globally.</p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4 font-mono text-sm border border-white/5 group relative">
                      <div className="text-emerald-500/50 mb-2"># Build and install to /usr/local/bin</div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500">$</span>
                        <span>sudo make install</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-white/60">Downloads Node.js dependencies for the compiler engine.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-white/60">Bundles the source into a native x86-64 Linux binary.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-white/60">Installs the <code className="text-emerald-400">gecpp</code> command to your system path.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'usage' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Optimization Flag</span>
                          <span className="text-[10px] text-white/20 font-mono">-O2</span>
                        </div>
                        <p className="text-sm text-white/70 italic">"Minifies output and strips all non-essential metadata for kernel production."</p>
                        <code className="block mt-3 p-2 bg-black/20 rounded text-xs font-mono">gecpp -O2 main.gecpp</code>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Run Immediately</span>
                          <span className="text-[10px] text-white/20 font-mono">-r, --run</span>
                        </div>
                        <p className="text-sm text-white/70 italic">"Compile and execute the kernel module in the current environment."</p>
                        <code className="block mt-3 p-2 bg-black/20 rounded text-xs font-mono">gecpp -r main.gecpp</code>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Output Selection</span>
                          <span className="text-[10px] text-white/20 font-mono">-o</span>
                        </div>
                        <p className="text-sm text-white/70 italic">"Specify a custom name for the compiled output file."</p>
                        <code className="block mt-3 p-2 bg-black/20 rounded text-xs font-mono">gecpp -o kernel.bin main.gecpp</code>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'syntax' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Keywords</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">fn</span><span className="text-white/20">Function</span></div>
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">let</span><span className="text-white/20">Immutable</span></div>
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">let mut</span><span className="text-white/20">Mutable</span></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Macros</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">panic!()</span><span className="text-white/20">Halt</span></div>
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">audit!{}</span><span className="text-white/20">Log</span></div>
                          <div className="flex justify-between text-sm font-mono"><span className="text-emerald-400">alloc()</span><span className="text-white/20">Memory</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4 font-mono text-xs border border-white/5">
                      <div className="text-white/20 mb-2">// Example Kernel Module</div>
                      <div className="text-emerald-400">fn</div> main() {"{"}
                      <div className="pl-4">
                        <div className="text-emerald-400">let</div> mut status = 0;
                        <br />
                        audit! {"{"} System Boot {"}"}
                        <br />
                        out {"<<"} "Kernel Active" {"<<"} endl;
                      </div>
                      {"}"}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#0F0F11]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 opacity-40">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight">GEC++ PROJECT</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-emerald-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Security Audit</a>
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-white/10">
            © 2026 GEC++ SECURE SYSTEMS
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      </div>
      <div>
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs text-white/40">{desc}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2",
        active ? "text-emerald-500 border-emerald-500 bg-emerald-500/5" : "text-white/20 border-transparent hover:text-white/40"
      )}
    >
      {label}
    </button>
  );
}
