import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-neutral-950 text-white py-24 px-6 sm:px-12 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contacts with framer-motion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                Direct Line
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Connect with the Concierge Desk
              </h2>
              <p className="text-sm text-neutral-400 mt-3 font-light leading-relaxed">
                For long-term executive leases, multiple-vehicle convoys, or customized intercity transfers.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">24/7 Private Telephone Dispatch</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    +1 (800) 482-9012
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-white">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Encrypted Email Desk</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    concierge@brand-fleet.com
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Primary Terminals</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Manhattan · Mayfair · DIFC · Zurich
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form with framer-motion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-white/10 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                    A senior fleet director has been notified and will respond to <strong className="text-white">{email}</strong> within 20 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Request Bespoke Itinerary
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Julian Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="julian@vance.holdings"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                      Routing / Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. S-Class or Bentley GT arrival at JFK Terminal 4, luggage assistance for 3 passengers, transfer to Tribeca..."
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Dispatch to Concierge</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
