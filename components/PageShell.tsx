
import React, { useEffect } from 'react';

interface PageShellProps {
  title: string;
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | A+ Urban Design`;
  }, [title]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {children}
    </div>
  );
};

export default PageShell;
