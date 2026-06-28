import BlogClient from './BlogClient';

export const metadata = {
  title: 'CureMitra Blog | Pharmacy Management, GST Compliance & AI Billing Guides',
  description:
    'Expert guides for Indian pharmacy owners: GST filing, prescription billing, AI inventory management, and switching from legacy software. Written by the CureMitra team.',
  keywords: [
    'pharmacy management blog India',
    'GST filing pharmacy guide',
    'pharmacy billing software tips',
    'AI inventory management pharmacy',
    'HIPAA pharmacy compliance India',
    'switch from Marg ERP guide',
    'prescription OCR billing guide',
    'CureMitra blog',
  ],
  openGraph: {
    title: 'CureMitra Blog | Pharmacy Operations & AI Billing Guides',
    description:
      'Practical guides for Indian pharmacy owners on GST compliance, AI billing, inventory management, and more.',
    url: 'https://curemitra.com/blog',
    siteName: 'CureMitra',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://curemitra.com/blog',
  },
};

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CureMitra Blog',
    description: 'Expert pharmacy management guides from the CureMitra team.',
    url: 'https://curemitra.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'CureMitra',
      url: 'https://curemitra.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient />
    </>
  );
}
