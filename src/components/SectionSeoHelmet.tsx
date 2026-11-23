import { Helmet } from 'react-helmet-async';
import {
  CONTACT_INFO,
  PROJECTS,
  SECTION_SEO_META,
  TECH_ITEMS,
  type ProjectItem,
  type SectionSeoKey,
} from '../data/portfolioData';

interface SectionSeoHelmetProps {
  sectionKey: SectionSeoKey;
  isActive: boolean;
  activeProject?: ProjectItem | null;
}

function getBaseUrl(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${window.location.pathname}`;
}

function buildSectionSchema(
  sectionKey: SectionSeoKey,
  sectionUrl: string,
  title: string,
  description: string,
  activeProject?: ProjectItem | null
): Record<string, unknown> {
  const personEntity = {
    '@type': 'Person',
    name: CONTACT_INFO.name,
    jobTitle: 'Software Developer',
    email: `mailto:${CONTACT_INFO.email}`,
    telephone: CONTACT_INFO.phoneDisplay,
    worksFor: {
      '@type': 'Organization',
      name: 'MoonProduct',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressCountry: 'IN',
      },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'MIET Arts and Science College, Bharathidasan University',
    },
    knowsAbout: TECH_ITEMS.map((item) => item.name),
  };

  if (sectionKey === 'projects' && activeProject) {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: activeProject.title,
      description: activeProject.description,
      genre: activeProject.category,
      creator: personEntity,
      url: activeProject.externalUrl || sectionUrl,
    };
  }

  if (sectionKey === 'projects') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: sectionUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          description: project.description,
          url: project.externalUrl || `${sectionUrl}#${project.id}`,
        })),
      },
    };
  }

  if (sectionKey === 'home') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: title,
      description,
      url: sectionUrl,
      mainEntity: personEntity,
    };
  }

  const meta = SECTION_SEO_META[sectionKey];
  return {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: title,
    description,
    url: sectionUrl,
    about: personEntity,
  };
}

export default function SectionSeoHelmet({
  sectionKey,
  isActive,
  activeProject,
}: SectionSeoHelmetProps) {
  if (!isActive) return null;

  const meta = SECTION_SEO_META[sectionKey];
  const baseUrl = getBaseUrl();
  const sectionUrl =
    sectionKey === 'home' ? baseUrl : `${baseUrl}#${sectionKey}`;

  const title =
    sectionKey === 'projects' && activeProject
      ? `${activeProject.shortTitle} — Project ${activeProject.number} | Abdul Rahim S`
      : meta.title;

  const description =
    sectionKey === 'projects' && activeProject
      ? `${activeProject.description} (${activeProject.category})`
      : meta.description;

  const keywords =
    sectionKey === 'projects' && activeProject && activeProject.technologies
      ? Array.from(new Set([...meta.keywords, ...activeProject.technologies]))
      : meta.keywords;

  const canonicalUrl =
    sectionKey === 'projects' && activeProject?.externalUrl
      ? sectionUrl
      : sectionUrl;

  const structuredData = buildSectionSchema(
    sectionKey,
    canonicalUrl,
    title,
    description,
    activeProject
  );

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={CONTACT_INFO.name} />
      <meta name="robots" content="index, follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta
        property="og:site_name"
        content="Abdul Rahim S — Digital Architect Portfolio"
      />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
