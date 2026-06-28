import HomeClient from "./HomeClient";

export const metadata = {
  title: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software (MyPharma)",
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
  openGraph: {
    title: "CureMitra | Next-Gen AI Pharmacy OS & Billing Software",
    description:
      "Automate pharmacy billing with clinical-grade OCR, manage stocks with predictive AI, and sync GST with Cleartax. India's #1 AI pharmacy platform.",
    url: "https://curemitra.com",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra – AI-Powered Pharmacy Management Software for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra | AI Pharmacy Billing & OS",
    description:
      "Automate pharmacy billing with OCR, manage stocks with AI, and sync GST.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com",
  },
};

export default function HomePage() {
  /* ── Homepage FAQ Schema for GEO (AI Overviews, Perplexity, ChatGPT) ── */
  const homepageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is CureMitra (MyPharma)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CureMitra, also known as MyPharma, is India's leading AI-powered pharmacy management platform. It provides clinical-grade OCR billing at 99.9% accuracy, AI-driven predictive inventory, multi-GSP GST tax sync with Cleartax and Mastersindia, doctor chamber scheduling, multi-channel dispatch, EHR vitals tracking, and mobile GPS delivery with Bluetooth print SDK — all in one unified platform.",
        },
      },
      {
        "@type": "Question",
        name: "How does CureMitra OCR billing work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CureMitra uses Google ML Kit text recognition to scan prescriptions and invoices. It captures medicine names, quantities, batch details, and HSN codes with 99.9% accuracy. The OCR engine evaluates text snippets locally for fast, clinical-grade billing without manual data entry.",
        },
      },
      {
        "@type": "Question",
        name: "Does CureMitra support GST filing in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. CureMitra automates GST compliance by integrating directly with government GSP providers including Cleartax, Mastersindia, and Vayana. It generates GSTR-1 files with dynamic GST parsing, CGST/SGST/IGST tax allocations, and reverse charge indicators — all from your billing workflow.",
        },
      },
      {
        "@type": "Question",
        name: "Is CureMitra free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CureMitra offers a free tier for pharmacies. The app is available on Android, iOS, Windows, and Web platforms. You can start with the free plan and scale as your pharmacy operations grow.",
        },
      },
      {
        "@type": "Question",
        name: "What security features does CureMitra offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CureMitra provides clinical-grade data protection with end-to-end encryption, role-based access control (RBAC) for ADMIN, PHARMACIST, MANAGER, and SALESMAN roles, encrypted data channels, and hardened storage controls. All API requests are signed and authenticated.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageFaqSchema),
        }}
      />
      <HomeClient />
    </>
  );
}
