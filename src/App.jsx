import { useState, useEffect, useRef } from "react";

// --- Built-in Icons (No dependencies needed) ---
const Icon = ({ path, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const Icons = {
  Shield: (p) => <Icon {...p} path={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>} />,
  Layout: (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>} />,
  Cpu: (p) => <Icon {...p} path={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></>} />,
  ArrowRight: (p) => <Icon {...p} path={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
  Phone: (p) => <Icon {...p} path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>} />,
  Mail: (p) => <Icon {...p} path={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>} />,
  Menu: (p) => <Icon {...p} path={<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>} />,
  X: (p) => <Icon {...p} path={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />,
  Star: (p) => <Icon {...p} path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>} />,
  ChevronDown: (p) => <Icon {...p} path={<polyline points="6 9 12 15 18 9"/>} />,
  Zap: (p) => <Icon {...p} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />,
  Globe: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />,
  Clock: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />,
  Users: (p) => <Icon {...p} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />,
  CheckCircle: (p) => <Icon {...p} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>} />,
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  :root { --bg: #020408; --blue: #3b82f6; --text: #f0f4ff; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; margin: 0; }
  .btn-primary { background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: 600; }
`;

function Navbar() {
  return (
    <nav style={{ position: "fixed", width: "100%", padding: "20px", background: "rgba(2,4,8,0.8)", backdropFilter: "blur(10px)", zIndex: 100 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: "20px", color: var(--text) }}>ATLANTIC AI</div>
        <div style={{ display: "flex", gap: "20px" }}>
           <a href="#solutions" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a>
           <a href="#contact" className="btn-primary" style={{ padding: "8px 16px" }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <style>{globalStyles}</style>
      <Navbar />
      <section style={{ paddingTop: "150px", textAlign: "center", padding: "150px 20px" }}>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontFamily: "Syne", margin: 0 }}>ATLANTIC AI</h1>
        <p style={{ opacity: 0.6, maxWidth: "600px", margin: "20px auto" }}>Engineering Digital Excellence in South Africa.</p>
        <a href="#contact" className="btn-primary">Get Started <Icons.ArrowRight size={18}/></a>
      </section>
      
      <section id="solutions" style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <div style={{ background: "#080c12", padding: "40px", borderRadius: "20px", border: "1px solid #1e293b" }}>
               <Icons.Layout color="#3b82f6" />
               <h3 style={{ fontFamily: "Syne" }}>Web Architecture</h3>
               <p style={{ opacity: 0.7 }}>High-performance infrastructure for modern brands.</p>
            </div>
            <div style={{ background: "#080c12", padding: "40px", borderRadius: "20px", border: "1px solid #1e293b" }}>
               <Icons.Cpu color="#3b82f6" />
               <h3 style={{ fontFamily: "Syne" }}>AI Automation</h3>
               <p style={{ opacity: 0.7 }}>Workflows that scale your business automatically.</p>
            </div>
         </div>
      </section>

      <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #1e293b", opacity: 0.5, fontSize: "12px" }}>
        © 2026 Atlantic AI Digital Solutions · Durban, SA
      </footer>
    </div>
  );
}
