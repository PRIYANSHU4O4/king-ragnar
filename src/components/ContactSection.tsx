import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Send, 
  Instagram, 
  Youtube, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface ContactSectionProps {
  onOpenTickets?: () => void;
}

const FAQ_ITEMS = [
  {
    q: "How can I register for a class from Ragnar?",
    a: "To register for a class with Ragnar, contact him directly through the contact section of the website. Share your full name, phone number, and the course you are interested in, and Ragnar will guide you through the registration process."
  },
  {
    q: "Can a beginner start Krump from scratch without any prior knowledge?",
    a: "Absolutely. You do not need any previous Krump experience to start. Beginners can start with Krump Foundation 101, where the fundamentals, basic movements, musicality, character, and core concepts of Krump are taught step by step."
  },
  {
    q: "Where can I learn about Krump and how can I get started?",
    a: "You can explore the King Ragnar website to learn about Krump, its culture, movement, music, and training. If you are completely new, start with the Beginner course — Krump Foundation 101 — and build your foundation step by step under proper guidance."
  },
  {
    q: "Where is the main venue located in Asansol?",
    a: "Indoor Stadium, Asansol (Near Galaxy Mall). Event Date: 16 August 2026 at 11:00 AM. Contact Hotline: 7718784906."
  },
  {
    q: "How can producers submit music for future AKK volumes?",
    a: "Head over to our Music Vault section above. You can also contact us directly at 7718784906 for music features."
  }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTickets }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    enquiry: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        enquiry: '',
        message: ''
      });
    }, 1200);
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="contact" className="w-full bg-black text-white py-24 px-4 sm:px-8 lg:px-16 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-[1700px] mx-auto space-y-24">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-montserrat font-bold text-xs tracking-[0.2em] uppercase">
            <Compass className="w-4 h-4 text-yellow-400" />
            <span>LOCATION & BATTLE INQUIRIES</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-7xl lg:text-9xl tracking-tight text-white uppercase leading-none">
            GET IN TOUCH WITH <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]">KRANTI SQUAD</span>
          </h2>

          <p className="font-montserrat text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Have questions about battle registrations, venue directions, workshop passes, or press inquiries? We are here to help you step into the kingdom.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 1: LEFT-RIGHT PATTERN (FORM & LOCATION CARDS) */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE CONTACT FORM (Scroll Reveal Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-2xl space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <span className="text-xs font-montserrat font-extrabold tracking-[0.2em] text-yellow-500 uppercase flex items-center gap-2">
                <Send className="w-4 h-4 text-yellow-500" />
                <span>DIRECT MESSAGING</span>
              </span>
              <h3 className="font-bebas text-4xl sm:text-5xl text-white uppercase tracking-tight">
                SEND A MESSAGE TO RAGNAR
              </h3>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-bebas text-3xl text-white uppercase">MESSAGE RECEIVED!</h4>
                <p className="text-xs text-zinc-300 font-montserrat max-w-md mx-auto">
                  Thank you for reaching out. King Ragnar and the Asansol Krump Kranti crew will get back to your query shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                      FULL NAME *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Pranjal Bharti"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                      PHONE NUMBER *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 7718784906"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                </div>

                {/* What is your enquiry? */}
                <div className="space-y-2">
                  <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                    WHAT IS YOUR ENQUIRY? *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Briefly state your enquiry (e.g. Workshop Details, Battle Registration, Music Vault, etc.)"
                    value={formData.enquiry}
                    onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                    className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                {/* Message / Describe your problem */}
                <div className="space-y-2">
                  <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                    MESSAGE / DESCRIBE YOUR PROBLEM *
                  </label>
                  <textarea 
                    rows={6}
                    maxLength={10000000}
                    required
                    placeholder="Type your message or describe your problem in complete detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors resize-y min-h-[140px]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-montserrat font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">SENDING MESSAGE...</span>
                  ) : (
                    <>
                      <span>SUBMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </motion.div>

          {/* RIGHT COLUMN: VENUE DETAILS & SOCIAL HUB (Scroll Reveal Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Venue Card */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-yellow-500/40 shadow-2xl shadow-yellow-500/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 text-yellow-400 border-b border-zinc-800 pb-4">
                <MapPin className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <h4 className="font-bebas text-2xl text-white uppercase tracking-wide leading-none">MAIN EVENT ARENA</h4>
                  <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase">ASANSOL, WEST BENGAL</span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-montserrat text-zinc-300">
                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">VENUE:</span>
                  <p className="text-zinc-400 font-medium">Indoor Stadium, Asansol<br />Near Galaxy Mall</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">EVENT DATE:</span>
                  <p className="text-zinc-400 font-medium">16 August 2026</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">EVENT START TIME:</span>
                  <p className="text-zinc-400 font-medium">11:00 AM</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">CONTACT:</span>
                  <p className="text-yellow-400 font-bold text-sm">7718784906</p>
                </div>
              </div>
            </div>

            {/* Social & Connect Hub */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 space-y-6">
              <h4 className="font-bebas text-2xl text-white uppercase tracking-wide border-b border-zinc-800 pb-3">
                OFFICIAL SOCIAL HANDLES
              </h4>

              <div className="space-y-4">
                <a 
                  href="https://www.instagram.com/asansol_krump_kranti_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Asansol Krump Kranti on Instagram"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 flex items-center justify-between text-xs font-montserrat transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Instagram Handle</span>
                      <span className="text-zinc-400">@asansol_krump_kranti_</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-500 -rotate-90 group-hover:text-yellow-400 transition-colors" />
                </a>

                <a 
                  href="https://youtube.com/@asansol_krump_kranti" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Asansol Krump Kranti on YouTube"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 flex items-center justify-between text-xs font-montserrat transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">YouTube Channel</span>
                      <span className="text-zinc-400">@asansol_krump_kranti</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-500 -rotate-90 group-hover:text-yellow-400 transition-colors" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* DEDICATED SOCIAL MEDIA SECTION: FOLLOW THE MOVEMENT */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-8 max-w-4xl mx-auto pt-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-montserrat font-extrabold tracking-[0.25em] text-yellow-500 uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>OFFICIAL SOCIAL MEDIA</span>
            </span>

            <h3 className="font-bebas text-5xl sm:text-6xl text-white uppercase tracking-tight">
              FOLLOW THE <span className="text-yellow-400">MOVEMENT</span>
            </h3>

            <p className="text-zinc-400 text-xs sm:text-sm font-medium max-w-xl mx-auto font-montserrat">
              Stay connected with the Asansol Krump Kranti movement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* INSTAGRAM CARD */}
            <motion.a
              href="https://www.instagram.com/asansol_krump_kranti_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asansol Krump Kranti on Instagram"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-yellow-500/50 hover:bg-zinc-900/60 shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-yellow-500/20 via-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30 group-hover:scale-110 transition-transform">
                  <Instagram className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="font-bebas text-2xl text-white uppercase tracking-wider block group-hover:text-yellow-400 transition-colors">
                    INSTAGRAM
                  </span>
                  <p className="text-xs font-montserrat font-bold text-zinc-400">
                    Follow us on Instagram
                  </p>
                  <span className="text-[10px] font-mono text-yellow-500 font-semibold block">
                    @asansol_krump_kranti_
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-yellow-400 transition-colors shrink-0" />
            </motion.a>

            {/* YOUTUBE CARD */}
            <motion.a
              href="https://youtube.com/@asansol_krump_kranti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asansol Krump Kranti on YouTube"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-yellow-500/50 hover:bg-zinc-900/60 shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-red-500/20 text-red-500 border border-red-500/30 group-hover:scale-110 transition-transform">
                  <Youtube className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="font-bebas text-2xl text-white uppercase tracking-wider block group-hover:text-yellow-400 transition-colors">
                    YOUTUBE
                  </span>
                  <p className="text-xs font-montserrat font-bold text-zinc-400">
                    Subscribe on YouTube
                  </p>
                  <span className="text-[10px] font-mono text-yellow-500 font-semibold block">
                    @asansol_krump_kranti
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-yellow-400 transition-colors shrink-0" />
            </motion.a>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* ITEM 2: INTERACTIVE FAQ ACCORDION (SCROLL REVEAL) */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-10 max-w-4xl mx-auto pt-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-montserrat font-extrabold tracking-[0.25em] text-yellow-500 uppercase flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-yellow-500" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </span>

            <h3 className="font-bebas text-5xl sm:text-6xl text-white uppercase tracking-tight">
              EVERYTHING YOU NEED TO KNOW
            </h3>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-yellow-500/50 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-montserrat font-extrabold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 text-xs sm:text-sm font-montserrat text-zinc-300 leading-relaxed border-t border-zinc-900 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
