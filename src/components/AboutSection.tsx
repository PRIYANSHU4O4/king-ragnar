import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Crown, 
  Flame, 
  Zap, 
  Trophy, 
  Award, 
  Activity, 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Target, 
  Users, 
  ChevronRight,
  Volume2,
  VolumeX,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface AboutSectionProps {
  onOpenTickets?: () => void;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
}

interface KrumpPillar {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  energyLevel: number;
  keyMoves: string[];
  quote: string;
  icon: React.ElementType;
}

const KRUMP_PILLARS: KrumpPillar[] = [
  {
    id: 'jabs',
    name: 'JABS',
    title: 'Precision Impact & Explosive Direction',
    tagline: 'Raw Speed meets Pinpoint Target Control',
    description: 'Jabs are the sudden, explosive directional punches that define Krump tempo. Every jab sends shockwaves through the circle, asserting dominance and establishing spatial control.',
    energyLevel: 92,
    keyMoves: ['Piston Jab', 'Cross Snap', 'Double Impact', 'Ghost Jab'],
    quote: '"A jab isn\'t just a strike; it\'s your statement of presence in the ring."',
    icon: Zap
  },
  {
    id: 'chestpops',
    name: 'CHEST POPS',
    title: 'Heartbeat of the Underground',
    tagline: 'Internal Resonance & Rhythmic Stomp',
    description: 'Chest pops represent the diaphragm-driven resonance of the dancer\'s spirit. It translates heavy sub-bass hits into visible physical recoil and raw emotional release.',
    energyLevel: 98,
    keyMoves: ['Sub-Bass Pop', 'Triple Contraction', 'Isolated Elevation', 'Stomp-Pop Combo'],
    quote: '"Your chest carries the rhythm before your hands ever move."',
    icon: Flame
  },
  {
    id: 'armswings',
    name: 'ARM SWINGS',
    title: 'Kinetic Momentum & Horizon Control',
    tagline: 'Sweeping Power & Orbital Paths',
    description: 'Wide, heavy, and controlled arm swings chop through the air to create massive visual volume. They command the outer boundary of the battle ring.',
    energyLevel: 95,
    keyMoves: ['Overhead Chopper', 'Helicopter Swing', 'Blade Slash', 'Pendulum Drop'],
    quote: '"Carve space around you until the entire crowd feels the wind."',
    icon: Activity
  },
  {
    id: 'stomps',
    name: 'STOMPS',
    title: 'Earth-Shaking Groundwork',
    tagline: 'Rooted Buck Force & Foundation',
    description: 'Stomps connect the dancer directly to the concrete floor. They generate the foundational ground reaction force that powers every high-energy combo.',
    energyLevel: 100,
    keyMoves: ['Earthquake Stomp', 'Double Heel Drop', 'Piston Step', 'Buck March'],
    quote: '"Stomp like the ground owes you something."',
    icon: ShieldCheck
  },
  {
    id: 'buckness',
    name: 'BUCK CHARACTER',
    title: 'Unfettered Spirit & Persona',
    tagline: 'The Transformation into the Beast Mode',
    description: 'Being Buck is the state of mind where raw emotion, technique, and spiritual energy merge. It transcends simple choreography into pure, unfiltered expression.',
    energyLevel: 99,
    keyMoves: ['Beast Mode Stance', 'Character Switch', 'Glitch Walk', 'Crown Pose'],
    quote: '"Technique gets you in the ring. Buckness keeps you on the throne."',
    icon: Crown
  }
];

