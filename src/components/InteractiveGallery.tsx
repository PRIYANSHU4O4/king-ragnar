import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Eye, 
  Share2, 
  Download, 
  Camera, 
  Heart,
  Grid,
  Zap,
  MapPin,
  Lock
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Battles' | 'Cyphers' | 'Kingdom Stage' | 'Backstage Raw';
  imageUrl: string;
  aspectClass: string; // Grid span layout class for editorial mosaic
  location: string;
  photographer: string;
  description: string;
  likes: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'THE EXPLOSIVE CHEST POP',
    category: 'Battles',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-2 h-[380px] sm:h-[480px]',
    location: 'Asansol Main Arena',
    photographer: 'Raw Kranti Lens',
    description: 'King Ragnar executing a frame-freezing chest pop recoil during the semi-finals 1v1 battle.',
    likes: 482
  },
  {
    id: 'gal-2',
    title: 'CYPHER RING HYPENTENSITY',
    category: 'Cyphers',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-1 h-[280px] sm:h-[320px]',
    location: 'Underground Street Lab',
    photographer: 'Street Vision India',
    description: 'The surrounding ring explodes with hype as a challenger drops a double-stomp combo.',
    likes: 310
  },
  {
    id: 'gal-3',
    title: 'PISTON JAB DIRECTIONAL LOCK',
    category: 'Kingdom Stage',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-2 h-[380px] sm:h-[480px]',
    location: 'Stage 1 Championship',
    photographer: 'Asansol Live Lens',
    description: 'Micro-second precision jab snap caught under the stage golden spotlights.',
    likes: 529
  },
  {
    id: 'gal-4',
    title: 'GROUND STOMP REACTION FORCE',
    category: 'Battles',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 h-[280px] sm:h-[320px]',
    location: 'Asansol Outdoor Ring',
    photographer: 'Krump World Photogs',
    description: 'Sub-bass impact freeze frame as the heel connects with earth-shattering power.',
    likes: 295
  },
  {
    id: 'gal-5',
    title: 'KING RAGNAR CROWN POSE',
    category: 'Kingdom Stage',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-8 lg:row-span-2 h-[380px] sm:h-[500px]',
    location: 'Main Championship Stage',
    photographer: 'Official AKK Media',
    description: 'King Ragnar taking center stage with the gold championship trophy in front of 3,000 spectators.',
    likes: 890
  },
  {
    id: 'gal-6',
    title: 'RAW BUCK CHARACTER PERSONA',
    category: 'Backstage Raw',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-2 h-[380px] sm:h-[500px]',
    location: 'Backstage Warmup Zone',
    photographer: 'Darkroom Krump',
    description: 'Deep psychological focus moments before stepping into the final round cypher.',
    likes: 412
  },
  {
    id: 'gal-7',
    title: 'NIGHT CYPHER SHADOWS',
    category: 'Cyphers',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-1 h-[280px] sm:h-[320px]',
    location: 'Asansol Street Alley',
    photographer: 'Night Cypher Crew',
    description: 'Underground midnight session lit purely by streetlights and raw passion.',
    likes: 268
  },
  {
    id: 'gal-8',
    title: 'AERIAL ARM SWING VELOCITY',
    category: 'Battles',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 h-[280px] sm:h-[320px]',
    location: 'Finals Main Ring',
    photographer: 'Street Vision India',
    description: 'Sweeping 360-degree arm extension captured at peak speed.',
    likes: 377
  },
  {
    id: 'gal-9',
    title: 'THE KRANTI BROTHERHOOD',
    category: 'Backstage Raw',
    imageUrl: '/assets/gallery-cover-image.png',
    aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 h-[280px] sm:h-[320px]',
    location: 'Asansol Kranti Squad HQ',
    photographer: 'Kranti Lens',
    description: 'Brothers in Krump celebrating after sweeping the national titles.',
    likes: 610
  }
];

