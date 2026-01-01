import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  schema?: object; // For JSON-LD Structured Data
  noIndex?: boolean;
}

const PageShell: React.FC<PageShellProps> = ({ title, description, children, schema, noIndex = false }) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Set Title
    document.title = `${title} | A+ Urban Design`;

    // 2. Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute('content', description);
    } else {
        // Fallback description if none provided
       metaDescription.setAttribute('content', 'TÜV-zertifizierte Skateparks, Pumptracks und Hockey-Banden aus Beton. Modular, fundamentfrei und langlebig.');
    }

    // 3. Set Canonical URL (Self-referencing, Hash-aware)
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    // Use window.location.href to catch the full hash url in SPA mode
    const canonicalUrl = window.location.href.split('?')[0];
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Set Robots (Index/NoIndex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 5. Inject Structured Data (JSON-LD)
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
        // Remove script tag if no schema for this page
        scriptTag.remove();
    }

    // 6. Breadcrumb Schema (Automatic based on URL)
    const breadcrumbId = 'breadcrumb-jsonld';
    let breadcrumbTag = document.getElementById(breadcrumbId);
    if (!breadcrumbTag) {
        breadcrumbTag = document.createElement('script');
        breadcrumbTag.id = breadcrumbId;
        breadcrumbTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbTag);
    }
    
    // Simple hash-based breadcrumb generation
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin + (window.location.hash ? '/#' : '')
            },
            ...pathSegments.map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `${window.location.origin}${window.location.hash ? '/#' : ''}/${pathSegments.slice(0, index + 1).join('/')}`
            }))
        ]
    };
    breadcrumbTag.textContent = JSON.stringify(breadcrumbList);


  }, [title, description, location, schema, noIndex]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
      {children}
    </div>
  );
};

export default PageShell;