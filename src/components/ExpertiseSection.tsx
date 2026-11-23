import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TECH_CATEGORIES,
  TECH_ITEMS,
  type TechCategoryId,
  type TechItem,
} from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface ExpertiseSectionProps {
  isSeoActive?: boolean;
}

export default function ExpertiseSection({
  isSeoActive = false,
}: ExpertiseSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>('all');
  const [selectedTool, setSelectedTool] = useState<TechItem>(TECH_ITEMS[0]);

  const visibleItems =
    activeCategory === 'all'
      ? TECH_ITEMS
      : TECH_ITEMS.filter((item) => item.categoryId === activeCategory);

  return (
    <section
      id="expertise"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet sectionKey="expertise" isActive={isSeoActive} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header & Interactive Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              02 / MY TOOLKIT
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
              TOOLS THAT TURN
              <br />
              <span className="text-[var(--text-muted)]">IDEAS INTO REALITY.</span>
            </h2>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter technical expertise by discipline"
            className="flex flex-wrap gap-2"
          >
            {TECH_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(category.id);
                    const firstMatch =
                      category.id === 'all'
                        ? TECH_ITEMS[0]
                        : TECH_ITEMS.find((i) => i.categoryId === category.id);
                    if (firstMatch) setSelectedTool(firstMatch);
                  }}
                  className={`min-h-[40px] border px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] text-[#090B0A] font-semibold'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Split Matrix + Context Panel */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Typographic Technology Grid */}
          <div className="lg:col-span-8 grid border-t border-l border-[var(--border-hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((tool, index) => {
              const isFocused = selectedTool.name === tool.name;
              return (
                <motion.button
                  key={tool.name}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setSelectedTool(tool)}
                  onFocus={() => setSelectedTool(tool)}
                  onClick={() => setSelectedTool(tool)}
                  className={`group relative flex min-h-[144px] flex-col justify-between border-r border-b border-[var(--border-hairline)] p-6 text-left transition-colors duration-150 cursor-pointer ${
                    isFocused
                      ? 'bg-[var(--bg-surface-hover)]'
                      : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  {/* Top Row: Category Label & Subtle Corner Mark */}
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {tool.categoryLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 border transition-colors duration-150 ${
                        isFocused
                          ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A]'
                          : 'border-transparent bg-[var(--border-hairline)] group-hover:bg-[#C5FF4A]'
                      }`}
                    />
                  </div>

                  {/* Tool Display Name */}
                  <div className="mt-6">
                    <span
                      className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-150 ${
                        isFocused
                          ? 'text-[var(--accent-ink)]'
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent-ink)]'
                      }`}
                    >
                      {tool.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Context Panel (Interactive Visual Detail) */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Selected Capability
                </span>
                <span className="font-mono text-xs font-medium text-[var(--accent-ink)]">
                  {selectedTool.categoryLabel}
                </span>
              </div>

              <h3 className="mt-7 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {selectedTool.name}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                {selectedTool.contextNote}
              </p>
            </div>

            {/* Clean Architectural Discipline Summary */}
            <div className="mt-10 border-t border-[var(--border-hairline)] pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Stack Architecture
              </p>
              <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-[var(--text-primary)]">
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    Frontend &amp; Mobile
                  </span>
                  <span className="mt-0.5 block font-medium">
                    React.js · React Native · FlutterFlow
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    Database
                  </span>
                  <span className="mt-0.5 block font-medium">Supabase</span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    Design
                  </span>
                  <span className="mt-0.5 block font-medium">Figma · Stitch</span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    Tools
                  </span>
                  <span className="mt-0.5 block font-medium">
                    GitHub · Photoshop · MS Office
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
