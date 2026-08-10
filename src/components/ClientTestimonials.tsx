import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Quote, 
  ArrowUpRight, 
  Sparkles, 
  Award, 
  Star, 
  CheckCircle2, 
  Crown, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  Volume2
} from 'lucide-react';

export interface TestimonialCard {
  id: string;
  number: string;
  clientName: string;
  category: string;
  badge: string;
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const TESTIMONIALS_DATA: TestimonialCard[] = [
  {
    id: 'test-01',
    number: '01',
    clientName: 'ASANSOL KRUMP KRANTI',
    category: 'Krump Event / Movement',
    badge: 'LIVE PROJECT',
    quote: '“King Ragnar transformed the entire Eastern India street dance ecosystem. Organizing Asansol Krump Kranti Vol. 1 set an unprecedented benchmark for raw energy, flawless production, and international judge presence.”',
    author: 'NATIONAL STREET DANCE ASSOCIATION',
    role: 'Event Committee Board',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'CROWD ATTENDANCE', value: '3,000+' },
      { label: 'CITIES PARTICIPATED', value: '18 CITIES' },
      { label: 'RAW RATING', value: '100% BUCK' }
    ],
    tags: ['Main Championship', 'Live Arena', 'International Judges']
  },
  {
    id: 'test-02',
    number: '02',
    clientName: 'RAGNAR PERFORMANCE',
    category: 'Krump / Live Performance',
    badge: 'LIVE PROJECT',
    quote: '“Watching King Ragnar step into the battle ring is electric. His chest pops and directional piston jabs carry sheer physical power that commands the entire room within seconds.”',
    author: 'MUMBAI KRUMP SYNDICATE',
    role: 'Veteran Battle Judges',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'BATTLE VICTORIES', value: '25+ TITLES' },
      { label: 'STAGE ENERGY', value: 'MAXIMUM' },
      { label: 'AUDIENCE HYPE', value: 'UNSTOPPABLE' }
    ],
    tags: ['Battle Arena', '1v1 Finals', 'Beast Mode']
  },
  {
    id: 'test-03',
    number: '03',
    clientName: 'STREET MOVEMENT',
    category: 'Dance / Culture',
    badge: 'LIVE PROJECT',
    quote: '“King Ragnar brings a rare blend of strict technical discipline and authentic street culture. His workshops don’t just teach moves—they build bulletproof mindset and character.”',
    author: 'DELHI HIP-HOP COLLECTIVE',
    role: 'Community Lead',
    imageUrl: 'https://images.unsplash.com/photo-1535525153412-5a42439e2b0d?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'WORKSHOP GRADUATES', value: '1,200+' },
      { label: 'MASTERCLASSES', value: '45+ CITIES' },
      { label: 'DISCIPLINE SCORE', value: 'PRO LEVEL' }
    ],
    tags: ['Culture Building', 'Street Roots', 'Masterclasses']
  },
  {
    id: 'test-04',
    number: '04',
    clientName: 'KING RAGNAR',
    category: 'Artist / Performer',
    badge: 'LIVE PROJECT',
    quote: '“Representing Asansol as a judge and battler across India, Ragnar represents the gold standard of Indian Krump. A true king both on and off the battle floor.”',
    author: 'KOLKATA DANCE NETWORK',
    role: 'Executive Curator',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'JUDGING PANELS', value: '15+ BATTLES' },
      { label: 'REPRESENTING', value: 'ASANSOL' },
      { label: 'LEGACY YEARS', value: '8+ YEARS' }
    ],
    tags: ['Iconic Leader', 'Krump Pioneer', 'Judges Panel']
  },
  {
    id: 'test-05',
    number: '05',
    clientName: 'KRUMP COMMUNITY',
    category: 'Movement / Collaboration',
    badge: 'LIVE PROJECT',
    quote: '“The Kranti movement has created a family for dancers who want to express their raw emotion safely and fiercely. Asansol is officially on the global Krump map.”',
    author: 'GLOBAL STREET CYPHER',
    role: 'Cypher Organizers',
    imageUrl: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=80&w=1200',
    stats: [
      { label: 'SQUAD MEMBERS', value: '250+ BUCKS' },
      { label: 'CYPHER SESSIONS', value: '100+ RINGS' },
      { label: 'COMMUNITY IMPACT', value: 'NATIONAL' }
    ],
    tags: ['Brotherhood', 'Street Unity', 'Global Wave']
  }
];

