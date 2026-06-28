import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "CureMitra Privacy Policy | Data Access & Permissions",
  description:
    "Read the Privacy Policy for CureMitra (MyPharma). Understand how user profiles, medicine data registries, GSP GST filings, GPS location tracking, camera access, and Bluetooth permissions are governed for Indian pharmacies.",
  keywords: [
    "CureMitra Privacy Policy",
    "MyPharma Data Control",
    "Medical Records Governance",
    "OCR Scanning Agreement",
    "Pharmacy Data Privacy India",
    "Healthcare App Permissions",
  ],
  openGraph: {
    title: "CureMitra Privacy Policy | Data Access & Permissions",
    description:
      "How CureMitra handles user profiles, medicine data, GST filings, GPS tracking, and device permissions.",
    url: "https://curemitra.com/privacy-policy",
    siteName: "CureMitra",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://curemitra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CureMitra Privacy Policy – Data Protection & Permissions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CureMitra Privacy Policy | Data Access & Permissions",
    description:
      "How CureMitra handles user profiles, medicine data, GST filings, and device permissions.",
    images: ["https://curemitra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://curemitra.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const policySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CureMitra Privacy Policy",
    description:
      "Privacy policy and data governance for CureMitra (MyPharma) pharmacy management platform.",
    url: "https://curemitra.com/privacy-policy",
    datePublished: "2026-04-16",
    dateModified: "2026-06-27",
    isPartOf: {
      "@type": "WebSite",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
    about: {
      "@type": "SoftwareApplication",
      name: "CureMitra",
    },
    author: {
      "@type": "Organization",
      name: "CureMitra",
      url: "https://curemitra.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(policySchema),
        }}
      />
      <PrivacyClient />
    </>
  );
}