const TIMELINE_MILESTONES = [
  {
    year: '2018',
    title: 'THE SPARK IN ASANSOL',
    subtitle: 'Underground Street Sessions',
    description: 'King Ragnar initiates raw, unfiltered Krump practice circles on local concrete floors in Asansol, introducing the street movement to West Bengal.',
    stats: 'First 12 Underground Battlers',
    badge: 'GENESIS'
  },
  {
    year: '2021',
    title: 'THE KRANTI MOVEMENT',
    subtitle: 'Asansol Krump Kranti Vol. 1',
    description: 'Launch of AKK Vol. 1 — bringing together dancers across Eastern India for intense 1v1 battle rounds, masterclasses, and street cyphers.',
    stats: '150+ Attendees & Battlers',
    badge: 'MILESTONE'
  },
  {
    year: '2024',
    title: 'NATIONAL RECOGNITION',
    subtitle: 'Judged & Represented',
    description: 'King Ragnar has judged and represented in many places across the country, solidifying Asansol as a premier Krump hub.',
    stats: 'Judged & Represented Nationwide',
    badge: 'LEGACY'
  },
  {
    year: '2026',
    title: 'ASANSOL KRUMP KRANTI VOL. 1',
    subtitle: 'The Ultimate Kingdom Stage',
    description: 'The return of the legendary championship featuring International Judges, Live Beat Synthesizer Battles, and Masterclass Workshops.',
    stats: 'The Crown awaits the Champion',
    badge: 'PRESENT'
  }
];

