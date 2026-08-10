import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Flame, 
  Zap, 
  UploadCloud, 
  Disc, 
  Clock, 
  Heart, 
  Share2, 
  Download, 
  Search, 
  Filter, 
  SlidersHorizontal,
  ChevronRight,
  Headphones,
  Check
} from 'lucide-react';

interface MusicSectionProps {
  isPlayingGlobalMusic?: boolean;
  onToggleGlobalMusic?: () => void;
}

export interface KrumpTrack {
  id: string;
  trackNumber: string;
  title: string;
  producer: string;
  bpm: number;
  duration: string;
  category: 'Battle Beats' | 'Cypher Loops' | 'Training Heavy' | 'Chill Buck';
  tags: string[];
  intensity: number;
  likesCount: number;
  description: string;
}

const KRUMP_TRACKS: KrumpTrack[] = [
  {
    id: 'track-01',
    trackNumber: '01',
    title: "RAGNAR'S BEAST MODE",
    producer: 'King Ragnar x Sub-Bass Heavy',
    bpm: 120,
    duration: '02:45',
    category: 'Battle Beats',
    tags: ['Heavy Kick', 'Chest Pop Sync', 'Championship'],
    intensity: 98,
    likesCount: 342,
    description: 'Relentless 120 BPM stomp and sub-bass kick combo crafted specifically for 1v1 battle finals.'
  },
  {
    id: 'track-02',
    trackNumber: '02',
    title: 'SUB-BASS STOMP CIRCLE',
    producer: 'Asansol Street Lab',
    bpm: 118,
    duration: '03:10',
    category: 'Cypher Loops',
    tags: ['Cypher Loop', 'Continuous Loop', 'Groundwork'],
    intensity: 92,
    likesCount: 289,
    description: 'Rolling 8-bar loop with continuous low-frequency resonance designed for endurance cyphers.'
  },
  {
    id: 'track-03',
    trackNumber: '03',
    title: 'ASANSOL KRANTI REVOLUTION',
    producer: 'AKK Underground Records',
    bpm: 124,
    duration: '02:30',
    category: 'Battle Beats',
    tags: ['Snare Snap', 'Piston Jab', 'Official Anthem'],
    intensity: 96,
    likesCount: 512,
    description: 'Sharp snare impacts and metallic hi-hats perfect for rapid-fire piston jabs and arm swings.'
  },
  {
    id: 'track-04',
    trackNumber: '04',
    title: 'DIRTY SOUTH BUCK WAVE',
    producer: 'Raw Krump Collective',
    bpm: 116,
    duration: '03:25',
    category: 'Training Heavy',
    tags: ['Slow Buck', 'Arm Swings', 'Heavy Snare'],
    intensity: 88,
    likesCount: 215,
    description: 'Deep, heavy tempo allowing dancers to maximize arm swing velocity and chest pop recoil.'
  },
  {
    id: 'track-05',
    trackNumber: '05',
    title: 'PISTON JAB IMPACT 808',
    producer: 'King Ragnar',
    bpm: 122,
    duration: '02:50',
    category: 'Battle Beats',
    tags: ['808 Bass', 'Precision', 'Fast Attacks'],
    intensity: 94,
    likesCount: 408,
    description: 'Ultra-clear 808 transient hits that lock perfectly with directional jab combos.'
  },
  {
    id: 'track-06',
    trackNumber: '06',
    title: 'CROWN ROYALTY ANTHEM',
    producer: 'Kranti Sound Lab',
    bpm: 125,
    duration: '03:00',
    category: 'Battle Beats',
    tags: ['Horn Brass', 'Royalty', 'Grand Arena'],
    intensity: 99,
    likesCount: 620,
    description: 'Cinematic street horns blended with aggressive Krump percussion for main-stage finals.'
  },
  {
    id: 'track-07',
    trackNumber: '07',
    title: 'GLITCH & MICRO-LOCKS',
    producer: 'Cyber Krump Lab',
    bpm: 115,
    duration: '02:15',
    category: 'Training Heavy',
    tags: ['Glitch', 'Animation', 'Isolations'],
    intensity: 86,
    likesCount: 198,
    description: 'Syncopated glitch breaks tailored for isolation control, micro-pops, and robotic stops.'
  },
  {
    id: 'track-08',
    trackNumber: '08',
    title: 'NIGHT CYPHER IN ASANSOL',
    producer: 'Asansol Street Lab',
    bpm: 112,
    duration: '03:40',
    category: 'Chill Buck',
    tags: ['Atmospheric', 'Practice Vibe', 'Smooth Flow'],
    intensity: 78,
    likesCount: 175,
    description: 'Smooth atmospheric pad with solid bottom-end kick for relaxed labbing and freestyle sessions.'
  },
  {
    id: 'track-09',
    trackNumber: '09',
    title: 'EARTHQUAKE STOMP ENGINE',
    producer: 'Sub-Bass Heavy',
    bpm: 120,
    duration: '02:40',
    category: 'Battle Beats',
    tags: ['Ground Stomp', 'Aggressive', 'No Mercy'],
    intensity: 97,
    likesCount: 380,
    description: 'Massive sub-bass drops on every 1st and 3rd count to accentuate ground reaction stomps.'
  },
  {
    id: 'track-10',
    trackNumber: '10',
    title: 'BEAST MODE SWITCH',
    producer: 'King Ragnar',
    bpm: 126,
    duration: '02:55',
    category: 'Battle Beats',
    tags: ['Tempo Switch', 'Character Shift', 'Hype Drop'],
    intensity: 100,
    likesCount: 540,
    description: 'Features a dramatic mid-track beat drop that signals a character transformation in battles.'
  },
  {
    id: 'track-11',
    trackNumber: '11',
    title: 'HEAVY LABBING TOOLKIT VOL. 1',
    producer: 'AKK Underground Records',
    bpm: 118,
    duration: '04:00',
    category: 'Cypher Loops',
    tags: ['Practice Tool', 'Metronome Kick', 'Endurance'],
    intensity: 85,
    likesCount: 230,
    description: '4-minute extended continuous loop for endurance labbing and freestyle stamina drills.'
  },
  {
    id: 'track-12',
    trackNumber: '12',
    title: 'FINAL ROUND ELIMINATOR',
    producer: 'Kranti Sound Lab',
    bpm: 128,
    duration: '02:20',
    category: 'Battle Beats',
    tags: ['Ultra High BPM', 'Tie-Breaker', 'Full Energy'],
    intensity: 100,
    likesCount: 490,
    description: 'Extreme tempo tie-breaker beat built to push both battlers to their absolute physical limits.'
  },
  {
    id: 'track-13',
    trackNumber: '13',
    title: 'CHARACTER PERSONA SYNTH',
    producer: 'Cyber Krump Lab',
    bpm: 114,
    duration: '03:15',
    category: 'Chill Buck',
    tags: ['Experimental', 'Synth Pads', 'Concept'],
    intensity: 80,
    likesCount: 162,
    description: 'Deep analog synth melodies designed for character storytelling and theatrical Krump rounds.'
  },
  {
    id: 'track-14',
    trackNumber: '14',
    title: 'STREET KNOCKOUT RHYTHM',
    producer: 'Asansol Street Lab',
    bpm: 121,
    duration: '02:48',
    category: 'Training Heavy',
    tags: ['Rhythmic Focus', 'Clean Snare', 'Combos'],
    intensity: 91,
    likesCount: 310,
    description: 'Crisp percussive rhythm with clear counting cues for practicing complex combo speed.'
  }
];

