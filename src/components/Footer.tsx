import { ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-canvas)] py-10 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <p className="font-display text-base font-bold tracking-[0.06em] text-[var(--text-primary)]">
            {CONTACT_INFO.name.toUpperCase()}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            &ldquo;Designed with curiosity. Built with purpose.&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 sm:justify-end">
          <p className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
            &copy; {currentYear} {CONTACT_INFO.name}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent-ink)] cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