const RAGNAR_QUOTES = [
  "Krump is not just dance; it's a spiritual storm rendered in physical form.",
  "When the bass hits, throw away hesitation. The street demands complete authenticity.",
  "Your crown isn't given; it's forged in every battle round on the concrete.",
  "Asansol isn't just a place on the map — it's the heartland of raw Indian Krump."
];

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenTickets,
  isPlayingMusic,
  onToggleMusic 
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('jabs');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);
  const [energyBoost, setEnergyBoost] = useState<boolean>(false);

  const activePillar = KRUMP_PILLARS.find(p => p.id === selectedPillarId) || KRUMP_PILLARS[0];

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % RAGNAR_QUOTES.length);
  };

  return (
    <section id="about" className="w-full bg-black text-white py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1700px] mx-auto space-y-32">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-montserrat font-bold text-xs tracking-[0.2em] uppercase">
            <Crown className="w-4 h-4 fill-yellow-500/30 text-yellow-400" />
            <span>THE KINGDOM & THE LEGACY</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            ABOUT <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">KING RAGNAR</span>
          </h2>

          <p className="font-montserrat text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Pioneer of <span className="text-white font-bold">Asansol Krump Kranti</span>. Transforming raw street energy into structured mastery, building an unshakeable Krump culture across the nation.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 1: LEFT-RIGHT PATTERN (LEFT: Text/Bio, RIGHT: Interactive Cards) */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT - Scroll Reveal From Left */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-montserrat font-extrabold tracking-[0.25em] text-yellow-500 uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 fill-yellow-500" />
                <span>01. ORIGIN & VISION</span>
              </span>

              <h3 className="font-bebas text-4xl sm:text-6xl text-white uppercase leading-none tracking-wide">
                RAW STREET ENERGY, <br />
                <span className="text-amber-400">UNCOMPROMISING PURPOSE</span>
              </h3>
            </div>

            <p className="font-montserrat text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
              King Ragnar introduced Krump to Asansol with one clear mission: to build a platform where battlers don't just dance, but express their deepest truths through power, musicality, and character.
            </p>

            {/* Interactive Feature Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-yellow-500/50 transition-colors group">
                <div className="font-bebas text-3xl sm:text-4xl text-yellow-400 group-hover:scale-105 transition-transform">8+ YEARS</div>
                <div className="text-[11px] font-montserrat font-bold text-zinc-400 uppercase tracking-wider">Krump Mentorship</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-yellow-500/50 transition-colors group">
                <div className="font-bebas text-3xl sm:text-4xl text-yellow-400 group-hover:scale-105 transition-transform">50+ BATTLES</div>
                <div className="text-[11px] font-montserrat font-bold text-zinc-400 uppercase tracking-wider">Champion Rounds</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-yellow-500/50 transition-colors group col-span-2 sm:col-span-1">
                <div className="font-bebas text-3xl sm:text-4xl text-yellow-400 group-hover:scale-105 transition-transform">AKK VOL. 1</div>
                <div className="text-[11px] font-montserrat font-bold text-zinc-400 uppercase tracking-wider">Main Arena</div>
              </div>
            </div>

            {/* Audio Beat Synthesizer Integration Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-yellow-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 shrink-0">
                  {isPlayingMusic ? <Volume2 className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-xs sm:text-sm text-white uppercase">INTERACTIVE STREET BEATS</h4>
                  <p className="text-[11px] text-zinc-400">Feel the 120 BPM Krump Stomp Engine</p>
                </div>
              </div>

              <button
                onClick={onToggleMusic}
                className={`px-4 py-2 rounded-xl font-montserrat font-extrabold text-xs tracking-wider uppercase transition-all shrink-0 ${
                  isPlayingMusic 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20'
                }`}
              >
                {isPlayingMusic ? 'MUTE BEATS' : 'PLAY BEATS'}
              </button>
            </div>
          </motion.div>

          {/* RIGHT CONTENT - Scroll Reveal From Right */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Interactive Quote Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-yellow-500/40 shadow-2xl shadow-yellow-500/10 space-y-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Crown className="w-5 h-5 fill-yellow-500/30" />
                  <span className="font-bebas text-lg tracking-wider uppercase">KING RAGNAR PHILOSOPHY</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">0{activeQuoteIndex + 1} / 0{RAGNAR_QUOTES.length}</span>
              </div>

              <blockquote className="font-montserrat font-extrabold text-lg sm:text-2xl text-white italic leading-snug min-h-[100px] flex items-center">
                &ldquo;{RAGNAR_QUOTES[activeQuoteIndex]}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleNextQuote}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-yellow-500 hover:text-black text-yellow-400 text-xs font-montserrat font-bold tracking-wider uppercase transition-all duration-300 border border-zinc-800 hover:border-yellow-400"
                >
                  <span>NEXT INSIGHT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="text-right">
                  <span className="block font-bebas text-lg text-white tracking-widest uppercase">ASANSOL KRUMP KRANTI</span>
                  <span className="block text-[10px] text-yellow-500 font-bold uppercase tracking-widest">VOL. 1 CHAMPIONSHIP</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 2: LEFT-RIGHT PATTERN (LEFT: Interactive Pillars Selector, RIGHT: Active Pillar Details) */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-montserrat font-extrabold tracking-[0.25em] text-yellow-500 uppercase flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 fill-yellow-500" />
              <span>02. THE CORE MECHANICS</span>
            </span>

            <h3 className="font-bebas text-5xl sm:text-7xl text-white uppercase tracking-tight">
              THE 5 PILLARS OF <span className="text-yellow-400">KRUMP</span>
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-medium max-w-xl mx-auto">
              Select any pillar below to inspect its movement dynamics, energy impact, and core battle signature.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE: Pillar Selection Tabs (Scroll Reveal Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col space-y-3"
            >
              {KRUMP_PILLARS.map((pillar) => {
                const isSelected = pillar.id === selectedPillarId;
                const IconComponent = pillar.icon;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`group w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 border-yellow-500 shadow-lg shadow-yellow-500/10'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-colors ${
                        isSelected ? 'bg-yellow-500 text-black' : 'bg-zinc-900 text-yellow-400 group-hover:bg-zinc-800'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div>
                        <h4 className={`font-bebas text-2xl tracking-wider uppercase leading-none ${
                          isSelected ? 'text-yellow-400' : 'text-white group-hover:text-zinc-200'
                        }`}>
                          {pillar.name}
                        </h4>
                        <p className="text-[11px] font-montserrat font-medium text-zinc-400 line-clamp-1">
                          {pillar.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-yellow-500 font-bold">{pillar.energyLevel}%</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-yellow-400' : 'text-zinc-600'}`} />
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* RIGHT SIDE: Interactive Dynamic Pillar Showcase (Scroll Reveal Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="h-full p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-yellow-500/50 shadow-2xl shadow-yellow-500/15 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-zinc-800/90 pb-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest border border-yellow-500/40">
                      PILLAR INSIGHT
                    </span>
                    <span className="font-bebas text-xl text-zinc-400 tracking-wider uppercase">
                      STREET DYNAMICS
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bebas text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
                      {activePillar.name}
                    </h3>
                    <p className="font-montserrat font-bold text-xs sm:text-sm text-yellow-400 uppercase tracking-widest mt-1">
                      {activePillar.title}
                    </p>
                  </div>

                  <p className="font-montserrat text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {activePillar.description}
                  </p>

                  {/* Energy Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs font-montserrat font-bold text-zinc-400 uppercase tracking-wider">
                      <span>BATTLE INTENSITY IMPACT</span>
                      <span className="text-yellow-400">{activePillar.energyLevel} / 100</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden p-0.5 border border-zinc-800">
                      <motion.div 
                        key={activePillar.id}
                        initial={{ width: 0 }}
                        animate={{ width: `${activePillar.energyLevel}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                      />
                    </div>
                  </div>

                  {/* Signature Moves Tags */}
                  <div className="space-y-3 pt-2">
                    <span className="block text-xs font-montserrat font-bold text-zinc-400 uppercase tracking-wider">
                      SIGNATURE MOVEMENT EXAMPLES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.keyMoves.map((move, idx) => (
                        <span 
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-montserrat font-semibold hover:border-yellow-500/60 hover:text-yellow-400 transition-colors"
                        >
                          ⚡ {move}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Quote Banner */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 italic text-xs text-yellow-300 font-montserrat font-semibold flex items-center gap-3">
                  <Crown className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{activePillar.quote}</span>
                </div>

              </div>
            </motion.div>

          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 3: ALTERNATING TIMELINE (LEFT-RIGHT REVEAL ON SCROLL) */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-montserrat font-extrabold tracking-[0.25em] text-yellow-500 uppercase flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 fill-yellow-500" />
              <span>03. CHRONICLES OF AKK</span>
            </span>

            <h3 className="font-bebas text-5xl sm:text-7xl text-white uppercase tracking-tight">
              THE JOURNEY OF <span className="text-yellow-400">KRUMP KRANTI</span>
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-medium max-w-xl mx-auto">
              From underground street cyphers to Eastern India&apos;s premier Krump battle stage.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Vertical Timeline Axis Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-yellow-500 via-amber-500/50 to-zinc-900 hidden md:block" />

            <div className="space-y-12 md:space-y-16">
              {TIMELINE_MILESTONES.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div key={index} className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    {/* LEFT SIDE (Content if even, Empty if odd on desktop) */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.7 }}
                      className={`w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:text-left md:order-2'}`}
                    >
                      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 space-y-4 relative group">
                        
                        <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-mono text-xs font-bold border border-yellow-500/30 uppercase">
                            {item.badge}
                          </span>
                          <span className="font-bebas text-3xl text-yellow-400 font-black">{item.year}</span>
                        </div>

                        <h4 className="font-bebas text-3xl sm:text-4xl text-white uppercase tracking-wider group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h4>

                        <p className="font-montserrat font-bold text-xs text-amber-500 uppercase tracking-widest">
                          {item.subtitle}
                        </p>

                        <p className="font-montserrat text-zinc-300 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>

                        <div className={`pt-2 border-t border-zinc-900 text-xs font-montserrat font-bold text-yellow-400 flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span>{item.stats}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* CENTER NODE CIRCLE */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-black border-2 border-yellow-500 items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                    </div>

                    {/* RIGHT SIDE (Empty spacer for even, Content for odd) */}
                    <div className="hidden md:block w-[45%]" />

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 4: CALL TO ACTION (INTERACTIVE JOIN THE KINGDOM) */}
        {/* ---------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 text-center space-y-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.12)_0%,_transparent_70%)] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 font-montserrat font-bold text-xs tracking-widest uppercase border border-yellow-500/40">
            <Crown className="w-4 h-4 fill-yellow-500/40" />
            <span>STEP INTO THE BATTLE ARENA</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <h3 className="font-bebas text-5xl sm:text-7xl text-white uppercase tracking-tight leading-none">
              READY TO CLAIM YOUR <span className="text-yellow-400">CROWN?</span>
            </h3>
            <p className="font-montserrat text-zinc-300 text-sm sm:text-base leading-relaxed">
              Join King Ragnar at Asansol Krump Kranti Vol. 1. Whether you are battling for the championship trophy or attending exclusive masterclasses, the arena awaits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={onOpenTickets}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-yellow-500/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>GET BATTLE TICKETS</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleMusic}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-yellow-400 border border-yellow-500/40 font-montserrat font-bold text-sm tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPlayingMusic ? 'PAUSE BEATS' : 'TEST BEAT SYNTH'}</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
