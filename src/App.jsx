import React, { useState, useEffect } from 'react';
import { 
  Shield, Layout, Cpu, ArrowRight, Diamond, Mail, Phone, CheckCircle2, User
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PillarCard = ({ icon: Icon, title, subtitle, description, features, price, accent }) => (
    <div className="group relative bg-[#0a0c10] border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${accent}-500/10 blur-[80px] group-hover:bg-${accent}-500/20 transition-all`}></div>
      <div className="relative z-10 text-left">
        <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
          <Icon className="text-blue-400 group-hover:text-white" size={30} />
        </div>
        <div className="mb-2">
          <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</span>
          <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
        </div>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">{description}</p>
        <ul className="space-y-4 mb-10">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-xs text-slate-300">
              <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="pt-6 border-t border-slate-800/50 flex justify-between items-end">
          <div>
            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold italic">Starting From</span>
            <p className="text-2xl font-bold text-white tracking-tight">R{price}</p>
          </div>
          <div className="text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-600/20 rounded-xl border border-blue-500/30">
               <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-white leading-none uppercase">Atlantic AI</span>
              <span className="text-[9px] text-blue-500 font-bold tracking-[0.4em] uppercase mt-1">Digital Solutions</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-64 pb-32 px-6 md:px-8 overflow-hidden text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-white/10 px-6 py-2.5 rounded-full mb-12 backdrop-blur-md">
            <Diamond size={14} className="text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">South African Enterprise Excellence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[1.2] py-4">
            ARCHITECTING THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 font-black italic">COMPLETE DIGITAL</span> ECOSYSTEM.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium">
            Engineering high-performance digital infrastructure for visionary businesses. From elite visual identity to custom AI-driven workflows.
          </p>
        </div>
      </section>

      <section id="solutions" className="py-32 px-6 md:px-8 bg-[#04060a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <PillarCard icon={Shield} subtitle="The Foundation" title="Identity & Branding" description="Establish authority with professional systems." features={["Custom Logo Systems", "Strategic Profiles"]} price="4,500" accent="blue" />
            <PillarCard icon={Layout} subtitle="The Engine" title="Web Architecture" description="Secure, responsive, performance-optimized hubs." features={["Performance Design", "Lead Capture"]} price="8,500" accent="cyan" />
