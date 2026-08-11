import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  Zap, 
  Disc, 
  Clock, 
  Heart, 
  Share2, 
  Download, 
  Search, 
  ShoppingBag,
  Lock,
  CheckCircle2,
  Tag,
  Info,
  ChevronRight
} from 'lucide-react';
import { MUSIC_STORE_TRACKS, MUSIC_CATEGORIES, StoreTrack, MusicCategory } from '../data/musicStore';
import { TrackCheckoutModal } from './TrackCheckoutModal';

interface MusicSectionProps {
  isPlayingGlobalMusic?: boolean;
  onToggleGlobalMusic?: () => void;
}

export const MusicSection: React.FC<MusicSectionProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});
  
  // Purchased tracks tracking state
  const [purchasedTrackIds, setPurchasedTrackIds] = useState<Record<string, boolean>>({});
  
  // Modal State
  const [checkoutTrack, setCheckoutTrack] = useState<StoreTrack | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Audio preview reference
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const filteredTracks = MUSIC_STORE_TRACKS.filter(track => {
    const matchesCategory = activeCategory === 'All' || track.category === activeCategory;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          track.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          track.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePreviewToggle = (track: StoreTrack) => {
    if (!track.audioUrl) {
      console.warn(`Missing audioUrl for track ${track.id}`);
      return;
    }

    const resolvedAudioUrl = encodeURI(track.audioUrl);
    const currentAudio = previewAudioRef.current;

    if (activeTrackId === track.id && currentAudio) {
      if (isPlayingPreview || !currentAudio.paused) {
        currentAudio.pause();
        setIsPlayingPreview(false);
      } else {
        currentAudio.play().then(() => {
          setIsPlayingPreview(true);
        }).catch(err => {
          console.error(`Audio play error for track ${track.id} (${resolvedAudioUrl}):`, err);
          setIsPlayingPreview(false);
        });
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(resolvedAudioUrl);
    audio.preload = 'auto';

    audio.onplay = () => {
      setIsPlayingPreview(true);
    };

    audio.onpause = () => {
      setIsPlayingPreview(false);
    };

    audio.onended = () => {
      setIsPlayingPreview(false);
      audio.currentTime = 0;
    };

    audio.onerror = (event) => {
      console.error(`Audio playback error for track ${track.id} (${resolvedAudioUrl}):`, event);
      setIsPlayingPreview(false);
    };

    previewAudioRef.current = audio;
    setActiveTrackId(track.id);

    audio.play().then(() => {
      setIsPlayingPreview(true);
    }).catch(err => {
      console.error(`Audio play error for track ${track.id} (${resolvedAudioUrl}):`, err);
      setIsPlayingPreview(false);
    });
  };

  const handleBuyClick = (track: StoreTrack) => {
    setCheckoutTrack(track);
    setIsCheckoutModalOpen(true);
  };

  const handleDownloadClick = (track: StoreTrack) => {
    const audioUrl = track.audioUrl || '/music/ultra-instinct-konkrete.mp3';
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${track.title.toLowerCase().replace(/\s+/g, '-')}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePaymentSuccess = (trackId: string) => {
    setPurchasedTrackIds(prev => ({ ...prev, [trackId]: true }));
  };

  const toggleLike = (id: string) => {
    setLikedTracks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  const activeTrack = MUSIC_STORE_TRACKS.find(t => t.id === activeTrackId);

  return (
    <section id="music" className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto space-y-16 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 text-yellow-400 font-montserrat font-extrabold text-xs tracking-[0.2em] uppercase border border-yellow-500/30">
            <ShoppingBag className="w-4 h-4 fill-yellow-400/40" />
            <span>OFFICIAL KRUMP MUSIC STORE</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none">
            STREET BEATS <span className="text-yellow-400">&amp; MUSIC VAULT</span>
          </h2>

          <p className="font-montserrat text-zinc-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Download high-quality 320kbps Krump, Hip-Hop, Breaking, RYS, and Asansol Krump Kranti battle tracks produced by King Ragnar &amp; AKK Sound Lab.
          </p>

          {/* Highlight Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/10 border border-yellow-500/50 text-yellow-400 font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-500/10 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>OFFICIAL BATTLE BEATS</span>
            </span>
            <span className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-yellow-400" />
              <span>INSTANT MP3 AUDIO ACCESS</span>
            </span>
          </div>
        </motion.div>

        {/* CONTROLS: CATEGORIES & SEARCH BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {MUSIC_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by track title, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors shadow-inner"
            />
          </div>
        </motion.div>

        {/* MUSIC STORE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track, index) => {
            const isPlaying = activeTrackId === track.id && isPlayingPreview;
            const isPurchased = Boolean(purchasedTrackIds[track.id]);
            const isLiked = Boolean(likedTracks[track.id]);

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group relative rounded-3xl bg-zinc-950 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isPlaying 
                    ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20 bg-gradient-to-b from-zinc-900 to-zinc-950' 
                    : 'border-zinc-800/90 hover:border-yellow-500/50 hover:bg-zinc-900/60'
                }`}
              >
                <div className="p-6 space-y-5">
                  
                  {/* Top Bar: Number & Category Badge */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bebas text-2xl text-yellow-500 font-bold">
                        {track.trackNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 font-montserrat font-extrabold text-[10px] uppercase tracking-wider border border-yellow-500/30">
                        {track.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="space-y-1">
                    {track.event && (
                      <span className="text-[10px] font-montserrat font-bold text-amber-500 uppercase tracking-widest block">
                        🏆 {track.event}
                      </span>
                    )}
                    <h3 className="font-bebas text-3xl text-white uppercase tracking-wider group-hover:text-yellow-400 transition-colors leading-none">
                      {track.title}
                    </h3>
                    <p className="text-xs font-montserrat font-bold text-zinc-400">
                      {track.producer}
                    </p>
                  </div>

                  <p className="text-xs font-montserrat text-zinc-400 leading-relaxed line-clamp-2">
                    {track.description}
                  </p>

                  {/* Track Meta Details */}
                  <div className="flex items-center gap-4 text-[11px] font-montserrat font-bold text-zinc-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{track.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{track.bitrate || `${track.bpm} BPM`}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Action Bar */}
                <div className="p-4 bg-zinc-900/80 border-t border-zinc-900 flex items-center justify-between gap-3">
                  {/* Like button on the left */}
                  <button
                    onClick={() => toggleLike(track.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isLiked 
                        ? 'bg-red-500/20 border-red-500/40 text-red-500' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Play Preview Button on the right (Spotify Green #1DB954) */}
                  <button
                    onClick={() => handlePreviewToggle(track)}
                    className={`px-4 py-2.5 rounded-xl font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer text-white shadow-md ${
                      isPlaying 
                        ? 'bg-[#1DB954] shadow-[#1DB954]/30 scale-105 ring-2 ring-[#1DB954]/50' 
                        : 'bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 active:scale-95 shadow-[#1DB954]/20'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white text-white" /> : <Music className="w-4 h-4 text-white" />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* EXPLORE MORE MUSIC CTA (Future Feature - Intentionally Non-functional) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-6 pb-2"
        >
          <button
            onClick={(e) => e.preventDefault()}
            className="px-8 py-4 rounded-2xl bg-zinc-950 hover:bg-yellow-500 text-yellow-400 hover:text-black border border-yellow-500/40 hover:border-yellow-400 font-montserrat font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-yellow-500/5 hover:shadow-yellow-500/20 hover:scale-105 active:scale-95 inline-flex items-center gap-3 cursor-pointer group"
          >
            <span>EXPLORE MORE MUSIC</span>
            <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </button>
          <p className="text-[11px] font-montserrat text-zinc-500 font-semibold uppercase tracking-wider mt-3">
            More battle tracks &amp; cypher loops dropping soon
          </p>
        </motion.div>

        {/* Store Info Footnote */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-3xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-yellow-400 uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>MUSIC PRODUCERS &amp; BEATMAKERS NOTE</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All tracks are delivered in high-quality audio format. Downloaded tracks include commercial cypher &amp; battle performance rights for dancers worldwide.
          </p>
        </div>

      </div>

      {/* Track Checkout Modal */}
      <TrackCheckoutModal
        track={checkoutTrack}
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </section>
  );
};
