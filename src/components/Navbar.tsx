import { useState, useEffect } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import {
  CONTACT_INFO,
  CV_ASSET_URL,
  CV_DOWNLOAD_FILENAME,
  NAV_ITEMS,
} from '../data/portfolioData';

export type PortfolioTheme = 'dark' | 'light';

interface NavbarProps {
  activeSection: string;
  theme: PortfolioTheme;
  onToggleTheme: () => void;
}

export default function Navbar({
  activeSection,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 border-b border-[var(--border-hairline)] backdrop-blur-md ${
        scrolled
          ? 'bg-[var(--nav-bg)]'
          : 'bg-[var(--bg-canvas)]/80'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 lg:gap-8 px-4 sm:px-6 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-[0.06em] text-[var(--text-primary)] hover:text-[var(--accent-ink)] transition-colors duration-150 whitespace-nowrap shrink-0"
        >
          {CONTACT_INFO.wordmark}
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[var(--accent-ink)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#C5FF4A] dark:bg-[#C5FF4A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Switch + Primary CV Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={!isDark}
            aria-label={
              isDark
                ? 'Switch to High Contrast Light theme'
                : 'Switch to Deep Charcoal theme'
            }
            title={
              isDark
                ? 'Theme: Deep Charcoal (Click for High Contrast Light)'
                : 'Theme: High Contrast Light (Click for Deep Charcoal)'
            }
            className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-strong)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#C5FF4A]" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#090B0A]" aria-hidden="true" />
                <span className="hidden sm:inline">Charcoal</span>
              </>
            )}
          </button>

          <a
            href={CV_ASSET_URL}
            download={CV_DOWNLOAD_FILENAME}
            className="hidden sm:inline-flex min-h-[40px] items-center gap-2 border border-[#090B0A] dark:border-[#C5FF4A]/70 bg-[#C5FF4A] px-4 py-2 text-xs font-semibold tracking-wide text-[#090B0A] transition-colors duration-150 hover:bg-[#d4ff73] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Download CV</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] lg:hidden cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Compact Mobile Navigation Panel */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-5 lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex min-h-[44px] items-center justify-between border-b border-[var(--border-hairline)] px-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--accent-ink)] font-semibold'
                      : 'text-[var(--text-primary)] hover:text-[var(--accent-ink)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {isActive ? 'Active' : ''}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Theme Toggle Row */}
          <div className="mt-4 flex items-center justify-between border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Theme
            </span>
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-[#C5FF4A]" aria-hidden="true" />
                  <span>Deep Charcoal → Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#090B0A]" aria-hidden="true" />
                  <span>High Contrast Light → Charcoal</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4">
            <a
              href={CV_ASSET_URL}
              download={CV_DOWNLOAD_FILENAME}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] px-5 py-3 text-sm font-semibold text-[#090B0A] transition-colors hover:bg-[#d4ff73]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
