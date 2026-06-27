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
              CureMitra (<strong>the App</strong>), also referred to as <strong>MyPharma</strong>, is a next-generation pharmacy management and clinical intelligence platform. This Privacy Policy outlines how CureMitra collects, processes, secures, and discloses user, pharmacy, and patient data.
            </p>

            <h2>1. Information We Collect &amp; Database Governance</h2>
            <p>
              Depending on the modules utilized across our mobile app, desktop dashboard, and server endpoints, we process and store the following structural data in our database:
            </p>
            <ul>
              <li>
                <strong>Account &amp; User Profiles</strong>: Phone numbers (used for secure SMS-based OTP validation), user display names, ages, profile photo URLs, active device FCM tokens, session keys, and Razorpay subscription IDs.
              </li>
              <li>
                <strong>Pharmacy &amp; Business Metadata</strong>: Store names, pharmacy addresses, drug license numbers, GSTIN details (GSTLegalName, GSTTradeName, state codes, and registration types), stock transfer transit records, current inventories, and auto-ordering configurations.
              </li>
              <li>
                <strong>Distributor &amp; Purchase Data</strong>: Vendor contact numbers, distributor names, scanned vendor purchase invoices (including raw scanned PDF text and image URLs), purchase orders, and auto-order logs.
              </li>
              <li>
                <strong>Patient Records &amp; Patient Accounts</strong>: Patient names, phone numbers, emergency contact details, blood groups, heights, weights, blood pressure logs, medical histories, vaccination files, and medicine usage timelines.
              </li>
              <li>
                <strong>Transactional &amp; Invoice Billing</strong>: Total amounts, CGST/SGST/IGST/cess tax allocations, reverse charge indicators, buyer GSTINs, and digital signature URLs.
              </li>
            </ul>

            <h2>2. Mobile Device Hardware Permissions &amp; Data Access</h2>
            <p>
              To deliver clinical-grade OCR scanning, automatic billing, and local deliveries, our mobile application requests access to the following device hardware:
            </p>
            <ul>
              <li>
                <strong>Camera &amp; Photo Library</strong>: Accessed to snap pictures or upload copies of prescriptions, medicine strips, and invoices to interpret medicine names and tax lines via Google ML Kit Text Recognition OCR.
              </li>
              <li>
                <strong>Geolocated Location (GPS)</strong>: Accessed to retrieve fine latitude and longitude coordinates to verify delivery drop-offs and track live courier routes. This coordinate access is enabled only with explicit location permissions.
              </li>
              <li>
                <strong>Bluetooth &amp; Nearby Devices</strong>: Accessed to search for, connect to, and print physical invoices and receipts using local Bluetooth thermal receipt printers.
              </li>
              <li>
                <strong>Notifications</strong>: Accessed to dispatch alerts regarding low-stock alerts, medicine expiry timelines, and delivery statuses.
              </li>
            </ul>

            <h2>3. Third-Party Integrations &amp; Data Synchronization</h2>
            <p>
              CureMitra syncs information with external partners to automate business operations. We maintain strict compliance boundaries when integrating with:
            </p>
            <ul>
              <li>
                <strong>GSP Sync Providers (Cleartax, Mastersindia, Vayana)</strong>: Invoices and tax reports are synchronized directly with Cleartax, Mastersindia, or Vayana APIs to automate return filing (GSTR-1 return filing preparation).
              </li>
              <li>
                <strong>Razorpay Payment Gateways</strong>: Payments and billing subscriptions are handled securely via Razorpay's PCI-compliant infrastructure.
              </li>
              <li>
                <strong>Notification Dispatchers (WhatsApp, Email, SMS)</strong>: SMS, email, and WhatsApp APIs are used to send purchase orders, low-stock alerts, and reminders to patients and distributors.
              </li>
            </ul>

            <h2>4. Data Retention &amp; Security Standards</h2>
            <p>
              We enforce role-based access control (RBAC) layers (ADMIN, PHARMACIST, MANAGER, SALESMAN) for store access permissions. Database tables are protected by end-to-end encryption in transit. We retain personal and clinical files as long as your pharmacy account is active. If you request deletion, we take reasonable steps to purge account records, subject to legal, tax, or medical audit guidelines.
            </p>

            <h2>5. Your Choices &amp; Control</h2>
            <ul>
              <li>You can enable or disable GPS tracking, camera access, and Bluetooth printer permissions in your system settings. Disabling permissions will limit related scanning, delivery, and printing modules.</li>
              <li>You can request access to your records, request data portability exports, or initiate account deletion.</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or data access compliance, please reach out to us at:</p>
            <p style={{ marginTop: 12 }}>
              <strong>Email:</strong>{' '}
              <a href="mailto:curemitrapharma@gmail.com">
                curemitrapharma@gmail.com
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
