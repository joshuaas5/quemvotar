'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/parlamentares', label: 'Parlamentares' },
  { href: '/ranking', label: 'Ranking' },
  { href: '/match', label: 'Match' },
  { href: '/partidos', label: 'Partidos' },
  { href: '/#dados', label: 'Panorama' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50 bg-[#f5f6f7] border-b-4 border-black neo-brutalist-shadow">
        <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
          <Image
            src="/logo-header.png"
            alt="QuemVotar"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12"
            priority
            unoptimized
          />
          <span className="text-2xl sm:text-3xl font-black text-black tracking-tighter font-headline uppercase">
            QUEM VOTAR.
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-headline font-black uppercase tracking-tighter">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href) && href !== '/#dados');
            return (
              <Link
                key={href}
                href={href}
                className={`${isActive ? 'text-black border-b-4 border-black pb-1' : 'text-black/60 hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75'} active:scale-95 cursor-pointer`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parlamentares"
            className="hidden sm:block bg-primary-container text-black border-4 border-black px-6 py-2 font-headline font-black uppercase tracking-tighter hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Explorar
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 border-2 border-black flex items-center justify-center bg-white active:scale-95 cursor-pointer"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Fechar menu"
          />

          <aside className="absolute top-0 right-0 w-72 h-full bg-[#f5f6f7] border-l-4 border-black shadow-[-8px_0_0_0_rgba(0,0,0,1)] flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-5 py-4 border-b-4 border-black">
              <span className="font-headline font-black text-lg uppercase">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 border-2 border-black flex items-center justify-center bg-white active:scale-95 cursor-pointer"
                aria-label="Fechar menu"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <nav className="flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 font-headline font-black uppercase text-lg border-b-2 border-black/10 hover:bg-primary-container/30 active:bg-primary-container/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-5">
              <Link
                href="/parlamentares"
                onClick={() => setOpen(false)}
                className="block w-full bg-primary-container text-center text-black border-4 border-black px-6 py-3 font-headline font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Explorar
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
