import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface LeadershipSectionProps {
  isSeoActive?: boolean;
}

export default function LeadershipSection({
  isSeoActive = false,
}: LeadershipSectionProps) {
  return (
    <section
      id="leadership"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface-alt)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet sectionKey="leadership" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              05 / BEYOND CODE
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
              LEADERSHIP, INITIATIVE
              <br />
              <span className="text-[var(--text-muted)]">&amp; COMPETITIVE SPIRIT.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
            Organizing inter-college competitions, leading student committees, and building event
            platforms alongside competitive debugging.
          </p>
        </motion.div>

        {/* Visually Distinct Large-Number Editorial Grid */}
        <div className="mt-14 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid items-baseline gap-4 py-7 sm:py-8 md:grid-cols-12 md:gap-8 transition-colors duration-150 hover:bg-[var(--bg-surface)] px-2 sm:px-4"
            >
              {/* Oversized Tabular Number */}
              <div className="md:col-span-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight text-[#090B0A]/20 dark:text-white/20 transition-colors duration-200 group-hover:text-[var(--accent-ink)]">
                  {item.number}
                </span>
              </div>

              {/* Role / Achievement Title */}
              <div className="md:col-span-5">
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs font-medium text-[var(--accent-ink)]">
                  {item.subtitle}
                </p>
              </div>

              {/* Description & Optional Verified Link */}
              <div className="md:col-span-5 flex flex-col justify-between gap-3">
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>

                {item.externalUrl && (
                  <div>
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-80"
                    >
                      <span>bugbust.vercel.app</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
