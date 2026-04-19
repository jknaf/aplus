import { useEffect, useState } from 'react';

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    );
    document
      .querySelectorAll('.assembly-page .reveal, .assembly-page .fade-stagger')
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const bar = document.getElementById('assembly-progress-bar');
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (bar) bar.style.width = p + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