export const ClientTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track section scroll progress to drive card activation as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map 0 -> 1 progress smoothly across the 5 cards
      const step = 1 / TESTIMONIALS_DATA.length;
      const targetIndex = Math.min(
        TESTIMONIALS_DATA.length - 1,
        Math.max(0, Math.floor(latest / step))
      );
      setActiveIndex(targetIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 border-t border-zinc-900 relative"
    >
      <div className="max-w-[1700px] mx-auto space-y-16">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-montserrat font-bold text-xs tracking-[0.2em] uppercase">
            <Quote className="w-4 h-4 text-yellow-400" />
            <span>TESTIMONIALS & RECOGNITION</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            WHAT CLIENTS <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">ARE SAYING</span>
          </h2>

          <p className="font-montserrat text-yellow-400/90 font-bold text-sm sm:text-base md:text-lg tracking-[0.25em] uppercase">
            THE ENERGY SPEAKS FOR ITSELF.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* STACKED HORIZONTAL TESTIMONIAL CARDS */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-4 max-w-6xl mx-auto">
          {TESTIMONIALS_DATA.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className={`group rounded-3xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 border-yellow-500 shadow-2xl shadow-yellow-500/20'
                    : 'bg-zinc-950/80 border-zinc-800/80 hover:border-yellow-500/50 hover:bg-zinc-900/60 opacity-80 hover:opacity-100'
                }`}
              >
                {/* CARD COMPACT HEADER ROW (ALWAYS VISIBLE) */}
                <div className="p-6 sm:p-8 flex items-center justify-between gap-4 select-none">
                  
                  <div className="flex items-center gap-4 sm:gap-8">
                    {/* Number */}
                    <span className={`font-bebas text-4xl sm:text-6xl transition-colors ${
                      isActive ? 'text-yellow-400 font-extrabold' : 'text-zinc-600 group-hover:text-yellow-500'
                    }`}>
                      {card.number}
                    </span>

                    {/* Title & Category */}
                    <div>
                      <h3 className={`font-bebas text-2xl sm:text-4xl uppercase tracking-wide transition-colors ${
                        isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}>
                        {card.clientName}
                      </h3>
                      <p className="text-xs font-montserrat font-semibold text-zinc-400 uppercase tracking-wider">
                        {card.category}
                      </p>
                    </div>
                  </div>

                  {/* Badge & Toggle Indicator */}
                  <div className="flex items-center gap-4">
                    <span className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-montserrat font-extrabold tracking-wider uppercase border transition-all ${
                      isActive 
                        ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30' 
                        : 'bg-zinc-900 text-yellow-400 border-zinc-800 group-hover:border-yellow-500/40'
                    }`}>
                      <span>{card.badge}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>

                    <div className={`p-2 rounded-full border transition-colors ${
                      isActive ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                    }`}>
                      {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                </div>

                {/* EXPANDED CONTENT AREA (ANIMATED ON ACTIVE) */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="border-t border-zinc-800/80"
                    >
                      <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950">
                        
                        {/* Quote & Visual Image Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          
                          {/* Image Visual Panel */}
                          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 sm:h-80 border border-zinc-800 group/img">
                            <img 
                              src={card.imageUrl} 
                              alt={card.clientName} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-montserrat font-bold text-yellow-400">
                              <span className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30">
                                <Crown className="w-3.5 h-3.5" />
                                <span>VERIFIED RECOGNITION</span>
                              </span>
                            </div>
                          </div>

                          {/* Testimonial Quote Panel */}
                          <div className="lg:col-span-7 space-y-6">
                            <Quote className="w-10 h-10 text-yellow-500/40" />

                            <p className="font-montserrat text-base sm:text-xl text-zinc-100 font-medium leading-relaxed italic">
                              {card.quote}
                            </p>

                            <div className="border-l-2 border-yellow-500 pl-4 space-y-0.5">
                              <h4 className="font-bebas text-2xl text-white tracking-wide uppercase">{card.author}</h4>
                              <p className="text-xs font-montserrat font-bold text-yellow-400 uppercase tracking-wider">{card.role}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {card.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-montserrat font-semibold text-zinc-300">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 text-center">
                          {card.stats.map((stat, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                              <span className="block font-bebas text-2xl sm:text-4xl text-yellow-400">{stat.value}</span>
                              <span className="block text-[10px] font-montserrat font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