export const InteractiveGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likesCount, setLikesCount] = useState<Record<string, number>>(
    GALLERY_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });

  // Handle subtle mouse parallax movement over the entire gallery
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxPos({ x: x * 20, y: y * 20 }); // Smooth 20px tilt offset
  };

  const handleMouseLeave = () => {
    setParallaxPos({ x: 0, y: 0 });
    setHoveredId(null);
  };

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesCount(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section 
      id="gallery" 
      className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto space-y-16 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-montserrat font-bold text-xs tracking-[0.2em] uppercase">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>ENERGY. ATTITUDE. MOVEMENT.</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            THE <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">MOVEMENT</span>
          </h2>

          <p className="font-montserrat text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Explore the raw visual energy of Asansol Krump Kranti. Hover and click over the visual mosaic to experience battle intensity frozen in time.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            {['All', 'Battles', 'Cyphers', 'Kingdom Stage', 'Backstage Raw'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-montserrat font-extrabold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* INTERACTIVE DENSE EDITORIAL MOSAIC GRID */}
        {/* ---------------------------------------------------- */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${-parallaxPos.y * 0.2}deg) rotateY(${parallaxPos.x * 0.2}deg)`
          }}
        >
          {filteredItems.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const isAnyHovered = hoveredId !== null;
            const isReceded = isAnyHovered && !isHovered;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1], 
                  delay: (index % 4) * 0.08 
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onClick={(e) => e.preventDefault()}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border ${item.aspectClass} ${
                  isHovered
                    ? 'z-30 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.3)] scale-[1.03] -translate-y-1'
                    : isReceded
                    ? 'z-10 border-zinc-900 opacity-50 scale-[0.98] grayscale-[30%]'
                    : 'z-10 border-zinc-800/80 hover:border-yellow-500/60 bg-zinc-950'
                }`}
              >
                {/* Image element with strong blur effect to suppress source image text */}
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out blur-xl brightness-50 contrast-125 ${
                    isHovered ? 'scale-110 brightness-60' : 'scale-100 brightness-50'
                  }`}
                />

                {/* Dark Backdrop Overlay for clean background texture */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

                {/* Central COMING SOON Overlay Badge (Sole central image overlay) */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-yellow-500/50 shadow-2xl shadow-yellow-500/20 flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-300">
                    <Lock className="w-4.5 h-4.5 text-yellow-400" />
                    <span className="font-bebas text-2xl sm:text-3xl text-white tracking-widest uppercase">
                      COMING SOON
                    </span>
                  </div>
                  <span className="text-[10px] font-montserrat font-extrabold text-yellow-400 tracking-widest uppercase mt-2.5 bg-black/80 px-3.5 py-1 rounded-full border border-yellow-500/30 backdrop-blur-sm shadow-md">
                    EVENT GALLERY PREVIEW
                  </span>
                </div>

                {/* Top Right Action: Like counter */}
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-800 hover:border-red-500/50 text-white font-montserrat font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer group/like"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/30 group-hover/like:fill-red-500 transition-colors" />
                  <span>{likesCount[item.id]}</span>
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-yellow-500/50 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/80 border border-zinc-700 text-white hover:text-yellow-400 hover:border-yellow-400 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Nav Buttons */}
              <button 
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 border border-zinc-700 text-white hover:text-yellow-400 hover:border-yellow-400 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button 
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 lg:right-96 z-30 w-12 h-12 rounded-full bg-black/80 border border-zinc-700 text-white hover:text-yellow-400 hover:border-yellow-400 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Left Image Viewport */}
              <div className="w-full lg:w-2/3 h-[50vh] lg:h-[80vh] bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <img 
                  src={activeLightboxItem.imageUrl} 
                  alt={activeLightboxItem.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right Details Panel */}
              <div className="w-full lg:w-1/3 p-6 sm:p-8 space-y-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800 bg-zinc-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-400 font-montserrat font-extrabold text-xs uppercase">
                      {activeLightboxItem.category}
                    </span>
                    <span className="text-xs font-montserrat font-bold text-zinc-400">
                      {activeLightboxItem.location}
                    </span>
                  </div>

                  <h3 className="font-bebas text-4xl sm:text-5xl text-white uppercase tracking-wide leading-none">
                    {activeLightboxItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-montserrat text-zinc-300 leading-relaxed">
                    {activeLightboxItem.description}
                  </p>

                  <div className="pt-4 space-y-2 border-t border-zinc-800 text-xs font-montserrat">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Photographer:</span>
                      <strong className="text-white">{activeLightboxItem.photographer}</strong>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Championship Edition:</span>
                      <strong className="text-yellow-400">Asansol Krump Kranti Vol. 1</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(activeLightboxItem.id, e)}
                    className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>LIKE ({likesCount[activeLightboxItem.id]})</span>
                  </button>

                  <button
                    onClick={() => alert("Image link copied to clipboard!")}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
