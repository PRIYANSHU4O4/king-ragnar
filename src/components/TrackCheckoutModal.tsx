import React, { useState } from 'react';
import { StoreTrack } from '../data/musicStore';
import { X, CheckCircle2, Music, ShieldCheck, Zap, User, Mail, Phone, Lock, Download } from 'lucide-react';

interface TrackCheckoutModalProps {
  track: StoreTrack | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (trackId: string) => void;
}

export const TrackCheckoutModal: React.FC<TrackCheckoutModalProps> = ({
  track,
  isOpen,
  onClose,
  onPaymentSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || !track) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing / gateway callback verification
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onPaymentSuccess(track.id);
    }, 1200);
  };

  const handleDownload = () => {
    if (track.audioUrl) {
      const link = document.createElement('a');
      link.href = track.audioUrl;
      link.download = `${track.title.toLowerCase().replace(/\s+/g, '-')}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCloseModal = () => {
    setIsCompleted(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-zinc-900 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500 text-black font-extrabold">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-montserrat font-black text-sm sm:text-base text-white uppercase tracking-wider">
                KRUMP MUSIC VAULT STORE
              </h2>
              <p className="text-xs text-yellow-400 font-semibold">Official High-Quality MP3 Download</p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Track Summary Box */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-yellow-500/30 flex items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-yellow-500/20 text-yellow-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-yellow-500/30">
                  {track.category}
                </span>
                <h3 className="font-bebas text-2xl text-white tracking-wider mt-1">
                  {track.title}
                </h3>
                <p className="text-xs text-zinc-400">{track.producer} • {track.bpm} BPM</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-zinc-400 uppercase block">PRICE</span>
                <span className="font-montserrat font-black text-2xl text-yellow-400">₹{track.price}</span>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Customer Information (For Download Access Token)
              </label>

              <div className="space-y-3">
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (UPI / Contact)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Guarantee Note */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
              <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
              <span>Instant High-Quality 320kbps MP3 download link unlocked immediately after ₹49 payment verification.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-800 text-black disabled:text-zinc-500 font-montserrat font-black text-sm tracking-widest uppercase transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>VERIFYING PAYMENT (₹49)...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 fill-current" />
                  <span>PAY ₹49 & UNLOCK DOWNLOAD</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bebas text-3xl text-white tracking-wider">
                PAYMENT VERIFIED!
              </h3>
              <p className="text-xs text-zinc-300 font-medium max-w-sm mx-auto">
                Thank you, <span className="text-yellow-400 font-bold">{formData.name}</span>. Your ₹49 payment for <span className="text-white font-bold">{track.title}</span> has been confirmed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                YOUR UNLOCKED MP3 FILE IS READY
              </div>
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-montserrat font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD MP3 NOW</span>
              </button>
            </div>

            <button
              onClick={handleCloseModal}
              className="text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              CLOSE STORE WINDOW
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
