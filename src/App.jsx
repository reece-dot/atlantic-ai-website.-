import { useState, useEffect, useRef } from "react";

import {
  Shield,
  Layout,
  Cpu,
  ArrowRight,
  Phone,
  Mail,
  Menu,
  X,
  Star,
  ChevronDown,
  Zap,
  Globe,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #020408;
    --bg-card: #080c12;
    --bg-card2: #0c111a;
    --border: rgba(255,255,255,0.06);
    --border-blue: rgba(59,130,246,0.25);
    --blue: #3b82f6;
    --blue-glow: rgba(59,130,246,0.15);
    --blue-bright: #60a5fa;
    --text-primary: #f0f4ff;
    --text-secondary: #8b9ab5;
    --text-muted: #4a5568;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.02em;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }

  @keyframes gridDrift {
    0% { transform: translate(0, 0); }
    33% { transform: translate(-20px, -15px); }
    66% { transform: translate(15px, -25px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    50% { transform: translate(30px, -40px) scale(1.1); opacity: 0.6; }
  }

  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    50% { transform: translate(-25px, 30px) scale(0.9); opacity: 0.5; }
  }

  @keyframes orbFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.2; }
    50% { transform: translate(20px, 20px) scale(1); opacity: 0.4; }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(8px); opacity: 1; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-animate-1 { animation: fadeSlideUp 0.7s ease forwards 0.1s; opacity: 0; }
  .hero-animate-2 { animation: fadeSlideUp 0.7s ease forwards 0.25s; opacity: 0; }
  .hero-animate-3 { animation: fadeSlideUp 0.7s ease forwards 0.4s; opacity: 0; }
  .hero-animate-4 { animation: fadeSlideUp 0.7s ease forwards 0.55s; opacity: 0; }
  .hero-animate-5 { animation: fadeSlideUp 0.7s ease forwards 0.7s; opacity: 0; }

  .fade-section {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fade-section.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.2);
    border-color: rgba(59,130,246,0.3) !important;
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: white;
    padding: 14px 28px;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.03em;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
    text-decoration: none;
  }

  .btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px rgba(59,130,246,0.4);
    filter: brightness(1.1);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-primary);
    padding: 13px 28px;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.03em;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s;
    text-decoration: none;
  }

  .btn-ghost:hover {
    transform: translateY(-2px) scale(1.02);
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.3);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }

  .section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-label::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--blue);
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s ease-in-out infinite;
  }

  input, select, textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 8px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  input::placeholder, textarea::placeholder {
    color: var(--text-muted);
  }

  input:focus, select:focus, textarea:focus {
    border-color: rgba(59,130,246,0.5);
    background: rgba(59,130,246,0.04);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
  }

  select option {
    background: #0c111a;
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .desktop-timeline { display: none; }
    .mobile-timeline { display: flex; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .solutions-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    .testimonial-grid { grid-template-columns: 1fr; }
    .footer-inner { flex-direction: column; gap: 32px; }
  }

  @media (min-width: 769px) {
    .mobile-timeline { display: none; }
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ size = 32 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#0f1928" />
        <path d="M20 6 L34 14 L34 26 L20 34 L6 26 L6 14 Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path d="M20 12 L28 17 L28 23 L20 28 L12 23 L12 17 Z" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" fill="#3b82f6" />
        <path d="M20 6 L20 12 M34 14 L28 17 M34 26 L28 23 M20 34 L20 28 M6 26 L12 23 M6 14 L12 17" stroke="rgba(59,130,246,0.5)" strokeWidth="1" />
      </svg>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px", letterSpacing: "-0.01em", color: "#f0f4ff", lineHeight: 1.1 }}>
          ATLANTIC AI
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.18em", color: "#3b82f6", textTransform: "uppercase", lineHeight: 1 }}>
          Digital Solutions
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = ["Solutions", "Process", "About", "Contact"];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(2,4,8,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
              color: "rgba(240,244,255,0.7)", letterSpacing: "0.03em",
              transition: "color 0.2s", padding: "4px 0",
            }}
            onMouseEnter={e => e.target.style.color = "#f0f4ff"}
            onMouseLeave={e => e.target.style.color = "rgba(240,244,255,0.7)"}
            >
              {link}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("Contact")} style={{ padding: "10px 20px", fontSize: "13px" }}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#f0f4ff" }} className="mobile-menu-btn">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(8,12,18,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px 28px",
          display: "flex", flexDirection: "column", gap: "4px",
        }}>
          {navLinks.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 600,
              color: "rgba(240,244,255,0.8)", textAlign: "left",
              padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
              transition: "color 0.2s",
            }}>
              {link}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("Contact")} style={{ marginTop: "16px", justifyContent: "center" }}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{
      minHeight: "100vh", position: "relative", display: "flex",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: "var(--bg)",
    }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{
        position: "absolute", top: "15%", left: "8%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "orbFloat1 12s ease-in-out infinite",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "5%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        filter: "blur(50px)",
        animation: "orbFloat2 15s ease-in-out infinite",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "30%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "orbFloat3 18s ease-in-out infinite",
        zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 100px", textAlign: "center" }}>

        <div className="hero-animate-1" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: "100px", padding: "6px 16px 6px 10px", marginBottom: "32px",
        }}>
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%", background: "#3b82f6",
            animation: "pulse-dot 2s ease-in-out infinite",
            boxShadow: "0 0 8px rgba(59,130,246,0.8)",
          }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "#60a5fa" }}>
            South African Enterprise Excellence
          </span>
        </div>

        <h1 className="hero-animate-2" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(38px, 6vw, 82px)",
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: "#f0f4ff",
          marginBottom: "28px",
          maxWidth: "900px",
          margin: "0 auto 28px",
        }}>
          ARCHITECTING THE <br />
          <span style={{
            background: "linear-gradient(135deg, #60a5fa, #93c5fd, #3b82f6)",
            backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            COMPLETE DIGITAL
          </span>
          <br />
          <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(240,244,255,0.5)" }}>ECOSYSTEM.</span>
        </h1>

        <p className="hero-animate-3" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 1.8vw, 19px)",
          fontWeight: 300,
          color: "rgba(240,244,255,0.55)",
          maxWidth: "560px",
          margin: "28px auto 44px",
          lineHeight: 1.65,
          letterSpacing: "0.01em",
        }}>
          Engineering high-performance digital infrastructure<br /> for visionary South African businesses.
        </p>

        <div className="hero-animate-4" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "80px" }}>
          <button className="btn-primary" onClick={() => scrollTo("solutions")} style={{ fontSize: "15px", padding: "15px 32px" }}>
            View Solutions <ArrowRight size={16} />
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("contact")} style={{ fontSize: "15px", padding: "14px 32px" }}>
            Talk to a Strategist
          </button>
        </div>

        <div className="hero-animate-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.5 }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)" }}>
            Scroll
          </span>
          <ChevronDown size={16} style={{ animation: "scrollBounce 2s ease-in-out infinite", color: "#3b82f6" }} />
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        zIndex: 3,
      }} />
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label, inView }) {
  const num = useCountUp(value, inView, 1600);
  return (
    <div style={{ textAlign: "center", padding: "28px 24px", flex: 1, minWidth: "160px" }}>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 800,
        color: "#f0f4ff",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        marginBottom: "6px",
      }}>
        {num}{suffix}
      </div>
      <div style={{ fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.05em", fontWeight: 400 }}>
        {label}
      </div>
    </div>
  );
}

