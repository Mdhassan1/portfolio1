import { motion } from 'motion/react';
import { EXPERIENCE_COMPANY } from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface ExperienceSectionProps {
  isSeoActive?: boolean;
}

export default function ExperienceSection({
  isSeoActive = false,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet sectionKey="experience" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left Sticky Header Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              04 / EXPERIENCE
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
              LEARNING.
              <br />
              CONTRIBUTING.
              <br />
              <span className="text-[var(--text-muted)]">BUILDING.</span>
            </h2>

            <div className="mt-8 border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-ink)]">
                Organization
              </p>
              <p className="mt-2 font-display text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {EXPERIENCE_COMPANY.company} — {EXPERIENCE_COMPANY.location}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Unified progression across internship and full-time software development across web
                and mobile products.
              </p>
            </div>
          </motion.div>

          {/* Right Unified Vertical Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-7 sm:pl-10">
              {/* Vertical Hairline Timeline Spine */}
              <div
                aria-hidden="true"
                className="absolute left-2.5 top-2 bottom-2 w-px bg-[var(--border-strong)]"
              />

              <div className="space-y-12">
                {EXPERIENCE_COMPANY.roles.map((item, idx) => (
                  <motion.div
                    key={item.role}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative"
                  >
                    {/* Timeline Node Square */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[25px] sm:-left-[37px] top-1.5 h-3.5 w-3.5 border ${
                        idx === 0
                          ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A]'
                          : 'border-[#090B0A] dark:border-[#C5FF4A]/70 bg-[var(--bg-canvas)]'
                      }`}
                    />

                    <div className="border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                            {item.role}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                            {EXPERIENCE_COMPANY.company} · {EXPERIENCE_COMPANY.location}
                          </p>
                        </div>

                        <span className="font-mono text-xs font-semibold tabular-nums text-[var(--accent-ink)]">
                          Duration: {item.duration}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 border border-[#090B0A]/60 dark:border-transparent bg-[#C5FF4A]"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
