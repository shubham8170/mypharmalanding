'use client';

import Link from 'next/link';
import logoImg from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  X,
  Menu,
  ChevronRight,
  Clock,
  Tag,
} from 'lucide-react';

const SOCIAL_SVG = {
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  youtube: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>,
};

const posts = [
  {
    tag: 'GST Compliance',
    title: 'Complete GST Filing Guide for Indian Pharmacies 2026',
    excerpt:
      'Step-by-step walkthrough of GSTR-1 and GSTR-3B filing for retail pharmacies — including HSN codes for medicines, input tax credit on purchases, and how to avoid common notices from the GST department.',
    readTime: '8 min read',
    date: 'June 15, 2026',
    featured: true,
  },
  {
    tag: 'AI Inventory',
    title: 'How AI Inventory Alerts Prevent Stockouts — Without a Dedicated Manager',
    excerpt:
      'A single pharmacy in Bengaluru reduced stockouts by 94% in 30 days using CureMitra\'s predictive inventory. We break down exactly how the AI model works and what data it uses to forecast demand.',
    readTime: '6 min read',
    date: 'June 8, 2026',
    featured: false,
  },
  {
    tag: 'Migration Guide',
    title: 'Switching from Marg ERP to Cloud Billing: A Practical Guide for Pharmacists',
    excerpt:
      'Worried about losing years of billing history? This guide covers the full migration process: exporting data from Marg ERP, importing into CureMitra, and getting your team trained — in under 48 hours.',
    readTime: '10 min read',
    date: 'May 27, 2026',
    featured: false,
  },
  {
    tag: 'Compliance',
    title: 'HIPAA Compliance Checklist for Indian Pharmacy Software',
    excerpt:
      'India\'s Digital Health Mission (ABDM) recommends HIPAA-aligned data practices for health records. Here\'s what "HIPAA compliant" actually means for a pharmacy app — and the 7 questions to ask any vendor.',
    readTime: '7 min read',
    date: 'May 18, 2026',
    featured: false,
  },
  {
    tag: 'OCR Billing',
    title: 'Prescription OCR: How CureMitra Achieves 99.9% Accuracy on Handwritten Bills',
    excerpt:
      'Handwritten prescriptions vary enormously — different doctors, different languages, different shorthand. This post explains the multi-pass ML pipeline that powers CureMitra\'s local OCR engine.',
    readTime: '9 min read',
    date: 'May 5, 2026',
    featured: false,
  },
  {
    tag: 'Growth',
    title: '40% More Volume Without Adding Staff: A Case Study from Nair Medical Store',
    excerpt:
      'Dr. Ramesh Nair\'s Kochi pharmacy was processing 150 bills a day and hitting a ceiling. After deploying CureMitra, the same team now handles 210 bills daily. Here\'s the exact workflow change that made it possible.',
    readTime: '5 min read',
    date: 'April 28, 2026',
    featured: false,
  },
];

const TAG_COLORS = {
  'GST Compliance': '#22d3ee',
  'AI Inventory': '#8b5cf6',
  'Migration Guide': '#f59e0b',
  'Compliance': '#0ea5e9',
  'OCR Billing': '#22c55e',
  'Growth': '#f97316',
};

