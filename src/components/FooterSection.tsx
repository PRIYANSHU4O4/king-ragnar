import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogoImage } from './LogoImage';
import { 
  ArrowUp, 
  Crown, 
  Flame, 
  Instagram, 
  Youtube, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Radio,
  ExternalLink,
  Heart
} from 'lucide-react';

interface FooterSectionProps {
  onOpenTickets?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenTickets }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live Asansol IST Time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-black text-white border-t-2 border-zinc-900 relative overflow-hidden pt-20 pb-12 px-4 sm:px-8 lg:px-16">
      
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto space-y-20 relative z-10">
        
        {/* TOP CALL-TO-ACTION BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-yellow-500/40 shadow-2xl shadow-yellow-500/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/20 transition-colors" />

          <div className="space-y-3 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 font-montserrat font-extrabold text-[11px] uppercase tracking-widest border border-yellow-500/30">
              <Flame className="w-4 h-4 text-yellow-400 fill-yellow-500/40" />
              <span>THE ARENA CALLS YOU</span>
            </div>

            <h3 className="font-bebas text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
              READY TO STEP INTO THE <span className="text-yellow-400">CYPHER?</span>
            </h3>

            <p className="font-montserrat text-zinc-300 text-xs sm:text-sm max-w-xl font-medium">
              Reserve your battle passes, masterclass slots, and VIP spectator access before all arena seats sell out.
            </p>
          </div>

          <div className="flex items-center gap-4 z-10 shrink-0">
            <button
              onClick={onOpenTickets}
              className="px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-yellow-500/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>CLAIM BATTLE PASS</span>
              <Crown className="w-4 h-4 fill-current" />
            </button>
          </div>
        </motion.div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-8">
          
          {/* BRAND COL (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <LogoImage sizeClass="w-12 h-12" />
              <div className="space-y-0.5">
                <span className="font-bebas text-3xl sm:text-4xl tracking-wide text-white block uppercase leading-none">
                  ASANSOL <span className="text-yellow-400">KRUMP KRANTI</span>
                </span>
                <span className="text-[10px] font-mono text-yellow-500 font-extrabold tracking-[0.25em] uppercase block">
                  OFFICIAL KING RAGNAR KINGDOM
                </span>
              </div>
            </div>

            <p className="font-montserrat text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              India's premier street Krump revolution based in Asansol, West Bengal. Dedicated to authentic technique, battle mindset, and character building.
            </p>

            {/* Live Clock & Arena Status */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-montserrat font-bold">
                <span className="text-zinc-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span>ASANSOL ARENA TIME (IST)</span>
                </span>
                <span className="text-yellow-400 font-mono">{currentTime || '10:30 PM'}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-montserrat text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CHAMPIONSHIP REGISTRATIONS OPEN</span>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS (3 COLS) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bebas text-2xl text-yellow-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              ARENA NAVIGATION
            </h4>

            <ul className="space-y-2.5 text-xs font-montserrat font-bold text-zinc-300">
              {[
                { label: 'HOME ARENA', id: 'home' },
                { label: 'ABOUT KING RAGNAR', id: 'about' },
                { label: 'ACADEMY COURSES', id: 'courses' },
                { label: 'MUSIC VAULT & BEATS', id: 'music' },
                { label: 'THE MOVEMENT GALLERY', id: 'gallery' },
                { label: 'CLIENT TESTIMONIALS', id: 'testimonials' },
                { label: 'CONTACT & LOCATION', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-yellow-400 transition-colors uppercase tracking-wider flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-yellow-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS & MEDIA (2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bebas text-2xl text-yellow-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              CONNECT
            </h4>

            <div className="space-y-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 hover:bg-zinc-900 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-all group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>INSTAGRAM</span>
              </a>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 hover:bg-zinc-900 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-all group"
              >
                <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>YOUTUBE</span>
              </a>

              <a 
                href="mailto:info@asansolkrump.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 hover:bg-zinc-900 text-xs font-montserrat font-bold text-zinc-300 hover:text-white transition-all group"
              >
                <Mail className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span>EMAIL US</span>
              </a>
            </div>
          </div>

          {/* VIP NEWSLETTER (3 COLS) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bebas text-2xl text-yellow-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
              KRANTI CYPHER DISPATCH
            </h4>

            <p className="text-xs font-montserrat text-zinc-400 font-medium leading-relaxed">
              Subscribe to get secret battle drop announcements, exclusive beat drops, and masterclass dates directly to your inbox.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-xs font-montserrat font-bold text-yellow-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>YOU ARE SUBSCRIBED TO THE VIP CYPHER!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input 
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-yellow-500/20"
                >
                  <span>JOIN VIP LIST</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* GIANT WATERMARK BRANDING & BOTTOM BAR */}
        <div className="pt-12 border-t border-zinc-900 space-y-8">
          
          {/* Giant Typography Watermark */}
          <div className="text-center overflow-hidden select-none pointer-events-none py-4">
            <h2 className="font-bebas text-[12vw] leading-none text-zinc-900/60 uppercase tracking-tighter hover:text-yellow-500/10 transition-colors duration-700">
              KING RAGNAR
            </h2>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-montserrat font-medium text-zinc-500 border-t border-zinc-900/80 pt-6">
            
            <p className="text-center sm:text-left">
              © 2026 Asansol Krump Kranti. All rights reserved. Crafted for <strong className="text-zinc-300">King Ragnar</strong>.
            </p>

            <button
              onClick={scrollToTop}
              className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-yellow-500 hover:text-black border border-zinc-800 hover:border-yellow-400 text-yellow-400 font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};
