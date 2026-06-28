import AboutClient from "./AboutClient";

export const metadata = {
  title: "About CureMitra | India's AI Pharmacy Management Platform",
  description:
    "Learn about CureMitra — the team building India's leading AI-powered pharmacy billing and inventory management platform. HIPAA-compliant, OCR-first, built for Indian pharmacies and clinics.",
  keywords: [
    "About CureMitra",
    "CureMitra team",
    "pharmacy software India",
    "AI billing software founders",
    "MyPharma about",
  ],
  openGraph: {
    title: "About CureMitra | India's AI Pharmacy Management Platform",
    description:
      "Meet the team behind CureMitra. We're building the operating system for India's 800,000+ pharmacies — starting with OCR billing and AI inventory.",
    url: "https://curemitra.com/about",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About CureMitra – AI Pharmacy Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CureMitra | India's AI Pharmacy Management Platform",
    description:
      "Meet the team behind CureMitra — AI-powered OCR billing and inventory for Indian pharmacies.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/about",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CureMitra",
    url: "https://curemitra.com/about",
    description:
      "CureMitra is India's AI-powered pharmacy management platform. We provide clinical-grade OCR billing, predictive inventory management, and HIPAA-compliant data protection for pharmacies and clinics.",
    publisher: {
      "@type": "Organization",
      name: "CureMitra",
      url: "https://curemitra.com",
      logo: "https://curemitra.com/icon.png",
      email: "curemitrapharma@gmail.com",
      foundingDate: "2024",
      areaServed: { "@type": "Country", name: "India" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
    </>
  );
}
