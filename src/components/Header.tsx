import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X } from 'lucide-react';
import { LogoImage } from './LogoImage';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenCustomizer?: () => void;
  onOpenTickets?: () => void;
  eventTitle?: string;
  eventVol?: string;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavTab[] = [
    'Home',
    'About',
    'Courses',
    'Music',
    'Contact',
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black shadow-2xl">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand / Logo - Left Aligned */}
        <div 
          onClick={() => onTabChange('Home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          {/* Logo Image */}
          <LogoImage sizeClass="w-10 h-10 sm:w-12 sm:h-12" />

          {/* Title Text */}
          <div className="flex flex-col justify-center">
            <h1 className="font-montserrat font-black text-base sm:text-lg md:text-xl tracking-wider text-white uppercase leading-none group-hover:text-yellow-400 transition-colors">
              KING RAGNAR
            </h1>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-6 md:space-x-10">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => onTabChange(item)}
                className={`text-xs md:text-sm lg:text-base font-extrabold tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-yellow-400 scale-105'
                    : 'text-white hover:text-yellow-400 hover:scale-105'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:text-yellow-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 border-b border-zinc-800 px-6 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onTabChange(item);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-md text-left text-sm font-extrabold tracking-[0.18em] uppercase transition-colors ${
                  activeTab === item
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

