import React, { useState } from 'react';
import { TicketTier } from '../types';
import { TICKET_TIERS } from '../defaultConfig';
import { X, CheckCircle2, Ticket, ShieldCheck, Zap, User, Mail, Phone, ArrowRight } from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[1]);
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isPurchased, setIsPurchased] = useState(false);

  if (!isOpen) return null;

  const totalAmount = selectedTier.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchased(true);
  };

  const handleReset = () => {
    setIsPurchased(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-zinc-900 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500 text-black font-extrabold">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-montserrat font-black text-lg text-white uppercase tracking-wider">
                ASANSOL KRUMP KRANTI VOL. 2
              </h2>
              <p className="text-xs text-yellow-400 font-semibold">Official Entry Pass & Competitor Registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isPurchased ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Step 1: Select Tier */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                1. Select Pass Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TICKET_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-yellow-500/10 border-yellow-500 shadow-lg shadow-yellow-500/10'
                          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {tier.recommended && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-yellow-500 text-black text-[10px] font-extrabold tracking-wider uppercase">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-montserrat font-bold text-sm text-white">{tier.name}</h3>
                      <div className="mt-1 text-xl font-black text-yellow-400">
                        ₹{tier.price}
                      </div>
                      <p className="mt-2 text-[11px] text-zinc-400 leading-snug">{tier.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Quantity & Contact Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  2. Pass Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-yellow-400 px-4">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <div className="text-xs text-zinc-400">Selected Features:</div>
                  <ul className="space-y-1">
                    {selectedTier.features.map((feat, i) => (
                      <li key={i} className="text-xs text-zinc-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  3. Attendee Details
                </label>
                <div className="space-y-2.5">
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name / Krump Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Total Price</span>
                <span className="font-montserrat font-black text-2xl text-yellow-400">₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-lg shadow-yellow-500/20 cursor-pointer"
              >
                <span>Confirm Pass Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Pass Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-montserrat font-black text-2xl text-white uppercase">Pass Confirmed!</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your entry badge has been generated for {formData.name || 'Attendee'}.
              </p>
            </div>

            {/* Mock Digital Ticket Pass */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-zinc-900 border-2 border-dashed border-yellow-500/50 text-left space-y-3 relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-yellow-400 tracking-wider uppercase block">
                    ASANSOL KRUMP KRANTI VOL. 2
                  </span>
                  <span className="font-montserrat font-black text-lg text-white">
                    {selectedTier.name}
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-yellow-500 text-black font-mono font-bold text-xs">
                  PASS #{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500 block">Holder</span>
                  <span className="text-zinc-200 font-semibold">{formData.name || 'King Krumper'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Quantity</span>
                  <span className="text-zinc-200 font-semibold">{quantity} Ticket(s)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Date</span>
                  <span className="text-zinc-200 font-semibold">24th Oct 2026</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Venue</span>
                  <span className="text-zinc-200 font-semibold">Asansol Stadium Circle</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-xs transition-colors"
            >
              Done & Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
