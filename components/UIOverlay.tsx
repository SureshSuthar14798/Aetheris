
import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Layers, 
  Terminal
} from 'lucide-react';

interface UIOverlayProps {
  onLaunch: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <section className={`h-screen w-screen flex flex-col justify-center items-center px-10 relative ${className}`}>
    {children}
  </section>
);

const UIOverlay: React.FC<UIOverlayProps> = ({ onLaunch }) => {
  return (
    <div className="w-screen select-none">
      {/* 1. HERO SECTION */}
      <Section>
        <div className="max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-cyan-400 glass rounded-full border border-cyan-500/30 animate-pulse">
            VERSION 4.0 PROTOCOL IS LIVE
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight uppercase font-display">
            DECENTRALIZE <br />
            <span className="text-cyan-400">THE FUTURE.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            The first neural-integrated liquidity protocol built for the high-performance autonomous economy.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onLaunch}
              className="px-10 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2 group neon-glow"
            >
              LAUNCH TERMINAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border-white/20">
              VIEW WHITEPAPER
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </Section>

      {/* 2. ABOUT / INTRO */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-display">ENGINEERED FOR <br/><span className="text-cyan-400">SPEED.</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Traditional finance is slow, opaque, and brittle. Aetheris reimagines the stack from the hardware up, providing sub-millisecond settlement for global assets.
            </p>
            <div className="flex gap-4">
               <div className="glass p-4 rounded-xl border-cyan-500/20">
                  <div className="text-cyan-400 font-bold text-2xl">0.4ms</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Latency</div>
               </div>
               <div className="glass p-4 rounded-xl border-cyan-500/20">
                  <div className="text-cyan-400 font-bold text-2xl">99.9%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Efficiency</div>
               </div>
            </div>
          </div>
          <div className="relative group hidden md:block">
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="glass p-8 rounded-2xl relative border-white/5">
              <Terminal className="w-12 h-12 text-cyan-400 mb-6" />
              <div className="space-y-3 font-mono text-sm text-cyan-400/70">
                <p>&gt; initializing aetheris_core...</p>
                <p>&gt; syncing neural_mesh_network...</p>
                <p>&gt; optimization_sequence: [OK]</p>
                <p>&gt; current_throughput: 2.4M tps</p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. FEATURES */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight font-display">CORE CAPABILITIES</h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {[
            { icon: <Shield className="w-8 h-8"/>, title: "Vault Architecture", desc: "Multi-sig atomic security protocols ensuring asset integrity at every layer." },
            { icon: <Zap className="w-8 h-8"/>, title: "Neural Liquidity", desc: "AI-driven market making that predicts volatility before it happens." },
            { icon: <Layers className="w-8 h-8"/>, title: "Cross-Chain Sync", desc: "Seamless interoperability between L1s, L2s and legacy systems." }
          ].map((feat, i) => (
            <div key={i} className="glass p-8 rounded-3xl group hover:border-cyan-500/50 transition-all cursor-pointer">
              <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform origin-left">{feat.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. SHOWCASE */}
      <Section>
        <div className="max-w-4xl text-center">
           <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter italic font-display">THE PROTOCOL <span className="text-cyan-400">UNFOLDING.</span></h2>
           <div className="flex justify-center items-center gap-12 mt-12 opacity-50">
              <img src="https://picsum.photos/id/1/120/40?grayscale" alt="partner" className="h-8 filter brightness-200" />
              <img src="https://picsum.photos/id/2/120/40?grayscale" alt="partner" className="h-8 filter brightness-200" />
              <img src="https://picsum.photos/id/3/120/40?grayscale" alt="partner" className="h-8 filter brightness-200" />
              <img src="https://picsum.photos/id/4/120/40?grayscale" alt="partner" className="h-8 filter brightness-200" />
           </div>
        </div>
      </Section>

      {/* 5. STATS */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
           {[
             { label: "Assets Secured", val: "$12.4B+" },
             { label: "Active Nodes", val: "48,201" },
             { label: "Avg. TxFee", val: "<$0.01" },
             { label: "Uptime", val: "99.999%" }
           ].map((stat, i) => (
             <div key={i} className="text-center glass py-12 rounded-2xl">
               <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-display">{stat.val}</div>
               <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-bold">{stat.label}</div>
             </div>
           ))}
        </div>
      </Section>

      {/* 6. HOW IT WORKS */}
      <Section>
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl font-bold mb-12 text-center font-display">THE ECOSYSTEM PATH</h2>
          <div className="space-y-8 relative">
             <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-cyan-500/20 md:left-1/2"></div>
             {[
               { step: "01", title: "Integration", desc: "Connect your infrastructure to the Aetheris Mesh API." },
               { step: "02", title: "Allocation", desc: "Deploy capital across automated neutral strategy vaults." },
               { step: "03", title: "Optimization", desc: "Neural engines continuously rebalance for maximum efficiency." }
             ].map((item, i) => (
               <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative z-10`}>
                 <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                   {item.step}
                 </div>
                 <div className={`glass p-6 rounded-2xl flex-1 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                   <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                   <p className="text-gray-400 text-sm">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </Section>

      {/* 7. BACKGROUND VISUAL (Focus on 3D) */}
      <Section>
        <div className="text-center max-w-3xl">
          <h2 className="text-6xl font-black mb-6 opacity-20 select-none font-display uppercase tracking-widest">PERPETUAL MOTION</h2>
          <p className="text-cyan-400/50 italic tracking-widest uppercase text-xs">Aetheris Engine v4.0.012-ALPHA</p>
        </div>
      </Section>

      {/* 8. TESTIMONIALS */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
           {[
             { name: "Alex Rivers", role: "CTO, NeonVentures", text: "The first protocol that actually delivers on the promise of sub-millisecond settlement without sacrificing security." },
             { name: "Sarah Chen", role: "Lead Dev, LiquidGrid", text: "Integrating with Aetheris was the single best decision for our scalability roadmap this year." }
           ].map((t, i) => (
             <div key={i} className="glass p-10 rounded-3xl relative">
                <div className="text-5xl text-cyan-500/20 absolute top-4 left-4 font-serif">"</div>
                <p className="text-lg text-gray-300 mb-8 italic relative z-10 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500"></div>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t.role}</div>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </Section>

      {/* 9. CTA */}
      <Section className="bg-cyan-500/5">
        <div className="max-w-4xl text-center px-4">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none font-display">
            READY TO <br />
            <span className="text-cyan-400">EVOLVE?</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
             <button 
               onClick={onLaunch}
               className="px-12 py-5 bg-white text-black font-black text-lg rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl"
             >
               ENTER APP <ArrowRight className="w-6 h-6" />
             </button>
             <button className="px-12 py-5 glass text-white font-black text-lg rounded-full hover:bg-white/10 transition-all border-white/20">
               DOCUMENTATION
             </button>
          </div>
          <p className="mt-12 text-gray-500 text-xs tracking-widest uppercase font-bold">
            NO CREDIT CARD REQUIRED. FULL DECENTRALIZED ACCESS.
          </p>
        </div>
      </Section>

      {/* 10. FOOTER */}
      <Section className="!h-auto py-24 border-t border-white/5">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-cyan-400 mb-6 font-display">AETHERIS</div>
            <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
              Advancing the state of decentralized autonomous finance through neural mesh networking and high-performance protocols.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Protocol</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Governance</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Community</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Ecosystem Fund</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Grants</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 tracking-widest uppercase font-bold">
          <div>© 2025 AETHERIS PROTOCOL FOUNDATION. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default UIOverlay;
