import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Clock, Key, CreditCard, Sparkles, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQS: FAQItem[] = [
  {
    id: 'insurance',
    category: 'Protection & Coverage',
    question: 'What insurance is included with each luxury reservation?',
    answer:
      'Every vehicle in our collection comes with comprehensive, full-collision liability coverage with a $0 deductible policy automatically included. Third-party liability, tire/glass protection, and 24/7 dedicated telephone roadside concierge are standard. You do not need secondary policies or third-party waivers.',
    icon: ShieldCheck,
  },
  {
    id: 'age',
    category: 'Eligibility',
    question: 'What are the age and driver license requirements?',
    answer:
      'The primary driver must be at least 21 years old for executive sedans (Mercedes S-Class, BMW 760i) and 25 years old for high-performance supercars and grand tourers (Porsche 911, Ferrari Roma, Rolls-Royce Ghost). A valid domestic driver’s license or international driving permit (IDP) held for a minimum of 2 years is required. Digital verification takes less than 60 seconds.',
    icon: Key,
  },
  {
    id: 'delivery',
    category: 'Logistics',
    question: 'How does rapid doorstep and airport delivery work?',
    answer:
      'Our private white-glove transport team delivers the car directly to your requested pin in under 60 minutes across New York, London, Paris, and Dubai. For airport arrivals, we meet you curbside or coordinate ramp-side access with private aviation FBOs (such as Teterboro, Signature Flight Support, or Farnborough).',
    icon: Clock,
  },
  {
    id: 'deposit',
    category: 'Billing & Security',
    question: 'How are security deposits and payments processed?',
    answer:
      'We place a temporary pre-authorization hold on your preferred credit card 2 hours prior to handover ($1,500 – $3,500 depending on vehicle tier). The hold is automatically released immediately upon return following our swift 5-minute visual inspection. We accept major credit cards and discreet corporate bank transfers.',
    icon: CreditCard,
  },
  {
    id: 'chauffeur',
    category: 'Services',
    question: 'Can I switch between self-drive and a private chauffeur?',
    answer:
      'Yes. You can reserve any vehicle as a pure self-drive experience or add an executive chauffeur for $180/day. Our chauffeurs are certified in defensive driving, dressed in tailored black-tie suits, and versed in diplomatic and corporate protocol.',
    icon: Sparkles,
  },
  {
    id: 'mileage',
    category: 'Travel Range',
    question: 'What is the daily mileage allowance and fuel policy?',
    answer:
      'All bookings include a generous 150 miles (250 km) per 24-hour cycle, which is cumulative across multi-day leases. Extended travel packages are available upon request. Your vehicle arrives with a 100% full fuel tank or battery charge, and you may return it at any fuel level with complimentary concierge refueling.',
    icon: HelpCircle,
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('insurance');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-neutral-950 text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-neutral-900 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Frequently Asked Questions
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Transparent Terms. No Ambiguity.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Everything you need to know regarding delivery protocol, zero-deductible insurance, and eligibility.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900/90 border-white/20 shadow-xl'
                    : 'bg-neutral-900/40 border-white/5 hover:border-white/10 hover:bg-neutral-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                        isOpen ? 'bg-white text-neutral-950' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        {faq.category}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mt-0.5 tracking-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 rounded-full bg-white/5 text-neutral-400 shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 ml-14">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center text-xs text-neutral-400"
        >
          Have a bespoke requirement or VIP diplomatic request?{' '}
          <a
            href="#contact"
            className="text-white underline underline-offset-4 hover:text-neutral-200 font-medium transition-colors"
          >
            Speak directly with our Chief Concierge.
          </a>
        </motion.div>
      </div>
    </section>
  );
};
