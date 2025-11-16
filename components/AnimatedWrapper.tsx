import React, { useEffect, useRef, ReactNode } from 'react';

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  animation: string;
  delay?: number; // delay in ms
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  animation,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentRef.classList.add(animation);
            currentRef.style.animationDelay = `${delay}ms`;
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, delay, threshold, triggerOnce]);

  return (
    <div ref={ref} className={`animated-section ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedWrapper;