export const MusicSection: React.FC<MusicSectionProps> = ({ 
  isPlayingGlobalMusic,
  onToggleGlobalMusic 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlayingCurrent, setIsPlayingCurrent] = useState<boolean>(false);
  const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // Web Audio Synth Synth reference for playing real-time Krump beats in browser
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const filteredTracks = KRUMP_TRACKS.filter(track => {
    const matchesCategory = activeCategory === 'All' || track.category === activeCategory;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          track.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          track.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Synthetic Web Audio Playback
  const stopAudioSynth = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const playAudioSynth = (bpm: number) => {
    stopAudioSynth();

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const beatIntervalMs = (60 / bpm) * 1000;
      let step = 0;

      intervalRef.current = window.setInterval(() => {
        const now = ctx.currentTime;

        // Kick Drum (Sub Bass Stomp) on beat 1, 2, 3, 4
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.18);
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);
        osc.stop(now + 0.25);

        // Snare / Clap on beat 2 and 4
        if (step % 2 === 1) {
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 1000;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.4, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

          whiteNoise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);

          whiteNoise.start(now);
        }

        step = (step + 1) % 4;
      }, beatIntervalMs / 2);

    } catch (e) {
      console.log('Web audio synth fallback:', e);
    }
  };

  const handleTrackPlayToggle = (track: KrumpTrack) => {
    if (activeTrackId === track.id && isPlayingCurrent) {
      setIsPlayingCurrent(false);
      stopAudioSynth();
    } else {
      setActiveTrackId(track.id);
      setIsPlayingCurrent(true);
      playAudioSynth(track.bpm);
    }
  };

  const toggleLike = (id: string) => {
    setLikedTracks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    return () => {
      stopAudioSynth();
    };
  }, []);

  const activeTrack = KRUMP_TRACKS.find(t => t.id === activeTrackId);

  return (
    <section id="music" className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 border-t border-zinc-900">
      <div className="max-w-[1700px] mx-auto space-y-20">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-montserrat font-bold text-xs tracking-[0.2em] uppercase">
            <Radio className="w-4 h-4 text-yellow-400" />
            <span>STREET BEATS & AUDIO ARENA</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            KRUMP <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">MUSIC</span> VAULT
          </h2>

          <p className="font-montserrat text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            High-octane sub-bass 808s, heavy snares, and relentless street rhythms engineered specifically for battle circles and labbing sessions.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* CONTROLS BAR: SEARCH, FILTERS, AND UPLOAD BUTTON */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-xl">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search tracks, producers, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs font-montserrat font-semibold focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-center">
              {['All', 'Battle Beats', 'Cypher Loops', 'Training Heavy', 'Chill Buck'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-montserrat font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Future Music Upload Action Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full lg:w-auto px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-yellow-500/40 text-yellow-400 font-montserrat font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-yellow-500/5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>UPLOAD YOUR BEAT</span>
            </button>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MUSIC TRACKS LIST: SCROLL REVEAL ONE BY ONE */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-6">
          {filteredTracks.map((track, index) => {
            const isSelected = activeTrackId === track.id;
            const isPlayingThis = isSelected && isPlayingCurrent;
            const isLiked = !!likedTracks[track.id];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: (index % 3) * 0.08 }}
                className={`group relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isPlayingThis
                    ? 'bg-zinc-900/90 border-yellow-500 shadow-2xl shadow-yellow-500/20'
                    : 'bg-zinc-950 border-zinc-800/90 hover:border-yellow-500/50 hover:bg-zinc-900/50'
                }`}
              >
                {/* Subtle side glow for playing track */}
                {isPlayingThis && (
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400 to-amber-500" />
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                  
                  {/* Track Left: Number + Play Button + Info */}
                  <div className="flex items-center gap-5 sm:gap-6 w-full lg:w-auto">
                    
                    {/* Track Number */}
                    <span className="font-bebas text-3xl sm:text-4xl text-zinc-600 group-hover:text-yellow-500 transition-colors w-8 shrink-0">
                      {track.trackNumber}
                    </span>

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => handleTrackPlayToggle(track)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg cursor-pointer ${
                        isPlayingThis
                          ? 'bg-yellow-500 text-black scale-105 shadow-yellow-500/40 animate-pulse'
                          : 'bg-zinc-900 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black border border-zinc-800 group-hover:border-yellow-400'
                      }`}
                    >
                      {isPlayingThis ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* Track Title & Meta */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className={`font-bebas text-2xl sm:text-3xl tracking-wide uppercase transition-colors ${
                          isPlayingThis ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                        }`}>
                          {track.title}
                        </h3>

                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-montserrat font-extrabold text-yellow-400 uppercase tracking-wider">
                          {track.category}
                        </span>
                      </div>

                      <p className="text-xs font-montserrat font-semibold text-zinc-400">
                        Producer: <span className="text-zinc-200">{track.producer}</span>
                      </p>

                      <p className="text-xs text-zinc-500 font-montserrat line-clamp-1">
                        {track.description}
                      </p>
                    </div>

                  </div>

                  {/* Track Right: BPM, Duration, Tags & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
                    
                    {/* Tags */}
                    <div className="hidden sm:flex items-center gap-2">
                      {track.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-montserrat font-medium text-zinc-400">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* BPM & Duration */}
                    <div className="flex items-center gap-4 text-xs font-montserrat font-bold text-zinc-300">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Zap className="w-3.5 h-3.5 fill-yellow-500/40" />
                        <span>{track.bpm} BPM</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{track.duration}</span>
                      </div>
                    </div>

                    {/* Like Action */}
                    <button
                      onClick={() => toggleLike(track.id)}
                      className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                        isLiked 
                          ? 'bg-red-500/20 border-red-500/50 text-red-500' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                  </div>

                </div>

                {/* Animated Audio Waveform Bar for Currently Playing Track */}
                {isPlayingThis && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 border-t border-zinc-800/80 mt-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-1.5 w-full overflow-hidden h-8">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-1.5 bg-yellow-400 rounded-full animate-pulse"
                          style={{
                            height: `${Math.floor(20 + Math.sin(i * 1.5) * 60)}%`,
                            animationDuration: `${0.4 + (i % 5) * 0.15}s`
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs font-montserrat font-extrabold text-yellow-400">
                      <Volume2 className="w-4 h-4 animate-bounce" />
                      <span>SYNTH BEAT ACTIVE</span>
                    </div>
                  </motion.div>
                )}

              </motion.div>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* GLOBAL PERSISTENT NOW PLAYING BAR (WHEN TRACK IS ACTIVE) */}
        {/* ---------------------------------------------------- */}
        {activeTrack && (
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-4 right-4 sm:left-8 sm:right-8 lg:left-16 lg:right-16 z-50 p-4 sm:p-5 rounded-2xl bg-zinc-950/95 border-2 border-yellow-500 backdrop-blur-xl shadow-2xl shadow-yellow-500/30 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black flex items-center justify-center font-bebas text-xl font-bold shrink-0">
                {activeTrack.trackNumber}
              </div>

              <div>
                <h4 className="font-bebas text-xl text-white uppercase tracking-wide leading-none">{activeTrack.title}</h4>
                <p className="text-xs text-yellow-400 font-montserrat font-bold">{activeTrack.producer} • {activeTrack.bpm} BPM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTrackPlayToggle(activeTrack)}
                className="px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-yellow-500/20"
              >
                {isPlayingCurrent ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlayingCurrent ? 'PAUSE' : 'RESUME'}</span>
              </button>

              <button
                onClick={() => {
                  stopAudioSynth();
                  setActiveTrackId(null);
                  setIsPlayingCurrent(false);
                }}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------------------------------------------------- */}
        {/* FUTURE UPLOAD MUSIC MODAL */}
        {/* ---------------------------------------------------- */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg p-8 rounded-3xl bg-zinc-950 border-2 border-yellow-500/60 shadow-2xl space-y-6 text-center relative"
            >
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg font-bold p-2"
              >
                ✕
              </button>

              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/40">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-bebas text-4xl text-white uppercase tracking-wide">SUBMIT YOUR KRUMP BEAT</h3>
                <p className="text-xs text-zinc-400 font-montserrat leading-relaxed">
                  Are you a street producer or beatmaker? Upload your MP3/WAV tracks to feature in the official Asansol Krump Kranti Audio Vault.
                </p>
              </div>

              <div className="p-8 border-2 border-dashed border-zinc-800 hover:border-yellow-500/60 rounded-2xl bg-zinc-900/50 transition-colors space-y-3 cursor-pointer">
                <Disc className="w-10 h-10 text-yellow-400 mx-auto animate-spin-slow" />
                <p className="text-xs font-montserrat font-bold text-white">Drag & drop your track file here</p>
                <span className="text-[10px] text-zinc-500 block uppercase font-mono">Supports MP3, WAV, FLAC (Max 20MB)</span>
              </div>

              <div className="space-y-3 text-left">
                <input 
                  type="text" 
                  placeholder="Beat Title (e.g. Asansol Stomp 120 BPM)"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
                <input 
                  type="text" 
                  placeholder="Producer Name / Instagram Handle"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <button
                onClick={() => {
                  alert("Thank you! Your beat submission has been queued for King Ragnar's Kranti Sound Review.");
                  setIsUploadModalOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-yellow-500/20"
              >
                SUBMIT FOR REVIEW
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};
