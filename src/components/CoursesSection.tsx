import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Zap, 
  Trophy, 
  Award, 
  Clock, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Play,
  BarChart,
  Target
} from 'lucide-react';

interface CoursesSectionProps {
  onOpenTickets?: () => void;
}

export interface CourseItem {
  id: string;
  courseNumber: string;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  sessions: string;
  instructor: string;
  badge: string;
  price: string;
  description: string;
  highlights: string[];
  modules: { title: string; desc: string }[];
  intensityScore: number;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'foundations-101',
    courseNumber: '01',
    title: 'KRUMP FOUNDATIONS 101: THE BUCK POSTURE',
    subtitle: 'Master the 5 Core Pillars of Raw Street Krump',
    level: 'Beginner',
    duration: '4 Weeks',
    sessions: '12 Live Sessions',
    instructor: 'King Ragnar & Kranti Squad',
    badge: 'MUST HAVE FOUNDATION',
    price: '₹1,999',
    description: 'The definitive entry course into authentic Krump dance. Build your buck posture, master explosive chest pops, precise jabs, heavy stomps, and sweeping arm swings without risking injury.',
    highlights: [
      'Anatomy of Chest Pops & Diaphragm Control',
      'Piston Jab Precision & Directional Targets',
      'Ground Reaction Force & Stomp Dynamics',
      'Building your First 8-Count Krump Combo'
    ],
    modules: [
      { title: 'Module 1: Stance & Rooted Stomp', desc: 'Lower body alignment, center of gravity, and earth-shaking stomps.' },
      { title: 'Module 2: Upper Body Explosion', desc: 'Isolating chest pops and controlling arm swing velocity.' },
      { title: 'Module 3: Jabs & Speed Drills', desc: 'Piston jabs, cross snaps, and rapid-fire target drills.' },
      { title: 'Module 4: Your First Cypher Round', desc: 'Putting the 5 pillars together in a live 30-second round.' }
    ],
    intensityScore: 78
  },
  {
    id: 'battle-psychology',
    courseNumber: '02',
    title: 'BATTLE CIRCLE & CHARACTER BUILDING',
    subtitle: 'Transforming Emotion into Beast Mode Persona',
    level: 'Intermediate',
    duration: '6 Weeks',
    sessions: '18 Deep Sessions',
    instructor: 'King Ragnar',
    badge: 'POPULAR CHOICE',
    price: '₹2,999',
    description: 'Elevate beyond basic choreography into true battle psychology. Learn how to construct a commanding battle character, control the circle hype, and switch characters mid-round.',
    highlights: [
      'Character Development & Beast Mode Persona',
      'Cypher Ring Control & Spatial Dominance',
      'Hype Generation & Crowds Reaction Read',
      'Translating Anger & Passion into Clean Art'
    ],
    modules: [
      { title: 'Module 1: The Persona Matrix', desc: 'Creating your unique Krump character and body language.' },
      { title: 'Module 2: Cypher Dynamics', desc: 'Stepping into the ring with unshakeable dominance.' },
      { title: 'Module 3: Character Switching', desc: 'Transitions between raw buckness and technical control.' },
      { title: 'Module 4: Live Mock Battles', desc: '1v1 simulated battle rounds with real-time feedback.' }
    ],
    intensityScore: 88
  },
  {
    id: 'ragnar-masterclass',
    courseNumber: '03',
    title: 'KING RAGNAR PRO BATTLE MASTERCLASS',
    subtitle: 'Championship Round Building & Opponent Countering',
    level: 'Advanced',
    duration: '3-Day Intensive',
    sessions: 'Exclusive Workshop',
    instructor: 'King Ragnar (Exclusive)',
    badge: 'LIMITED SLOTS',
    price: '₹4,499',
    description: 'Reserved for advanced battlers aiming for national championship trophies. King Ragnar breaks down round structure, stamina preservation, opponent reading, floorwork transitions, and counter-moves.',
    highlights: [
      'Structure of a Winning 3-Round Battle',
      'Micro-Pops, Glitches, and Floorwork Integration',
      'Opponent Countering & Musicality Locks',
      'Direct 1-on-1 Mentorship & Video Analysis'
    ],
    modules: [
      { title: 'Day 1: Round Architecture', desc: 'Opening statement, escalation, and killer round finishes.' },
      { title: 'Day 2: Advanced Floorwork & Glitch', desc: 'Level switches, ground spins, and complex isolation.' },
      { title: 'Day 3: Championship Mock Arena', desc: 'Full battle simulation judged by King Ragnar.' }
    ],
    intensityScore: 98
  },
  {
    id: 'lab-freestyle',
    courseNumber: '04',
    title: 'LABBING, FREESTYLE & SUB-BASS MUSICALITY',
    subtitle: 'Unlock Infinite Concept Creation & Musical Isolations',
    level: 'All Levels',
    duration: '8 Weeks',
    sessions: '24 Practice Drills',
    instructor: 'Senior Kranti Instructors',
    badge: 'CREATIVE HUB',
    price: '₹2,499',
    description: 'Discover how to lab new concepts independently. Train your ears to catch subtle sub-bass hits, polyrhythms, and complex beat drops while generating infinite original moves.',
    highlights: [
      'Systematic Labbing Methods & Drill Structures',
      'Sub-Bass Isolation & Micro-Rhythmic Locks',
      'Concept Creation: Mirrors, Liquids, & Metals',
      'Overcoming Creative Blocks in Freestyle'
    ],
    modules: [
      { title: 'Module 1: Ear Training for Battlers', desc: 'Hearing instrumentals beyond the basic snare.' },
      { title: 'Module 2: The Labbing Formula', desc: 'How to create 5 new moves from 1 base concept.' },
      { title: 'Module 3: Concept Fusion', desc: 'Blending Krump with animation, popping, and tutting.' },
      { title: 'Module 4: Infinite Freestyle Engine', desc: 'Flowing for 2 minutes straight without repeating.' }
    ],
    intensityScore: 84
  }
];

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenTickets }) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredCourses = COURSES_DATA.filter(course => {
    if (selectedFilter === 'All') return true;
    return course.level === selectedFilter;
  });

  const toggleCourseExpand = (id: string) => {
    setExpandedCourseId(prev => (prev === id ? null : id));
  };

  return (
    <section id="courses" className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 border-t border-zinc-900">
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
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>ACADEMY & MASTERCLASSES</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            KRUMP <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">COURSES</span>
          </h2>

          <p className="font-montserrat text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Learn authentic Krump technique, battle strategy, and character building directly from <span className="text-white font-bold">King Ragnar</span> and senior Kranti instructors.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6">
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-2 rounded-full font-montserrat font-extrabold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* COURSES LIST: SCROLL REVEAL ONE BY ONE */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-12 sm:space-y-16">
          {filteredCourses.map((course, index) => {
            const isExpanded = expandedCourseId === course.id;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="group relative rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-yellow-500/60 shadow-2xl shadow-yellow-500/5 hover:shadow-yellow-500/15 transition-all duration-500 overflow-hidden"
              >
                {/* Glow backdrop */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/10 transition-colors" />

                <div className="p-6 sm:p-10 lg:p-12 space-y-8 relative z-10">
                  
                  {/* Top Bar Info */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-bebas text-3xl sm:text-4xl text-yellow-500 font-extrabold">
                        {course.courseNumber}
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 font-montserrat font-extrabold text-xs uppercase tracking-wider border border-yellow-500/30">
                        {course.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 font-montserrat font-bold text-xs uppercase tracking-wider border border-zinc-800">
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-yellow-400">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-400">
                        <Users className="w-4 h-4 text-zinc-500" />
                        <span>{course.sessions}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Grid: Info + Key Features */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Title & Description */}
                    <div className="lg:col-span-7 space-y-4">
                      <h3 className="font-bebas text-3xl sm:text-5xl text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors leading-none">
                        {course.title}
                      </h3>
                      
                      <p className="font-montserrat font-bold text-xs sm:text-sm text-yellow-500/90 uppercase tracking-widest">
                        {course.subtitle}
                      </p>

                      <p className="font-montserrat text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-2 flex items-center gap-3 text-xs font-montserrat font-bold text-zinc-400">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span>Instructor: <strong className="text-white">{course.instructor}</strong></span>
                      </div>
                    </div>

                    {/* Right Column: Key Highlights & Intensity */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <span className="text-xs font-montserrat font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                          <Flame className="w-4 h-4 fill-yellow-500" />
                          COURSE HIGHLIGHTS
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-400">INTENSITY: {course.intensityScore}%</span>
                      </div>

                      <ul className="space-y-2.5">
                        {course.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs font-montserrat font-medium text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Intensity Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="w-full h-2 rounded-full bg-zinc-950 overflow-hidden p-0.5 border border-zinc-800">
                          <div 
                            className="h-full rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" 
                            style={{ width: `${course.intensityScore}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Expandable Module Accordion */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pt-6 border-t border-zinc-800/90 space-y-4"
                    >
                      <h4 className="font-bebas text-2xl text-yellow-400 tracking-wider uppercase">
                        MODULE SYLLABUS BREAKDOWN
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {course.modules.map((mod, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                            <span className="text-[11px] font-mono font-bold text-yellow-500 uppercase">{mod.title}</span>
                            <p className="text-xs text-zinc-300 font-montserrat">{mod.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => toggleCourseExpand(course.id)}
                      className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-400 hover:text-yellow-400 uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'HIDE SYLLABUS' : 'VIEW FULL SYLLABUS'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block font-bebas text-2xl text-yellow-400 leading-none">{course.price}</span>
                        <span className="block text-[10px] font-montserrat font-bold text-zinc-500 uppercase">FULL COURSE ACCESS</span>
                      </div>

                      <button
                        onClick={onOpenTickets}
                        className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                      >
                        <span>ENROLL NOW</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