function StatsBar() {
  const [ref, inView] = useInView(0.3);

  return (
    <div ref={ref} className={`fade-section ${inView ? "in-view" : ""}`} style={{
      background: "linear-gradient(135deg, #050a14, #080d18)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", flexWrap: "wrap", justifyContent: "center",
      }} className="stats-grid-wrap">
        {[
          { value: 50, suffix: "+", label: "Clients Served" },
          { value: 3, suffix: "", label: "Core Solutions" },
          { value: 8.5, suffix: "K", label: "Packages from R4.5K" },
          { value: 9, suffix: "", label: "Provinces Deployed" },
        ].map((stat, i) => (
          <div key={i} style={{ display: "flex", flex: 1, minWidth: "160px" }}>
            {i > 0 && <div style={{ width: "1px", background: "rgba(255,255,255,0.06)", margin: "16px 0", alignSelf: "stretch" }} />}
            <StatItem {...stat} inView={inView} />
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .stats-grid-wrap { display: grid !important; grid-template-columns: 1fr 1fr; }
          .stats-grid-wrap > div:nth-child(odd) > div:first-child { display: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

const solutions = [
  {
    icon: Shield,
    label: "The Foundation",
    title: "Identity & Branding",
    desc: "Comprehensive brand architecture — custom logo systems, strategic visual profiles, and positioning that commands market authority.",
    features: ["Custom Logo Systems", "Strategic Profiles", "Brand Guidelines", "Visual Identity"],
    price: "R4,500",
    color: "#6366f1",
  },
  {
    icon: Layout,
    label: "The Engine",
    title: "Web Architecture",
    desc: "High-performance web infrastructure engineered for conversion — stunning design that captures leads and drives measurable growth.",
    features: ["Performance Design", "Lead Capture Systems", "Mobile-First Build", "SEO Architecture"],
    price: "R8,500",
    color: "#3b82f6",
    featured: true,
  },
  {
    icon: Cpu,
    label: "The Brain",
    title: "Digital Intelligence",
    desc: "AI-powered automation that works while you sleep — intelligent workflows, CRM integrations, and process automation at scale.",
    features: ["AI Integrations", "Workflow Automation", "CRM Systems", "Process Optimisation"],
    price: "R5,000",
    color: "#06b6d4",
  },
];

function SolutionCard({ sol, delay }) {
  const [hovered, setHovered] = useState(false);
  const Icon = sol.icon;

  return (
    <div
      className="card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: sol.featured ? "linear-gradient(160deg, #0a1628, #0d1f3c)" : "var(--bg-card)",
        border: `1px solid ${sol.featured ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "24px",
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s ease",
        animationDelay: `${delay}ms`,
      }}
    >
      {sol.featured && (
        <div style={{
          position: "absolute", top: "20px", right: "20px",
          background: "linear-gradient(135deg, #2563eb, #3b82f6)",
          color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
          padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase",
        }}>
          Most Popular
        </div>
      )}

      <div style={{
        position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${sol.color}18 0%, transparent 70%)`,
        transition: "opacity 0.3s",
        opacity: hovered ? 1 : 0.5,
      }} />

      <div style={{
        width: "52px", height: "52px", borderRadius: "14px",
        background: `${sol.color}14`,
        border: `1px solid ${sol.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "24px",
        transition: "transform 0.3s, background 0.3s",
        transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1)",
      }}>
        <Icon size={24} style={{ color: sol.color, transition: "color 0.3s" }} />
      </div>

      <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: sol.color, marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
        {sol.label}
      </div>

      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "#f0f4ff", marginBottom: "14px", letterSpacing: "-0.02em" }}>
        {sol.title}
      </h3>

      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "24px" }}>
        {sol.desc}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
        {sol.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(240,244,255,0.6)" }}>
            <CheckCircle size={13} style={{ color: sol.color, flexShrink: 0 }} />
            {f}
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px",
      }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "2px" }}>Starting From</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 800, color: "#f0f4ff", letterSpacing: "-0.02em" }}>
            {sol.price}
          </div>
        </div>
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%",
          background: `${sol.color}15`, border: `1px solid ${sol.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s, transform 0.3s",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}>
          <ArrowRight size={16} style={{ color: sol.color }} />
        </div>
      </div>
    </div>
  );
}

function Solutions() {
  const [ref, inView] = useInView();
  return (
    <section id="solutions" ref={ref} className={`fade-section ${inView ? "in-view" : ""}`} style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>What We Build</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "16px" }}>
          Three Pillars. <span style={{ color: "#3b82f6", fontStyle: "italic", fontWeight: 300 }}>One Ecosystem.</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
          Every component engineered to work in harmony — from visual identity to intelligent automation.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }} className="solutions-grid">
        {solutions.map((sol, i) => <SolutionCard key={i} sol={sol} delay={i * 100} />)}
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

const steps = [
  { num: "01", title: "Discovery Call", desc: "We audit your current digital presence and define clear, measurable goals for transformation." },
  { num: "02", title: "Strategy Blueprint", desc: "A custom roadmap built specifically for your business, audience, and growth objectives." },
  { num: "03", title: "Build & Integrate", desc: "Full development, AI automation deployment, and seamless third-party integrations." },
  { num: "04", title: "Launch & Optimise", desc: "Go live with confidence. Ongoing support available to iterate, scale, and improve." },
];

function Process() {
  const [ref, inView] = useInView(0.1);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setActiveStep(i);
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="process" style={{ background: "linear-gradient(180deg, var(--bg) 0%, #050a14 100%)", padding: "100px 0" }}>
      <div ref={ref} className={`fade-section ${inView ? "in-view" : ""}`} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>How It Works</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f4ff" }}>
            From Vision to <span style={{ color: "#3b82f6" }}>Deployment.</span>
          </h2>
        </div>

        {/* Desktop */}
        <div className="desktop-timeline" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", position: "relative" }}>
          <div style={{
            position: "absolute", top: "36px", left: "12.5%", right: "12.5%",
            height: "1px", borderTop: "1px dashed rgba(59,130,246,0.25)", zIndex: 0,
          }} />
          {steps.map((step, i) => (
            <div key={i} onClick={() => setActiveStep(i)} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "0 16px", cursor: "pointer",
            }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: activeStep === i ? "#2563eb" : "rgba(255,255,255,0.04)",
                border: `2px solid ${activeStep === i ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 800,
                color: activeStep === i ? "white" : "var(--text-secondary)",
                marginBottom: "24px", position: "relative", zIndex: 1,
                transition: "all 0.4s ease",
                boxShadow: activeStep === i ? "0 0 30px rgba(59,130,246,0.3)" : "none",
              }}>
                {step.num}
              </div>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: activeStep === i ? "#f0f4ff" : "rgba(240,244,255,0.7)", marginBottom: "10px", textAlign: "center", transition: "color 0.3s" }}>
                {step.title}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.65, transition: "all 0.3s" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="mobile-timeline" style={{ flexDirection: "column", gap: "0" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", paddingBottom: "32px", position: "relative" }}>
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute", left: "23px", top: "56px", bottom: 0,
                  width: "1px", borderLeft: "1px dashed rgba(59,130,246,0.2)",
                }} />
              )}
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 800, color: "#60a5fa",
                flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div style={{ paddingTop: "10px" }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f4ff", marginBottom: "8px" }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Atlantic AI ──────────────────────────────────────────────────────────

const whyBlocks = [
  { icon: Globe, title: "SA-First Thinking", desc: "We build for the South African market, local regulations, and user behaviour patterns unique to our ecosystem." },
  { icon: Zap, title: "Full-Stack Capability", desc: "From branding to AI automation — one team, one cohesive vision. No handoffs, no miscommunication." },
  { icon: Users, title: "Enterprise Quality, SME Pricing", desc: "No agency markup. You get direct access to the builders. Premium output at transparent, accessible rates." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most projects delivered in 7–14 working days. We move with urgency because your momentum matters." },
];

function WhyAtlantic() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} className={`fade-section ${inView ? "in-view" : ""}`}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>Why Us</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f4ff" }}>
            Built Different. <span style={{ color: "#3b82f6" }}>Built for SA.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }} className="why-grid">
          {whyBlocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <div key={i} className="card-hover" style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid rgba(59,130,246,0.5)",
                borderRadius: "16px",
                padding: "28px",
              }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "10px",
                  background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "18px",
                }}>
                  <Icon size={20} style={{ color: "#60a5fa" }} />
                </div>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 700, color: "#f0f4ff", marginBottom: "10px" }}>
                  {block.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {block.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "Atlantic AI transformed our entire digital presence. The automation alone saved us 20 hours a week — it's been game-changing for our ops team.",
    name: "Sipho M.",
    role: "Operations Director",
    company: "Durban Logistics Co.",
  },
  {
    quote: "Professional, fast, and genuinely understood our brand from day one. Best investment we made this year by a significant margin.",
    name: "Priya N.",
    role: "Founder",
    company: "Cape Town E-commerce Brand",
  },
  {
    quote: "The AI workflow they built for us handles 80% of our client onboarding automatically. ROI was evident within the first month.",
    name: "Dean V.",
    role: "Managing Director",
    company: "Johannesburg Consulting Group",
  },
];

function Testimonials() {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: "#050a14", padding: "100px 24px" }}>
      <div ref={ref} className={`fade-section ${inView ? "in-view" : ""}`} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>Social Proof</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f4ff" }}>
            Trusted by SA <span style={{ color: "#3b82f6" }}>Businesses.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }} className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="card-hover" style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "32px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "24px", right: "28px",
                fontFamily: "Georgia, serif", fontSize: "64px", lineHeight: 1,
                color: "rgba(59,130,246,0.12)", fontWeight: 900, userSelect: "none",
              }}>
                "
              </div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "18px" }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "rgba(240,244,255,0.75)", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f0f4ff" }}>
                  {t.name}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: "", business: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const team = [
    { name: "Reece", role: "Managing Director", phone: "067 638 1778", email: "reece@atlanticaiautomation.com", initials: "R" },
    { name: "Christian", role: "Co-Founder & Technical Lead", phone: "+27 71 607 2402", email: "christian@atlanticaiautomation.com", initials: "C" },
    { name: "Peter", role: "Senior Sales Executive & Certified Digital Architect", phone: "+27 74 733 3463", email: null, initials: "P" },
  ];

  return (
    <section id="contact" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div ref={ref} className={`fade-section ${inView ? "in-view" : ""}`} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f4ff", marginBottom: "14px" }}>
            Begin the <span style={{ color: "#3b82f6" }}>Architecture.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            Connect with a strategist to start your digital transformation.
          </p>
        </div>

        {/* Team Cards — now 3 members */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "48px" }} className="team-grid">
          {team.map((member, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px", padding: "28px",
              display: "flex", flexDirection: "column", gap: "16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "white",
                }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f4ff" }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{member.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href={`tel:${member.phone.replace(/\s/g, "")}`} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(240,244,255,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(240,244,255,0.7)"}>
                  <Phone size={13} style={{ color: "#3b82f6" }} />{member.phone}
                </a>
                {member.email && (
                  <a href={`mailto:${member.email}`} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(240,244,255,0.7)", textDecoration: "none", transition: "color 0.2s", wordBreak: "break-all" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(240,244,255,0.7)"}>
                    <Mail size={13} style={{ color: "#3b82f6", flexShrink: 0 }} />{member.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px", padding: "48px",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircle size={52} style={{ color: "#22c55e", margin: "0 auto 20px", display: "block" }} />
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 700, color: "#f0f4ff", marginBottom: "12px" }}>
                Message Sent.
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                A strategist will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Full Name *
                  </label>
                  <input required placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Business Name *
                  </label>
                  <input required placeholder="Company or trading name" value={formData.business} onChange={e => setFormData({ ...formData, business: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Email Address *
                  </label>
                  <input required type="email" placeholder="you@company.co.za" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Phone (Optional)
                  </label>
                  <input placeholder="+27 XX XXX XXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                  Service Required *
                </label>
                <select required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                  <option value="">Select a service...</option>
                  <option>Identity &amp; Branding</option>
                  <option>Web Architecture</option>
                  <option>Digital Intelligence</option>
                  <option>Full Ecosystem Package</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                  Your Message *
                </label>
                <textarea required rows={4} placeholder="Tell us about your project, goals, and any challenges you're facing..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ fontSize: "15px", padding: "15px 36px", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Sending..." : "Send Message"} {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "#020408",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "60px 24px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", marginBottom: "48px" }} className="footer-inner">
          <div style={{ maxWidth: "300px" }}>
            <Logo size={30} />
            <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              Engineering complete digital ecosystems for visionary South African businesses.
            </p>
          </div>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
                Navigate
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Solutions", "Process", "Contact"].map((l) => (
                  <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                    color: "rgba(240,244,255,0.6)", textAlign: "left", padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.color = "#f0f4ff"}
                  onMouseLeave={e => e.target.style.color = "rgba(240,244,255,0.6)"}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
                Contact
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="mailto:reece@atlanticaiautomation.com" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(240,244,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(240,244,255,0.6)"}>
                  <Mail size={13} style={{ color: "#3b82f6" }} />reece@atlanticaiautomation.com
                </a>
                <a href="tel:0676381778" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(240,244,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(240,244,255,0.6)"}>
                  <Phone size={13} style={{ color: "#3b82f6" }} />067 638 1778
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px",
        }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Atlantic AI Digital Solutions © 2026 · Durban, South Africa
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Nationally Deployed · Enterprise Grade
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Solutions />
        <Process />
        <WhyAtlantic />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
