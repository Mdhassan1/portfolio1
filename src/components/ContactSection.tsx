import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react';
import {
  CONTACT_INFO,
  CV_ASSET_URL,
  CV_DOWNLOAD_FILENAME,
} from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface ContactSectionProps {
  isSeoActive?: boolean;
}

export default function ContactSection({
  isSeoActive = false,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = CONTACT_INFO.email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-36"
    >
      <SectionSeoHelmet sectionKey="contact" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 lg:grid-cols-12 lg:items-end"
        >
          {/* Left Monumental CTA Headline */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              07 / LET&apos;S CONNECT
            </p>

            <h2 className="mt-5 font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]">
              HAVE AN IDEA?
              <br />
              <span className="inline-block bg-[#C5FF4A] px-2.5 py-0.5 text-[#090B0A] dark:bg-transparent dark:px-0 dark:py-0 dark:text-[#C5FF4A]">
                LET&apos;S BUILD IT.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              Interested in building something meaningful? Let&apos;s connect and turn an idea into
              reality.
            </p>

            {/* Primary Contact Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex min-h-[46px] items-center gap-2.5 border border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] px-6 py-3 text-sm font-semibold text-[#090B0A] transition-colors duration-150 hover:bg-[#d4ff73] whitespace-nowrap shrink-0"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email Me</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-[46px] items-center gap-2.5 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent-ink)] hover:text-[var(--accent-ink)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[var(--accent-ink)]" aria-hidden="true" />
                    <span className="text-[var(--accent-ink)]">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={CV_ASSET_URL}
                download={CV_DOWNLOAD_FILENAME}
                className="inline-flex min-h-[46px] items-center gap-2.5 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent-ink)] hover:text-[var(--accent-ink)] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Direct Details & Verified Project Link */}
          <div className="lg:col-span-5 border border-[var(--border-hairline)] bg-[var(--bg-surface)] divide-y divide-[var(--border-hairline)]">
            <div className="p-6 sm:p-7">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Direct Email
              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="mt-2 block font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-ink)] break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div className="p-6 sm:p-7">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Phone
              </span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="mt-2 inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tabular-nums text-[var(--text-primary)] transition-colors hover:text-[var(--accent-ink)]"
              >
                <Phone className="h-4 w-4 text-[var(--accent-ink)]" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="p-6 sm:p-7">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Featured Live Work
              </span>
              <a
                href={CONTACT_INFO.swapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--accent-ink)] transition-opacity hover:opacity-80"
              >
                <span>SWAP 2K26 Debugging Platform</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
