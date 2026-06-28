import CompareClient from './CompareClient';

export const metadata = {
  title: 'CureMitra vs Marg ERP vs GoFrugal | Best Pharmacy Billing Software India 2026',
  description:
    'Compare CureMitra (MyPharma) with Marg ERP and GoFrugal. See why 500+ Indian pharmacies choose CureMitra\'s AI OCR billing, cloud-first architecture, and HIPAA compliance over legacy desktop software.',
  keywords: [
    'CureMitra vs Marg ERP',
    'CureMitra vs GoFrugal',
    'best pharmacy billing software India 2026',
    'pharmacy management software comparison',
    'Marg ERP alternative',
    'cloud pharmacy software India',
    'AI pharmacy billing app',
    'GST pharmacy software comparison',
  ],
  openGraph: {
    title: 'CureMitra vs Marg ERP vs GoFrugal | Pharmacy Software Comparison',
    description:
      'Side-by-side comparison of India\'s top pharmacy management platforms. See how CureMitra\'s AI-powered, cloud-native approach compares to legacy ERP software.',
    url: 'https://curemitra.com/compare',
    siteName: 'CureMitra',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://curemitra.com/compare',
  },
};

export default function ComparePage() {
  const compareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'CureMitra vs Marg ERP vs GoFrugal — Pharmacy Software Comparison',
    description:
      'Detailed comparison of CureMitra, Marg ERP, and GoFrugal for Indian pharmacy management.',
    url: 'https://curemitra.com/compare',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'CureMitra',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, iOS, Web, Windows',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free Starter plan, Professional from ₹2,499/month',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSchema) }}
      />
      <CompareClient />
    </>
  );
}
