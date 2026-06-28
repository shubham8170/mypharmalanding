import FeaturesClient from "./FeaturesClient";

export const metadata = {
  title: "CureMitra Features | AI OCR Billing & Predictive Inventory",
  description:
    "Explore the core features of CureMitra (MyPharma) Pharmacy OS. Discover how our Google ML Kit OCR scanner, AI-driven predictive inventory, and automated GSP integrations simplify billing, stock management, and GST compliance for Indian pharmacies.",
  keywords: [
    "CureMitra Features",
    "MyPharma Modules",
    "Pharmacy OS Features",
    "OCR Billing System",
    "Predictive Inventory Management",
    "GST Tax Sync India",
    "Pharmacy Management Software Features",
    "Clinical OCR Scanner Features",
    "Doctor Chamber Scheduling",
    "Patient CRM EHR",
  ],
  openGraph: {
    title: "CureMitra Features | AI OCR Billing & Predictive Inventory",
    description:
      "Explore clinical-grade OCR billing, AI-driven predictive inventory, multi-GSP GST sync, doctor scheduling, and more — all in CureMitra Pharmacy OS.",
    url: "https://curemitra.com/features",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra Features – AI Pharmacy Management Modules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra Features | AI OCR Billing & Predictive Inventory",
    description:
      "Explore clinical-grade OCR billing, AI-driven predictive inventory, multi-GSP GST sync, and more.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/features",
  },
};

export default function FeaturesPage() {
  /* ── Features page Product schema for GEO ── */
  const featuresSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "CureMitra Features – AI-Powered Pharmacy Management Modules",
    description:
      "Comprehensive feature overview of CureMitra (MyPharma) including clinical-grade OCR billing, AI-driven predictive inventory, multi-GSP GST tax sync, doctor chamber scheduling, multi-channel dispatch, EHR vitals tracking, and mobile GPS delivery with Bluetooth print SDK.",
    author: {
      "@type": "Organization",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CureMitra",
      logo: {
        "@type": "ImageObject",
        url: "https://curemitra.com/icon.png",
      },
    },
    datePublished: "2024-01-01",
    dateModified: "2026-06-27",
    url: "https://curemitra.com/features",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "CureMitra",
      applicationCategory: "BusinessApplication",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuresSchema),
        }}
      />
      <FeaturesClient />
    </>
  );
}
