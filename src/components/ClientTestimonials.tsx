import React from 'react';
import { motion } from 'motion/react';
import { 
  Quote, 
  Sparkles, 
  Award
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
  return (
    <section 
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
        {/* COMING SOON TESTIMONIALS CARD (POST-EVENT STATE) */}
        {/* ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto p-10 sm:p-16 rounded-3xl bg-zinc-950 border border-yellow-500/40 shadow-2xl shadow-yellow-500/10 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/10">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-yellow-500/15 text-yellow-400 font-montserrat font-extrabold text-xs tracking-widest uppercase border border-yellow-500/30">
              POST-EVENT REVIEWS &amp; TESTIMONIALS
            </span>

            <h3 className="font-bebas text-4xl sm:text-6xl text-white uppercase tracking-tight">
              COMING <span className="text-yellow-400">SOON</span>
            </h3>

            <p className="font-montserrat text-zinc-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Official attendee feedback, battler testimonials, and event reviews will be published here following the conclusion of Asansol Krump Kranti Vol. 1.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-montserrat text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>REVIEWS OPEN AFTER EVENT DAY • 16 AUGUST 2026</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
