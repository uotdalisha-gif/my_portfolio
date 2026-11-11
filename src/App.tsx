import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { LanguagesSection } from './components/LanguagesSection';
import { GallerySection } from './components/GallerySection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { CustomCursor } from './components/CustomCursor';
import { WelcomeLoader } from './components/WelcomeLoader';
import { GrainOverlay } from './components/GrainOverlay';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useMousePosition } from './hooks/useMousePosition';
import { ProjectItem } from './types/portfolio';
import { PROJECTS_DATA } from './data/portfolioData';

export default function App() {
  const { activeSection, isMobileMenuOpen, scrollToSection, toggleMobileMenu } = useSmoothScroll('home');
  const { position, cursorText, cursorVariant, setCursorState, resetCursorState } = useMousePosition();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [dedicatedProject, setDedicatedProject] = useState<ProjectItem | null>(null);

  // Check if loader was already shown this session
  const [isLoaderActive, setIsLoaderActive] = useState(() => {
    return typeof window !== 'undefined' ? !sessionStorage.getItem('loaderShown') : false;
  });
  const [contentVisible, setContentVisible] = useState(() => {
    return typeof window !== 'undefined' ? !!sessionStorage.getItem('loaderShown') : true;
  });

  const handleLoaderComplete = () => {
    setIsLoaderActive(false);
    // 0.2s delay before fading in main content
    setTimeout(() => {
      setContentVisible(true);
    }, 200);
  };

  // Sync with URL Hash for shareable deep links (e.g. #/project/ad-dfs-infra)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const slug = hash.replace('#/project/', '');
        const match = PROJECTS_DATA.find((p) => p.id === slug);
        if (match) setDedicatedProject(match);
      } else {
        setDedicatedProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const wasOnDedicatedProject = useRef(false);

  useEffect(() => {
    if (wasOnDedicatedProject.current && !dedicatedProject) {
      // Allow React to re-mount <main> with #portfolio before scrolling
      setTimeout(() => {
        scrollToSection('portfolio');
      }, 50);
    }
    wasOnDedicatedProject.current = !!dedicatedProject;
  }, [dedicatedProject, scrollToSection]);

  const openDedicatedProject = (project: ProjectItem) => {
    window.location.hash = `#/project/${project.id}`;
    setDedicatedProject(project);
  };

  const closeDedicatedProject = () => {
    if (window.location.hash.startsWith('#/project/')) {
      window.history.pushState(null, '', window.location.pathname + '#portfolio');
    }
    setDedicatedProject(null);
  };

  const handleNavNavigate = (sectionId: string) => {
    if (dedicatedProject) {
      window.history.pushState(null, '', window.location.pathname + `#${sectionId}`);
      setDedicatedProject(null);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 50);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans selection:bg-[#60a5fa] selection:text-black antialiased overflow-x-hidden relative">
      {/* Welcome / Intro Loader Animation */}
      {isLoaderActive && <WelcomeLoader onComplete={handleLoaderComplete} />}

      {/* Grain / Noise Texture Overlay */}
      <GrainOverlay />

      <CustomCursor position={position} cursorText={cursorText} cursorVariant={cursorVariant} />

      {/* Main Portfolio Content */}
      <div
        className={`transition-opacity duration-500 ease-out ${
          contentVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <Navbar
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          onNavigate={handleNavNavigate}
          onToggleMobileMenu={toggleMobileMenu}
          onCursorEnter={(text, variant) => setCursorState(text, variant)}
          onCursorLeave={resetCursorState}
        />

        {dedicatedProject ? (
          <ProjectDetailPage
            project={dedicatedProject}
            onBack={closeDedicatedProject}
            onSelectProject={openDedicatedProject}
            onCursorEnter={(text, variant) => setCursorState(text, variant)}
            onCursorLeave={resetCursorState}
          />
        ) : (
          <main className="relative z-10">
            <Hero
              onNavigate={scrollToSection}
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <About
              onNavigate={scrollToSection}
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <Timeline />
            <SkillsSection
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <PortfolioSection
              onSelectProject={(project) => setSelectedProject(project)}
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <LanguagesSection
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <GallerySection
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />
            <MarqueeRibbon />
            <ContactSection
              onCursorEnter={(text, variant) => setCursorState(text, variant)}
              onCursorLeave={resetCursorState}
            />

            {/* Ambient glow near bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden" aria-hidden="true">
              <div
                className="absolute bottom-[-200px] left-1/3 rounded-full bg-[#818cf8] blur-[200px] animate-blob-delayed"
                style={{ width: '50vw', height: '50vh', opacity: 0.04 }}
              />
            </div>
          </main>
        )}

        <Footer />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onViewFullPage={openDedicatedProject}
          onCursorEnter={(text, variant) => setCursorState(text, variant)}
          onCursorLeave={resetCursorState}
        />
      </div>
    </div>
  );
}
