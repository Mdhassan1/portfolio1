import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'motion/react';
import { NAV_ITEMS, type SectionSeoKey } from './data/portfolioData';
import CustomCursor from './components/CustomCursor';
import Navbar, { type PortfolioTheme } from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExpertiseSection from './components/ExpertiseSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import LeadershipSection from './components/LeadershipSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const THEME_STORAGE_KEY = 'abdul-rahim-portfolio-theme';

function getInitialTheme(): PortfolioTheme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Ignore storage access errors in restricted frames
  }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>(getInitialTheme);
  const [activeNavSection, setActiveNavSection] = useState<string>('home');
  const [activeSeoSection, setActiveSeoSection] = useState<SectionSeoKey>('home');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const sectionIds: SectionSeoKey[] = [
      ...(NAV_ITEMS.map((item) => item.id) as SectionSeoKey[]),
      'leadership',
      'education',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionSeoKey;
            setActiveSeoSection(id);
            if (id === 'leadership' || id === 'education') {
              setActiveNavSection('experience');
            } else {
              setActiveNavSection(id);
            }
          }
        });
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#090B0A' : '#F6F7F4'}
        />
      </Helmet>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
          {/* Skip Navigation Link for Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#C5FF4A] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#090B0A]"
          >
            Skip to main content
          </a>

          {/* Subtle Animated Technical Grid Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden opacity-85"
          >
            <div className="tech-grid-bg tech-grid-animated absolute -inset-16" />
          </div>

          <CustomCursor />
          <Navbar
            activeSection={activeNavSection}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <main id="main-content" className="relative z-10">
            <HeroSection isSeoActive={activeSeoSection === 'home'} theme={theme} />
            <AboutSection isSeoActive={activeSeoSection === 'about'} />
            <ExpertiseSection isSeoActive={activeSeoSection === 'expertise'} />
            <ProjectsSection isSeoActive={activeSeoSection === 'projects'} />
            <ExperienceSection isSeoActive={activeSeoSection === 'experience'} />
            <LeadershipSection isSeoActive={activeSeoSection === 'leadership'} />
            <EducationSection isSeoActive={activeSeoSection === 'education'} />
            <ContactSection isSeoActive={activeSeoSection === 'contact'} />
          </main>

          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
}
