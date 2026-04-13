import { useState, useEffect, useRef } from "react";

// ─── Custom SVG Icons (No external library needed) ───────────────────────────
const Icon = ({ path, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const Icons = {
  Shield: (props) => <Icon {...props} path={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>} />,
  Layout: (props) => <Icon {...props} path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>} />,
  Cpu: (props) => <Icon {...props} path={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></>} />,
  ArrowRight: (props) => <Icon {...props} path={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />,
  Phone: (props) => <Icon {...props} path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>} />,
  Mail: (props) => <Icon {...props} path={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>} />,
  Menu: (props) => <Icon {...props} path={<><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>} />,
  X: (props) => <Icon {...props} path={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />,
  Star: (props) => <Icon {...props} path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>} />,
  ChevronDown: (props) => <Icon {...props} path={<polyline points="6 9 12 15 18 9"/>} />,
  Zap: (props) => <Icon {...props} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />,
  Globe: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />,
  Clock: (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />,
  Users: (props) => <Icon {...props} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />,
  CheckCircle: (props) => <Icon {...props} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>} />,
};

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
  }, [threshold]);
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
    background: rgba(59,
