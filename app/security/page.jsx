import SecurityClient from "./SecurityClient";

export const metadata = {
  title: "CureMitra Security | Clinical-Grade Encrypted Data Protection",
  description:
    "CureMitra (MyPharma) ensures complete data protection with end-to-end encryption, role-based access control, and clinical-grade security standards. Learn about our data protection principles, RBAC policies, and compliance governance for pharmacy data in India.",
  keywords: [
    "CureMitra Security",
    "MyPharma Security",
    "Data Protection",
    "Pharmacy Data Encryption",
    "Encrypted Medical POS",
    "Role-Based Access Control Pharmacy",
    "Clinical Data Security India",
    "GDPR Compliance Pharmacy",
  ],
  openGraph: {
    title: "CureMitra Security | Clinical-Grade Encrypted Data Protection",
    description:
      "End-to-end encryption, role-based access control, and clinical-grade security for pharmacy data protection.",
    url: "https://curemitra.com/security",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra Security – Clinical-Grade Data Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra Security | Clinical-Grade Data Protection",
    description:
      "End-to-end encryption, RBAC, and clinical-grade security for pharmacy data.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/security",
  },
};

export default function SecurityPage() {
  const securitySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CureMitra Security & Data Protection",
    description:
      "Clinical-grade security standards, end-to-end encryption, and role-based access control for pharmacy data protection.",
    url: "https://curemitra.com/security",
    isPartOf: {
      "@type": "WebSite",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
    about: {
      "@type": "SoftwareApplication",
      name: "CureMitra",
    },
    dateModified: "2026-06-27",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(securitySchema),
        }}
      />
      <SecurityClient />
    </>
  );
}
