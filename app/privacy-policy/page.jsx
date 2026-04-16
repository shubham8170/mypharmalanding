import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | MyPharma",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="subpage">
      <header className="subpage-topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-mark">
            MyPharma
          </Link>
          <nav className="top-links">
            <Link href="/">Product</Link>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/customer-support">Support</Link>
          </nav>
          <Link href="/" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>
      </header>

      <section className="sub-hero">
        <div className="container sub-hero-grid">
          <div>
            <p className="eyebrow">Privacy</p>
            <h1 className="sub-title">MyPharma Privacy Policy</h1>
            <p className="subcopy">
              <strong>Effective date:</strong> 2026-04-16
            </p>
          </div>
          <div className="sub-hero-visual security-visual" />
        </div>
      </section>

      <section className="sub-section">
        <div className="container policy-content">
          <p>
            MyPharma (<strong>the App</strong>) is a pharmacy management
            application. This Privacy Policy explains how information is
            collected, used, and shared when you use the App.
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
              invoices/billing details, vendor/doctor/patient information you
              enter.
            </li>
            <li>
              <strong>Images you choose to provide</strong>: photos or scans you
              capture or upload (for example prescriptions, invoices, medicine
              strip photos, or profile photo).
            </li>
            <li>
              <strong>Device/app data</strong>: basic diagnostic information
              needed to operate and troubleshoot the App.
            </li>
          </ul>

          <h2>Camera Permission</h2>
          <p>The App requests <strong>Camera</strong> permission to enable features such as:</p>
          <ul>
            <li>
              capturing images for <strong>OCR / extraction</strong> (e.g.,
              prescriptions, invoices, medicine photos),
            </li>
            <li>uploading a <strong>profile photo</strong>,</li>
            <li>scanning documents to speed up inventory/billing workflows.</li>
          </ul>
          <p>The App does not access the camera unless you open a feature that requires it.</p>

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
            When you use OCR/extraction features, images and/or extracted text
            may be <strong>uploaded to our backend servers and/or third-party
            service providers</strong> solely to provide these features.
          </p>
          <ul>
            <li>We only process images you explicitly capture or upload.</li>
            <li>We do not sell your images or personal data.</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain data for as long as needed to provide the service, comply
            with legal obligations, resolve disputes, and enforce agreements. If
            you request deletion, we will take reasonable steps to delete your
            data, subject to legal and operational requirements.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable steps to protect your information. However, no
            method of transmission or storage is 100% secure.
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
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:shubhambiswas024@gmail.com">
              shubhambiswas024@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

