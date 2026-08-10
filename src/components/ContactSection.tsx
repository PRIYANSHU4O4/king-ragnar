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
    q: "How do I register for the 1v1 Krump Battle Championship?",
    a: "You can click on the 'Get Tickets' or 'Battle Passes' button across the app to reserve your battle pass. On-spot registration will also be open at Asansol Indoor Sports Arena at 09:00 AM on event day."
  },
  {
    q: "Can beginners participate in the King Ragnar Masterclass?",
    a: "Yes! Krump Foundations 101 and the Open Masterclass are structured for all skill levels. Dancers stepping into Krump for the first time will receive dedicated fundamental drills."
  },
  {
    q: "Where is the main venue located in Asansol?",
    a: "Asansol Indoor Sports Arena, West Bengal 713301. It is conveniently located 10 minutes from Asansol Junction Railway Station."
  },
  {
    q: "How can producers submit music for future AKK volumes?",
    a: "Head over to our Music Vault section above and click 'Upload Your Beat'. You can also email your MP3/WAV links to kranti.sound@asansolkrump.com."
  }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTickets }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Battle Registration Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Battle Registration Inquiry',
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
                SEND A MESSAGE TO THE ARENA
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
                      placeholder="e.g. King Buck"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. battler@krump.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                      PHONE / WHATSAPP (OPTIONAL)
                    </label>
                    <input 
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                      INQUIRY SUBJECT
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                    >
                      <option value="Battle Registration Inquiry">1v1 Battle Registration</option>
                      <option value="King Ragnar Workshop Pass">Masterclass & Workshop Pass</option>
                      <option value="Sponsorship & Media">Sponsorship & Press Media</option>
                      <option value="Music Submission">Music Beats Submission</option>
                      <option value="General Query">General Inquiry</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-montserrat font-bold text-zinc-300 uppercase tracking-wider">
                    YOUR MESSAGE *
                  </label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Type your message, battle questions, or event inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 text-xs font-montserrat focus:outline-none focus:border-yellow-500 transition-colors"
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
                  <span className="font-bold text-white block uppercase">Venue Name & Address:</span>
                  <p className="text-zinc-400">Asansol Indoor Sports Arena, Near GT Road, West Bengal 713301</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">Event Date & Timings:</span>
                  <p className="text-zinc-400">Saturday, 24th October 2026 • Gates Open at 09:00 AM</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-white block uppercase">Contact Hotline:</span>
                  <p className="text-yellow-400 font-bold">+91 98765 43210 / +91 91234 56789</p>
                </div>
              </div>

              <button
                onClick={onOpenTickets}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-yellow-500 hover:text-black text-yellow-400 border border-yellow-500/40 font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>BOOK CHAMPIONSHIP PASS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social & Connect Hub */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 space-y-6">
              <h4 className="font-bebas text-2xl text-white uppercase tracking-wide border-b border-zinc-800 pb-3">
                OFFICIAL SOCIAL HANDLES
              </h4>

              <div className="space-y-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 flex items-center justify-between text-xs font-montserrat transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Instagram Handle</span>
                      <span className="text-zinc-400">@asansolkrumpkranti</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-500 -rotate-90 group-hover:text-yellow-400 transition-colors" />
                </a>

                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 flex items-center justify-between text-xs font-montserrat transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">YouTube Channel</span>
                      <span className="text-zinc-400">Asansol Krump Kranti Official</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-500 -rotate-90 group-hover:text-yellow-400 transition-colors" />
                </a>
              </div>
            </div>

          </motion.div>

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
