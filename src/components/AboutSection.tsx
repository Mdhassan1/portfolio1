import { motion } from 'motion/react';
import { ABOUT_PILLARS } from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface AboutSectionProps {
  isSeoActive?: boolean;
}

export default function AboutSection({ isSeoActive = false }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet sectionKey="about" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left Sticky Editorial Header */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              01 / THE PERSON
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
              CURIOUS BY NATURE.
              <br />
              <span className="text-[var(--text-muted)]">BUILDER BY CHOICE.</span>
            </h2>
          </div>

          {/* Right Narrative Prose */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-[1.7] text-[var(--text-secondary)]">
            <p>
              I&apos;m Abdul Rahim, a Software Developer with professional development and internship
              experience at MoonProduct, Bangalore.
            </p>
            <p>
              I work across web and mobile application development, combining technical
              implementation with an interest in clean interfaces and useful product experiences.
            </p>
            <p>
              My experience includes contributing to ERP, travel, Bill of Materials and B2C
              e-commerce applications, alongside developing independent business and productivity
              products.
            </p>
            <p className="font-medium text-[var(--text-primary)]">
              I enjoy solving problems, learning new technologies and turning ideas into working
              applications.
            </p>
          </div>
        </motion.div>

        {/* Three Editorial Information Blocks */}
        <div className="mt-16 grid border-t border-l border-[var(--border-hairline)] md:grid-cols-3">
          {ABOUT_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border-r border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 sm:p-9 transition-colors duration-200 hover:bg-[var(--bg-surface-hover)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold tabular-nums text-[var(--accent-ink)]">
                  {pillar.index}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-6 bg-[var(--border-strong)] transition-colors duration-200 group-hover:bg-[#C5FF4A]"
                />
              </div>

              <h3 className="mt-8 font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                {pillar.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
