function Navbar() {
  return (
    <nav style={{ position: "fixed", width: "100%", padding: "20px", background: "rgba(2,4,8,0.8)", backdropFilter: "blur(10px)", zIndex: 100 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: "20px", color: "#f0f4ff" }}>ATLANTIC AI</div>
        <div style={{ display: "flex", gap: "20px" }}>
           <a href="#solutions" style={{ color: "white", textDecoration: "none" }}>Solutions</a>
           <a href="#contact" className="btn-primary" style={{ padding: "8px 16px" }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
