import React, { useState } from 'react';
import { Crown } from 'lucide-react';

interface LogoImageProps {
  className?: string;
  sizeClass?: string;
}

const LOGO_CANDIDATES = [
  "https://i.ibb.co/wNkym9r1/image.jpg",
  "https://i.ibb.co/wNkym9r1/image.png",
  "https://i.ibb.co/wNkym9r1/logo.png",
  "https://i.ibb.co/wNkym9r1/logo.jpg",
  "https://i.ibb.co/wNkym9r1/file.jpg",
  "https://ibb.co/wNkym9r1"
];

export const LogoImage: React.FC<LogoImageProps> = ({ 
  className = "w-full h-full object-cover rounded-md",
  sizeClass = "w-10 h-10 sm:w-12 sm:h-12"
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (candidateIndex < LOGO_CANDIDATES.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative ${sizeClass} rounded-xl bg-zinc-950 p-0.5 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.25)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.45)] group-hover:border-amber-400 transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0`}>
      {!hasError ? (
        <img 
          src={LOGO_CANDIDATES[candidateIndex]} 
          alt="Asansol Krump Kranti Logo" 
          onError={handleError}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className={className}
        />
      ) : (
        <div className="w-full h-full bg-black rounded-lg flex flex-col items-center justify-center p-1 text-center leading-none">
          <Crown className="w-5 h-5 text-yellow-400 fill-yellow-500/30 mb-0.5" />
          <span className="font-bebas text-[9px] text-yellow-400 tracking-tight uppercase leading-none">AKK</span>
        </div>
      )}
    </div>
  );
};