export default function BlogClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];
  const filtered = activeTag === 'All' ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <div className="subpage">
      {/* ── Header ── */}
      <header className="subpage-topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
            <span>CureMitra</span>
          </Link>
          <nav className="top-links" aria-label="Main navigation">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <div className="header-cta-group">
            <a href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo" className="btn btn-secondary btn-sm">Book a Demo</a>
            <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary btn-sm">Start Free Trial</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
              <Link href="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link href="/customer-support" onClick={() => setMenuOpen(false)}>Support</Link>
              <a href="mailto:curemitrapharma@gmail.com?subject=Book%20a%20Demo" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Book a Demo</a>
              <a href="mailto:curemitrapharma@gmail.com" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Start Free Trial</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="sub-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow-badge" style={{ margin: '0 auto 24px' }}>
              <BookOpen size={16} />
              <span>Pharmacy Management Resources</span>
            </div>
            <h1 className="sub-title" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
              Guides to help your pharmacy
              <span className="gradient-text"> work smarter</span>
            </h1>
            <p className="section-sub" style={{ margin: '20px auto 0', maxWidth: 540 }}>
              Practical articles on GST compliance, AI billing, inventory management, and growing
              your pharmacy — written by the CureMitra team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tag filter ── */}
      <section className="sub-section" style={{ paddingTop: 0, paddingBottom: 32 }}>
        <div className="container">
          <div className="blog-tag-filter">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter-btn${activeTag === tag ? ' blog-filter-btn--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag !== 'All' && <Tag size={12} />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured post ── */}
      {activeTag === 'All' && (
        <section className="sub-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <motion.div
              className="blog-featured"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="blog-featured-inner">
                <span className="blog-tag" style={{ background: `${TAG_COLORS[posts[0].tag]}20`, color: TAG_COLORS[posts[0].tag] }}>
                  {posts[0].tag}
                </span>
                <h2 className="blog-featured-title">{posts[0].title}</h2>
                <p className="blog-featured-excerpt">{posts[0].excerpt}</p>
                <div className="blog-meta">
                  <span><Clock size={13} /> {posts[0].readTime}</span>
                  <span>{posts[0].date}</span>
                </div>
                <a href="mailto:curemitrapharma@gmail.com?subject=Request%20Full%20Article" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex', gap: 8 }}>
                  Read Full Guide <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Blog grid ── */}
      <section className="sub-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="blog-grid">
            {filtered.filter((p) => activeTag !== 'All' || !p.featured).map((post, i) => (
              <motion.div
                key={post.title}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span
                  className="blog-tag"
                  style={{
                    background: `${TAG_COLORS[post.tag] || 'var(--primary)'}20`,
                    color: TAG_COLORS[post.tag] || 'var(--primary)',
                  }}
                >
                  {post.tag}
                </span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span><Clock size={12} /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="sub-section">
        <div className="container">
          <motion.div
            className="mini-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Get New Guides in Your Inbox</h2>
            <p className="section-sub" style={{ margin: '12px auto 0' }}>
              We publish 2 pharmacy management guides per month. No spam — unsubscribe anytime.
            </p>
            <div className="blog-newsletter-form">
              <input
                type="email"
                placeholder="yourpharmacy@example.com"
                className="blog-email-input"
                aria-label="Email address for newsletter"
              />
              <a href="mailto:curemitrapharma@gmail.com?subject=Newsletter%20Signup" className="btn btn-primary">
                Subscribe
                <ArrowRight size={16} />
              </a>
            </div>
            <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: 12 }}>
              No credit card required · Unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container footer-grid">
          <div className="brand">
            <Link href="/" className="brand-mark">
              <img src={logoImg.src} alt="CureMitra Logo" className="brand-logo" />
              <span>CureMitra</span>
            </Link>
            <p>Smart OCR and billing for the modern healthcare facility.</p>
            <div className="footer-social">
              <a href="https://linkedin.com/company/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on LinkedIn">{SOCIAL_SVG.linkedin}</a>
              <a href="https://youtube.com/@curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on YouTube">{SOCIAL_SVG.youtube}</a>
              <a href="https://twitter.com/curemitra" target="_blank" rel="noopener noreferrer" aria-label="CureMitra on Twitter">{SOCIAL_SVG.twitter}</a>
            </div>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              <li><Link href="/features"><ChevronRight size={14} />Billing OCR</Link></li>
              <li><Link href="/features"><ChevronRight size={14} />Inventory AI</Link></li>
              <li><Link href="/compare"><ChevronRight size={14} />Compare</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about"><ChevronRight size={14} />About Us</Link></li>
              <li><Link href="/pricing"><ChevronRight size={14} />Pricing</Link></li>
              <li><Link href="/blog"><ChevronRight size={14} />Blog</Link></li>
              <li><Link href="/security"><ChevronRight size={14} />Security</Link></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><Link href="/customer-support"><ChevronRight size={14} />Customer Support</Link></li>
              <li><Link href="/privacy-policy"><ChevronRight size={14} />Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
