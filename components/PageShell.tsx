import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  schema?: object; // For JSON-LD Structured Data
  noIndex?: boolean;
  fullWidth?: boolean; // NEW: Opt-out of the default container constraint
}

const BASE_URL = 'https://www.aplusurbandesign.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/skateparks/skatepark-02.jpg`;

const setMeta = (attr: string, value: string, attrName = 'property') => {
  let el = document.querySelector(`meta[${attrName}="${attr}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attr);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const PageShell: React.FC<PageShellProps> = ({ title, description, children, schema, noIndex = false, fullWidth = false }) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = `${title} | A+ Urban Design`;
    const pageDesc = description ?? 'TÜV-zertifizierte Skateparks, Pumptracks und Hockey-Banden aus Beton. Modular, fundamentfrei und langlebig.';
    const pageUrl = `${BASE_URL}${location.pathname}`;

    // 1. Title
    document.title = pageTitle;

    // 2. Meta Description
    setMeta('description', pageDesc, 'name');

    // 3. Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', pageUrl);

    // 4. Robots
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow', 'name');

    // 5. Open Graph
    setMeta('og:title', pageTitle);
    setMeta('og:description', pageDesc);
    setMeta('og:url', pageUrl);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'A+ Urban Design');
    setMeta('og:image', DEFAULT_OG_IMAGE);
    setMeta('og:image:width', '1200');
    setMeta('og:image:height', '630');

    // 6. Twitter Card
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', pageTitle, 'name');
    setMeta('twitter:description', pageDesc, 'name');
    setMeta('twitter:image', DEFAULT_OG_IMAGE, 'name');

    // 7. JSON-LD (page-specific)
    const scriptId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(scriptId);
    if (schema) {
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.id = scriptId;
            scriptTag.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
        scriptTag.remove();
    }

    // 8. Breadcrumb JSON-LD
    const breadcrumbId = 'breadcrumb-jsonld';
    let breadcrumbTag = document.getElementById(breadcrumbId);
    if (!breadcrumbTag) {
        breadcrumbTag = document.createElement('script');
        breadcrumbTag.id = breadcrumbId;
        breadcrumbTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbTag);
    }
    const pathSegments = location.pathname.split('/').filter(Boolean);
    breadcrumbTag.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            ...pathSegments.map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `${BASE_URL}/${pathSegments.slice(0, index + 1).join('/')}`
            }))
        ]
    });

  }, [title, description, location, schema, noIndex]);

  if (fullWidth) {
      return (
          <div className="relative z-30 w-full">
              {children}
          </div>
      );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
      {children}
    </div>
  );
};

export default PageShell;