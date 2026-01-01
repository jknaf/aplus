import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Mapping of old 25-year-old HTML files to new React Routes
const LEGACY_MAP: Record<string, string> = {
  '/skatepark-fotos.html': '/projekte',
  '/ueberdachung-pavillon.html': '/produkte/ueberdachung-beton',
  '/kontakt.html': '/kontakt',
  '/pumptrack.html': '/produkte/pumptrack-beton',
  '/impressum.html': '/impressum',
  '/session-2.html': '/projekte', // Fallback for gallery pages
  '/info.html': '/ueber-uns',
  '/standard-skate-bowl.html': '/produkte/skate-anlagen',
  '/funcourt-bolzplatz.html': '/produkte/hockey-banden',
  '/skate-anlagen.html': '/produkte/skate-anlagen',
  '/skate-pipes-standard-html': '/produkte/skate-anlagen', // Covering typo in screenshot
  '/skate-pipes-standard.html': '/produkte/skate-anlagen',
  '/skate-pipes.html': '/produkte/skate-anlagen',
  '/skate-park.html': '/produkte/skate-anlagen',
  // Cover variations with and without .html just in case
  '/skatepark-fotos': '/projekte',
  '/pumptrack': '/produkte/pumptrack-beton',
};

const LegacyRedirectHandler: React.FC = () => {
  // We cannot use useLocation from react-router strictly here because
  // the old URLs are outside the HashRouter's knowledge (they are real file paths in the URL bar).
  // We must check window.location.pathname directly.

  useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Check if the current path exists in our legacy map
    // We treat it case-insensitive and allow trailing slashes
    const normalizedPath = currentPath.toLowerCase().replace(/\/$/, "");

    // Direct match check
    if (LEGACY_MAP[normalizedPath]) {
      const targetRoute = LEGACY_MAP[normalizedPath];
      
      // Perform a hard redirect to replace the URL structure from
      // domain.com/old.html -> domain.com/#/new-route
      // We use window.location.replace to simulate a HTTP 301 behavior (history replacement)
      // and ensure the .html part is completely removed from the address bar.
      const newUrl = `${window.location.origin}/#${targetRoute}`;
      window.location.replace(newUrl);
    }
  }, []);

  return null; // This component renders nothing
};

export default LegacyRedirectHandler;