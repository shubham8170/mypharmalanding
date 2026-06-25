'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  ShieldCheck,
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

export default function PrivacyPolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = 'Privacy Policy | CureMitra';
  }, []);

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
          <Link href="/" className="btn btn-primary btn-sm header-cta">Get Started</Link>
          
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
              <Link href="/" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
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
              <span>Privacy</span>
            </div>
            <h1 className="sub-title">
              CureMitra{' '}
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="subcopy">
              <strong>Effective date:</strong> 2026-04-16
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
              <div style={{ padding: 40, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <ShieldCheck size={48} className="brand-icon" style={{ marginBottom: 16, color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '24px', fontWeight: 700 }}>Data Encryption</h3>
                <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                  Strict data storage compliance using advanced encryption standards for all medical scanning logs.
                </p>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── Policy Content ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            className="policy-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p>
              CureMitra (<strong>the App</strong>) is a pharmacy management
              application. This Privacy Policy explains how information is collected,
              used, and shared when you use the App.
            </p>

            <h2>Information We Collect</h2>
            <p>Depending on which features you use, we may collect:</p>
            <ul>
              <li>
                <strong>Account information</strong>: such as phone number (for OTP
                login) and profile details you provide.
              </li>
              <li>
                <strong>Pharmacy &amp; business data</strong>: inventory items,
                invoices/billing details, vendor/doctor/patient information you enter.
              </li>
              <li>
                <strong>Images you choose to provide</strong>: photos or scans you
                capture or upload (for example prescriptions, invoices, medicine strip
                photos, or profile photo).
              </li>
              <li>
                <strong>Device/app data</strong>: basic diagnostic information needed
                to operate and troubleshoot the App.
              </li>
            </ul>

            <h2>Camera Permission</h2>
            <p>
              The App requests <strong>Camera</strong> permission to enable features
              such as:
            </p>
            <ul>
              <li>
                capturing images for <strong>OCR / extraction</strong> (e.g.,
                prescriptions, invoices, medicine photos),
              </li>
              <li>uploading a <strong>profile photo</strong>,</li>
              <li>
                scanning documents to speed up inventory/billing workflows.
              </li>
            </ul>
            <p>
              The App does not access the camera unless you open a feature that
              requires it.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>
                provide core features (login, pharmacy setup, inventory, billing,
                CRM, notifications),
              </li>
              <li>process OCR/extraction requests you initiate,</li>
              <li>improve reliability, performance, and support.</li>
            </ul>

            <h2>Image Processing &amp; Sharing</h2>
            <p>
              When you use OCR/extraction features, images and/or extracted text may
              be <strong>uploaded to our backend servers and/or third-party service
              providers</strong> solely to provide these features.
            </p>
            <ul>
              <li>We only process images you explicitly capture or upload.</li>
              <li>We do not sell your images or personal data.</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain data for as long as needed to provide the service, comply
              with legal obligations, resolve disputes, and enforce agreements. If you
              request deletion, we will take reasonable steps to delete your data,
              subject to legal and operational requirements.
            </p>

            <h2>Security</h2>
            <p>
              We take reasonable steps to protect your information. However, no method
              of transmission or storage is 100% secure.
            </p>

            <h2>Your Choices</h2>
            <ul>
              <li>
                You can deny camera permission, but OCR/scanning features may not
                work.
              </li>
              <li>
                You can choose not to upload images; related features will be
                unavailable.
              </li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, contact:</p>
            <p style={{ marginTop: 12 }}>
              <strong>Email:</strong>{' '}
              <a href="mailto:shubhambiswas024@gmail.com">
                shubhambiswas024@gmail.com
              </a>
            </p>
          </motion.div>
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
