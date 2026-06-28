import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://curemitra.com"),
  title: {
    default: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software (MyPharma)",
    template: "%s | CureMitra – AI Pharmacy OS",
  },
  description:
    "CureMitra (MyPharma) is India's leading AI-powered pharmacy management app. Automate billing with clinical-grade OCR, sync GST filing with Cleartax/Mastersindia, print invoices via Bluetooth, and track patient deliveries with real-time GPS.",
  keywords: [
    "CureMitra",
    "MyPharma",
    "CureMitra Pharma",
    "MyPharma App",
    "Pharmacy management software",
    "Best pharmacy billing app India",
    "Clinical OCR scanner",
    "Prescription billing software",
    "GST invoice synchronization",
    "Distributor auto-ordering app",
    "Medicine stock manager",
    "HIPAA compliant clinic POS",
  ],
  authors: [{ name: "CureMitra Team", url: "https://curemitra.com" }],
  creator: "CureMitra",
  publisher: "CureMitra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software",
    description:
      "Automate pharmacy billing with clinical-grade OCR, manage stocks with predictive AI, and sync GST with Cleartax.",
    url: "https://curemitra.com",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra – AI-Powered Pharmacy Management OS",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra | AI Pharmacy Billing & OS",
    description:
      "Automate pharmacy billing with OCR, manage stocks with AI, and sync GST.",
    images: ["https://curemitra.com/og-image.png"],
    creator: "@CureMitra",
  },
  alternates: {
    canonical: "https://curemitra.com",
    types: {
      "application/rss+xml": "https://curemitra.com/sitemap.xml",
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-code",
    // yandex: "your-yandex-code",
  },
};

export default function RootLayout({ children }) {
  /* ── Global JSON-LD: Organization + WebSite + BreadcrumbList ── */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CureMitra",
    alternateName: "MyPharma",
    url: "https://curemitra.com",
    logo: "https://curemitra.com/icon.png",
    description:
      "India's leading AI-powered pharmacy management platform for billing, inventory, and clinical operations.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "curemitrapharma@gmail.com",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://github.com/shubham8170/mypharmalanding",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CureMitra",
    alternateName: "MyPharma",
    url: "https://curemitra.com",
    description:
      "AI-powered pharmacy management software for billing, OCR scanning, inventory, and GST compliance in India.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://curemitra.com/customer-support?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "CureMitra",
      logo: "https://curemitra.com/icon.png",
    },
    inLanguage: "en-IN",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CureMitra",
    alternateName: "MyPharma",
    url: "https://curemitra.com",
    operatingSystem: "Android, iOS, Windows, Web",
    applicationCategory: "BusinessApplication, HealthApplication",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "INR",
      availability: "https://schema.org/Available",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "512",
      bestRating: "5",
    },
    author: {
      "@type": "Organization",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
    featureList: [
      "Clinical-Grade OCR Billing with 99.9% accuracy",
      "AI-Driven Predictive Inventory Management",
      "Multi-GSP GST Tax Sync (Cleartax, Mastersindia, Vayana)",
      "Doctor Chamber & Scheduling",
      "Multi-Channel Dispatch Hub (WhatsApp, SMS, Email)",
      "EHR Vitals & Patient CRM",
      "Mobile GPS Tracking & Bluetooth Print SDK",
      "End-to-End Encrypted Data Protection",
    ],
    screenshot: "https://curemitra.com/og-image.png",
    softwareVersion: "1.0",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://curemitra.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: "https://curemitra.com/features",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Security",
        item: "https://curemitra.com/security",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Support",
        item: "https://curemitra.com/customer-support",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Privacy Policy",
        item: "https://curemitra.com/privacy-policy",
      },
    ],
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="theme-color" content="#0a0e1a" />
        <meta name="msapplication-TileColor" content="#0a0e1a" />
      </head>
      <body className={inter.variable}>
        {/* ── Structured Data: Organization ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* ── Structured Data: WebSite ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* ── Structured Data: SoftwareApplication ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        {/* ── Structured Data: BreadcrumbList ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
