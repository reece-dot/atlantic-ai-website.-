import React from 'react';

// 1. Icons
const Icon = ({ path, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const Icons = {
  Layout: (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>} />,
  Cpu: (p) => <Icon {...p} path={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></>} />,
  ArrowRight: (p) => <Icon {...p} path={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
};

// 2. Main App Component
function App() {
  return (
    <div style={{ background: "#020408", minHeight: "100vh", color: "#f0f4ff", fontFamily: "sans-serif" }}>
      <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b" }}>
        <div style={{ fontWeight: "bold" }}>ATLANTIC AI</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#solutions" style={{ color: "white", textDecoration: "none" }}>Solutions</a>
          <a href="#contact" style={{ background: "#2563eb", padding: "8px 16px", borderRadius: "6px", color: "white", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      <main style={{ textAlign: "center", paddingTop: "100px", paddingBottom: "100px" }}>
        <h1 style={{ fontSize: "3rem" }}>ATLANTIC AI</h1>
        <p style={{ opacity: 0.7 }}>Engineering High-Performance Digital Solutions.</p>
        <div style={{ marginTop: "30px" }}>
          <Icons.Cpu size={48} color="#3b82f6" />
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "40px", opacity: 0.5, borderTop: "1px solid #1e293b" }}>
        © 2026 Atlantic AI Digital Solutions
      </footer>
    </div>
  );
}

// 3. THE "GOLDEN LINE" (This fixes the latest error)
export default App;
