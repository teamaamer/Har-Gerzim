'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothScrollLink({ href, children, className, onClick }: SmoothScrollLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const [path, hash] = href.split('#');
    
    // If there's a hash and we're on the same page (or going to home page)
    if (hash) {
      const currentPath = pathname.split('#')[0];
      const targetPath = path || '/';
      
      // Check if we're on the target page
      if (currentPath === targetPath || pathname === targetPath) {
        e.preventDefault();
        
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80; // Height of sticky header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        
        if (onClick) onClick();
      } else {
        // Navigate to the page first, then scroll
        e.preventDefault();
        router.push(href);
        
        // Wait for navigation and then scroll
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
        
        if (onClick) onClick();
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
