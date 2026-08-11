import React, { useState } from 'react';
import { BannerConfig, NavTab } from './types';
import { DEFAULT_BANNER_CONFIG } from './defaultConfig';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { MusicSection } from './components/MusicSection';
import { InteractiveGallery } from './components/InteractiveGallery';
import { ClientTestimonials } from './components/ClientTestimonials';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { BannerCustomizer } from './components/BannerCustomizer';
import { TicketModal } from './components/TicketModal';
import { PageSections } from './components/PageSections';
import { StickyEventBar } from './components/StickyEventBar';
import { krumpBeatPlayer } from './utils/audioBeat';

export default function App() {
  const [config, setConfig] = useState<BannerConfig>(DEFAULT_BANNER_CONFIG);
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribe = krumpBeatPlayer.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggleMusic = () => {
    krumpBeatPlayer.toggle();
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'About' || tab === 'Home') {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'Courses') {
      const coursesEl = document.getElementById('courses');
      if (coursesEl) {
        coursesEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'Music') {
      const musicEl = document.getElementById('music');
      if (musicEl) {
        musicEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'Contact') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenTicketLink = () => {
    window.open('https://akk19.lovable.app/tickets', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-montserrat antialiased selection:bg-yellow-500 selection:text-black">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenTickets={handleOpenTicketLink}
        eventTitle={config.eventTitle}
        eventVol={config.eventVol}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Banner Hero Section (Blank banner as requested) */}
      <main className="flex-1 w-full flex flex-col bg-black">
        <BannerHero />

        {/* Interactive About Section below the banner */}
        <AboutSection 
          onOpenTickets={handleOpenTicketLink}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
        />

        {/* Interactive Courses Section with scroll animations */}
        <CoursesSection 
          onOpenTickets={handleOpenTicketLink}
        />

        {/* Interactive Music Section with scroll reveal & Web Audio player */}
        <MusicSection 
          isPlayingGlobalMusic={isPlayingMusic}
          onToggleGlobalMusic={handleToggleMusic}
        />

        {/* Interactive Image Gallery: THE MOVEMENT */}
        <InteractiveGallery />

        {/* Interactive Testimonials Section: WHAT CLIENTS ARE SAYING */}
        <ClientTestimonials />

        {/* Interactive Contact & Location Arena with Scroll Animations */}
        <ContactSection 
          onOpenTickets={handleOpenTicketLink}
        />

        {/* Interactive Footer Section */}
        <FooterSection 
          onOpenTickets={handleOpenTicketLink}
        />
      </main>

      {/* Modals & Drawers */}
      <BannerCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChange={setConfig}
      />

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Permanently Sticky Live Event Countdown Bar */}
      <StickyEventBar />

    </div>
  );
}
