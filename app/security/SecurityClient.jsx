'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  UserCheck,
  KeyRound,
  Database,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

/* ─────────── Particle Canvas ─────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    const particles = [];
    const PARTICLE_COUNT = 40;
    const CONNECTION_DIST = 120;

    function resize() {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * (w / window.devicePixelRatio);
        this.y = Math.random() * (h / window.devicePixelRatio);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        const W = w / window.devicePixelRatio;
        const H = h / window.devicePixelRatio;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';
        ctx.fill();
      }
    }

    function init() {
      resize();
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    function animate() {
      const W = w / window.devicePixelRatio;
      const H = h / window.devicePixelRatio;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - dist / CONNECTION_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─────────── 3D Card Component ─────────── */
function Card3D({ children, className = '', style = {} }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

const rights = [
  { icon: UserCheck, label: 'Right to Access' },
  { icon: KeyRound, label: 'Right to Deletion' },
  { icon: Database, label: 'Data Portability' },
];

const footerColumns = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Billing OCR', href: '/features' },
      { label: 'Inventory AI', href: '/features' },
      { label: 'Clinic Management', href: '/features' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Customer Support', href: '/customer-support' },
      { label: 'Documentation', href: '/customer-support' },
      { label: 'Status', href: '/customer-support' },
    ],
  },
];

export default function SecurityClient() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="subpage">
      {/* ── Particle Background ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleCanvas />
      </div>

      {/* ── Header ── */}
      <motion.header
        className="topbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
            <span>CureMitra</span>
          </Link>
          <nav className="top-links">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary btn-sm header-cta">Get Started</a>
          
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" onClick={() => setMenuOpen(false)}>Product</Link>
              <Link href="/features" onClick={() => setMenuOpen(false)}>Features</Link>
              <Link href="/security" onClick={() => setMenuOpen(false)}>Security</Link>
              <Link href="/customer-support" onClick={() => setMenuOpen(false)}>Support</Link>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Sub-Hero ── */}
      <section className="sub-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="container sub-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow-badge">
              <ShieldCheck size={16} />
              <span>Secure by default</span>
            </div>
            <h1 className="sub-title">
              Privacy &amp;{' '}
              <span className="gradient-text">Data Sovereignty</span>
            </h1>
            <p className="subcopy">
              Clinical data protection built around role-based controls,
              encrypted storage, and compliance-oriented governance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            style={{ perspective: 1000 }}
          >
            <Card3D className="sub-hero-visual security-visual">
              <div className="hero-card-glow" />
              <div className="policy-form" style={{ width: '80%', padding: '24px', borderRadius: '16px', position: 'relative', zIndex: 2 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Compliance Tier</p>
                <div style={{ height: '8px', margin: '8px 0 16px', borderRadius: '4px', background: 'var(--primary)', width: '90%' }} />
                <p style={{ margin: 0, fontWeight: 600 }}>Data Region</p>
                <div style={{ height: '8px', margin: '8px 0 16px', borderRadius: '4px', background: 'var(--accent)', width: '70%' }} />
                <p style={{ margin: 0, fontWeight: 600 }}>Retention Policy</p>
                <div style={{ height: '8px', margin: '8px 0 0', borderRadius: '4px', background: 'var(--secondary)', width: '85%' }} />
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── Security Cards Grid ── */}
      <section className="sub-section">
        <div className="container">
          <div className="security-grid">
            <motion.div
              className="sub-card-wrap"
              style={{ gridColumn: 'span 12' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <Card3D className="sub-card" style={{ height: '100%', transform: 'translateZ(0)' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <Eye size={28} strokeWidth={1.5} />
                </div>
                <h3>Data Collection &amp; OCR</h3>
                <p>
                  Transparent handling policies with strict boundaries on processing scope.
                  We never resell your medical scanning images or business-critical pharmacy logs.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              className="sub-card-wrap"
              style={{ gridColumn: 'span 12', height: '100%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <Card3D className="sub-card deep security-wide" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20, background: 'rgba(255,255,255,0.1)' }}>
                  <FileCheck size={28} strokeWidth={1.5} />
                </div>
                <h3>Security Standards</h3>
                <p>
                  Encrypted data channels, hardened storage controls, and ongoing policy
                  monitoring for clinical-grade protection. Every API request is signed and authenticated.
                </p>
              </Card3D>
            </motion.div>

            <motion.div
              className="sub-card-wrap"
              style={{ gridColumn: 'span 12', height: '100%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <Card3D className="sub-card rights-card" style={{ transform: 'translateZ(0)', height: '100%' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 20 }}>
                  <ShieldCheck size={28} strokeWidth={1.5} />
                </div>
                <h3>Your Rights &amp; Data Control</h3>
                <ul className="rights-list" style={{ marginTop: '16px' }}>
                  {rights.map((r, i) => (
                    <li key={r.label}>
                      <r.icon size={18} style={{ color: 'var(--primary)' }} />
                      {r.label}
                    </li>
                  ))}
                </ul>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="brand">
            <Link href="/" className="brand-mark">
              <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
              <span>CureMitra</span>
            </Link>
            <p>
              Smart OCR and billing for the modern healthcare facility. Precision
              engineering for clinical excellence.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h5>{column.heading}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <ChevronRight size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
