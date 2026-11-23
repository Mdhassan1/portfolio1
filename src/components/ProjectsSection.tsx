import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectFilterGroup,
  type ProjectItem,
} from '../data/portfolioData';
import ProjectArtwork from './ProjectArtwork';
import SectionSeoHelmet from './SectionSeoHelmet';

interface ProjectsSectionProps {
  isSeoActive?: boolean;
}

export default function ProjectsSection({
  isSeoActive = false,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectFilterGroup>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterGroup === filter);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight') {
        const idx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
        setSelectedProject(PROJECTS[(idx + 1) % PROJECTS.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
        setSelectedProject(
          PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const idx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIdx =
      direction === 'next'
        ? (idx + 1) % PROJECTS.length
        : (idx - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIdx]);
  };

  return (
    <section
      id="projects"
      className="border-b border-[var(--border-hairline)] py-20 sm:py-28 lg:py-32"
    >
      <SectionSeoHelmet
        sectionKey="projects"
        isActive={isSeoActive || Boolean(selectedProject)}
        activeProject={selectedProject}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header + Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-ink)] uppercase">
              03 / SELECTED WORKS
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.03] tracking-[-0.025em] text-[var(--text-primary)]">
              BUILT WITH PURPOSE.
              <br />
              <span className="text-[var(--text-muted)]">CREATED TO SOLVE.</span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={`min-h-[40px] border px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] text-[#090B0A] font-semibold'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetric 2-Column Editorial Project Gallery */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project, index) => {
            const isHighlighted = project.id === 'swap-2k26-debugging-platform';
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group flex flex-col justify-between border transition-colors duration-200 bg-[var(--bg-surface)] ${
                  isHighlighted
                    ? 'border-[#090B0A]/55 hover:border-[#090B0A] dark:border-[#C5FF4A]/35 dark:bg-[#0E1210] dark:hover:border-[#C5FF4A]'
                    : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  {/* Bespoke Visual Preview */}
                  <div className="border-b border-[var(--border-hairline)]">
                    <ProjectArtwork variant={project.artwork} />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[var(--accent-ink)]">
                        PROJECT {project.number}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-[1.65rem] font-bold leading-tight tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-ink)]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                      {project.description}
                    </p>

                    {project.features && project.features.length > 0 && (
                      <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                        {project.features.join(' · ')}
                      </p>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                        {project.technologies.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] px-6 py-4 sm:px-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex min-h-[40px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent-ink)] cursor-pointer"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-80"
                    >
                      <span>{project.externalLabel || 'Live Website'}</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Detail Overlay Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090B0A]/80 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="font-semibold text-[var(--accent-ink)]">
                  PROJECT {selectedProject.number}
                </span>
                <span className="text-[var(--border-strong)]">/</span>
                <span className="text-[var(--text-muted)]">
                  {selectedProject.visualType}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border-hairline)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent-ink)] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Artwork Showcase */}
            <div className="border-b border-[var(--border-hairline)]">
              <ProjectArtwork variant={selectedProject.artwork} large />
            </div>

            {/* Project Content */}
            <div className="p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {selectedProject.category}
              </p>

              <h3
                id="project-modal-title"
                className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                {selectedProject.description}
              </p>

              {selectedProject.features &&
                selectedProject.features.length > 0 && (
                  <div className="mt-7 border-t border-[var(--border-hairline)] pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Platform Capabilities
                    </h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
                      {selectedProject.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-sm text-[var(--text-primary)]"
                        >
                          <Check
                            className="h-3.5 w-3.5 shrink-0 text-[var(--accent-ink)]"
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedProject.technologies &&
                selectedProject.technologies.length > 0 && (
                  <div className="mt-7 border-t border-[var(--border-hairline)] pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Associated MoonProduct Stack
                    </h4>
                    <p className="mt-2.5 font-mono text-sm text-[var(--text-secondary)]">
                      {selectedProject.technologies.join(' · ')}
                    </p>
                  </div>
                )}

              {/* Bottom Modal Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateModal('prev')}
                    className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-hairline)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent-ink)] cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateModal('next')}
                    className="inline-flex min-h-[40px] items-center gap-2 border border-[var(--border-hairline)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent-ink)] cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                {selectedProject.externalUrl && (
                  <a
                    href={selectedProject.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 border border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] px-5 py-2.5 text-xs font-semibold text-[#090B0A] transition-colors hover:bg-[#d4ff73]"
                  >
                    <span>Visit bugbust.vercel.app</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
