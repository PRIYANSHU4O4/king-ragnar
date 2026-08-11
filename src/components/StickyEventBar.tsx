import React, { useState, useEffect } from 'react';
import { Youtube, Radio } from 'lucide-react';

// ============================================================================
// OFFICIAL EVENT YOUTUBE URL CONFIGURATION
// On the actual event day, replace this single URL constant with the live-stream URL.
// ============================================================================
export const EVENT_YOUTUBE_URL = "https://youtu.be/CLpxisSVs8w?si=npSdji7LS0nuaJNk";

export const StickyEventBar: React.FC = () => {
  const [countdown, setCountdown] = useState({
    formatted: '00D : 00H : 00M : 00S',
    isLive: false
  });

  // Target event start time: 16 August 2026 at 11:00 AM IST (Asia/Kolkata UTC+05:30)
  useEffect(() => {
    const EVENT_TARGET_MS = new Date('2026-08-16T11:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = EVENT_TARGET_MS - now;

      if (diff <= 0) {
        setCountdown({
          formatted: '00D : 00H : 00M : 00S',
          isLive: true
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const pad = (num: number) => String(num).padStart(2, '0');

      setCountdown({
        formatted: `${pad(days)}D : ${pad(hours)}H : ${pad(minutes)}M : ${pad(seconds)}S`,
        isLive: false
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside 
      aria-label="Event Live Countdown Bar" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-yellow-500/40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] py-2.5 px-3 sm:px-6 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Event Status & Live Countdown */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hype Indicator Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 font-montserrat font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
            {countdown.isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-black">EVENT IS LIVE NOW</span>
              </>
            ) : (
              <>
                <Radio className="w-3 h-3 text-yellow-400 animate-pulse" />
                <span>FULL EVENT LIVE IN</span>
              </>
            )}
          </div>

          {/* Countdown Clock Display */}
          <div className="font-mono text-xs sm:text-sm md:text-base font-bold text-white tracking-widest bg-zinc-900/90 px-3 py-1 rounded-xl border border-zinc-800 shadow-inner">
            <span className="text-yellow-400">{countdown.formatted}</span>
          </div>
        </div>

        {/* Right: YouTube Trailer / Live CTA */}
        <div className="flex items-center gap-2">
          <a
            href={EVENT_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-montserrat font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
          >
            <Youtube className="w-4 h-4 fill-white text-red-600 group-hover:scale-110 transition-transform" />
            <span>{countdown.isLive ? 'WATCH LIVE STREAM' : 'WATCH TRAILER'}</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
