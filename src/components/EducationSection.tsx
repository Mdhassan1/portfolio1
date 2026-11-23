import { motion } from 'motion/react';
import { EDUCATION_DATA } from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface EducationSectionProps {
  isSeoActive?: boolean;
}

export default function EducationSection({
  isSeoActive = false,
}: EducationSectionProps) {
  return (
    <section
      id="education"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet sectionKey="education" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
            06 / EDUCATION
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
            ACADEMIC FOUNDATION.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Primary Undergraduate Degree Block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between border border-[#090B0A]/45 dark:border-[#C5FF4A]/35 bg-[var(--bg-surface)] p-7 sm:p-10"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-5">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-ink)]">
                  Undergraduate Degree
                </span>
                <span className="font-mono text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                  Current aggregate: {EDUCATION_DATA.degree.aggregate}
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {EDUCATION_DATA.degree.title}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
                {EDUCATION_DATA.degree.institution}
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                {EDUCATION_DATA.degree.university}
              </p>
            </div>

            <div className="mt-10 border-t border-[var(--border-hairline)] pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Additional Courses
              </p>
              <p className="mt-2 text-base font-medium text-[var(--text-primary)]">
                {EDUCATION_DATA.courses.join(' · ')}
              </p>
            </div>
          </motion.div>

          {/* Schooling Records */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {EDUCATION_DATA.schooling.map((school, idx) => (
              <motion.div
                key={school.level}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (idx + 1) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-1 flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Academic Milestone
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                    {school.period}
                  </span>
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {school.level}
                  </h3>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums text-[var(--accent-ink)]">
                    {school.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
