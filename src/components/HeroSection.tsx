import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { CV_ASSET_URL, CV_DOWNLOAD_FILENAME } from '../data/portfolioData';
import SectionSeoHelmet from './SectionSeoHelmet';

interface HeroSectionProps {
  isSeoActive?: boolean;
}

export default function HeroSection({ isSeoActive = false }: HeroSectionProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -12, y: nx * 14 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between border-b border-[var(--border-hairline)] pt-24 pb-8 sm:pt-28 lg:pt-32"
    >
      <SectionSeoHelmet sectionKey="home" isActive={isSeoActive} />
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Left Editorial Typography Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs sm:text-sm font-medium tracking-[0.14em] text-[var(--accent-ink)] uppercase"
          >
            Software Developer / Digital Builder
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-[3.1rem] sm:text-[4.4rem] md:text-[5.25rem] xl:text-[5.85rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            <span className="block">I BUILD</span>
            <span className="inline-block bg-[#C5FF4A] px-2.5 py-0.5 text-[#090B0A] dark:bg-transparent dark:px-0 dark:py-0 dark:text-[#C5FF4A]">
              DIGITAL
            </span>
            <span className="block">EXPERIENCES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            I&apos;m Abdul Rahim, a software developer passionate about transforming ideas into
            practical digital products through thoughtful engineering and design.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-mono text-xs sm:text-sm text-[var(--text-muted)]"
          >
            Web Development · Mobile Applications · Product Thinking · UI/UX
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex min-h-[46px] items-center gap-2.5 border border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] px-6 py-3 text-sm font-semibold text-[#090B0A] transition-colors duration-150 hover:bg-[#d4ff73] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={CV_ASSET_URL}
              download={CV_DOWNLOAD_FILENAME}
              className="inline-flex min-h-[46px] items-center gap-2.5 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent-ink)] hover:text-[var(--accent-ink)] whitespace-nowrap shrink-0"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right Architectural 3D Geometric Structure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handlePointerMove}
          onMouseLeave={resetTilt}
          aria-hidden="true"
          className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0"
        >
          <div className="relative h-[340px] sm:h-[420px] w-full max-w-[460px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
            {/* Inner Architectural Technical Grid */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />

            {/* Corner Architectural Registration Marks */}
            <span className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-[#090B0A] dark:border-[#C5FF4A]/80" />
            <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-[var(--border-strong)]" />
            <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[var(--border-strong)]" />
            <span className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#090B0A] dark:border-[#C5FF4A]/80" />

            {/* Subtle Radial Accent Glow Behind Geometry */}
            <div
              className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 dark:opacity-25 blur-3xl"
              style={{ backgroundColor: '#C5FF4A' }}
            />

            {/* 3D Interactive Perspective Stage */}
            <div
              className="architect-perspective relative flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* 3D Geometric Wireframe & Planes */}
              <div className="architect-cube-stage architect-cube-orbit relative h-44 w-44 sm:h-52 sm:w-52">
                {/* Front Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/65 bg-white/55 dark:border-[#C5FF4A]/55 dark:bg-[#111413]/55"
                  style={{ transform: 'translateZ(88px)' }}
                >
                  <div className="absolute inset-4 border border-[#090B0A]/15 dark:border-white/10" />
                  <div className="absolute top-4 left-4 h-2.5 w-2.5 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/25 bg-[#ECEEE9]/40 dark:border-white/15 dark:bg-[#090B0A]/40"
                  style={{ transform: 'rotateY(180deg) translateZ(88px)' }}
                />

                {/* Right Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/30 bg-[#E3E6DF]/45 dark:border-white/20 dark:bg-[#141816]/45"
                  style={{ transform: 'rotateY(90deg) translateZ(88px)' }}
                >
                  <div className="absolute inset-y-6 left-1/2 w-px bg-[#090B0A]/35 dark:bg-[#C5FF4A]/35" />
                </div>

                {/* Left Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/25 bg-white/40 dark:border-white/15 dark:bg-[#111413]/40"
                  style={{ transform: 'rotateY(-90deg) translateZ(88px)' }}
                />

                {/* Top Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/35 bg-[#C5FF4A]/20 dark:border-[#C5FF4A]/35 dark:bg-[#141816]/35"
                  style={{ transform: 'rotateX(90deg) translateZ(88px)' }}
                />

                {/* Bottom Face */}
                <div
                  className="absolute inset-0 border border-[#090B0A]/25 bg-[#ECEEE9]/60 dark:border-white/15 dark:bg-[#090B0A]/60"
                  style={{ transform: 'rotateX(-90deg) translateZ(88px)' }}
                />

                {/* Inner Core Plane */}
                <div
                  className="absolute inset-8 border border-[#090B0A]/70 bg-[#C5FF4A]/35 dark:border-[#C5FF4A]/80 dark:bg-[#C5FF4A]/[0.06]"
                  style={{ transform: 'rotateY(45deg) translateZ(0px)' }}
                />
              </div>
            </div>

            {/* Floating Interface Wireframe Fragment — Top Left */}
            <div className="float-plane-slow absolute top-7 left-6 border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 border border-[#090B0A] dark:border-transparent bg-[#C5FF4A]" />
                <div className="h-1.5 w-14 bg-[#090B0A]/30 dark:bg-white/30" />
              </div>
              <div className="mt-2 h-1 w-20 bg-[#090B0A]/15 dark:bg-white/15" />
              <div className="mt-1.5 h-1.5 w-12 bg-[#090B0A]/50 dark:bg-[#C5FF4A]/50" />
            </div>

            {/* Floating Interface Wireframe Fragment — Bottom Right */}
            <div className="float-plane-delayed absolute bottom-7 right-6 border border-[#090B0A]/45 dark:border-[#C5FF4A]/35 bg-[var(--bg-surface)]/95 p-3 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-4 w-4 border border-[#090B0A]/25 dark:border-white/20" />
                <div className="h-4 w-4 border border-[#090B0A] dark:border-[#C5FF4A]/60 bg-[#C5FF4A] dark:bg-[#C5FF4A]/15" />
                <div className="h-4 w-4 border border-[#090B0A]/25 dark:border-white/20" />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="h-1 w-10 bg-[#090B0A]/25 dark:bg-white/25" />
                <span className="font-mono text-[10px] font-semibold text-[var(--accent-ink)]">
                  UI / ARCH
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="mx-auto mt-10 flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={scrollToAbout}
          className="group inline-flex items-center gap-3 py-2 text-xs font-mono tracking-[0.12em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent-ink)] cursor-pointer"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-[var(--border-strong)] transition-colors group-hover:border-[var(--accent-ink)]">
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </span>
          <span className="uppercase">Scroll to explore</span>
        </button>

        <span className="hidden sm:inline font-mono text-xs text-[var(--text-muted)]">
          Web · Mobile · Product Design
        </span>
      </div>
    </section>
  );
}
