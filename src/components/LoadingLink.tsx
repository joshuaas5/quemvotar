'use client';

import Link from 'next/link';
import { useNavigation } from './NavigationProvider';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function LoadingLink({ href, children, className = '', target, rel, onClick }: LoadingLinkProps) {
  const { startNavigation } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    if (target === '_blank') {
      onClick?.(e);
      return;
    }
    startNavigation();
    onClick?.(e);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} target={target} rel={rel}>
      {children}
    </Link>
  );
}
