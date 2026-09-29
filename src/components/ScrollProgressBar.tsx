import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out the progress bar movement with physics spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2.5px] bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        style={{
          scaleX,
          transformOrigin: '0%',
        }}
      />
    </div>
  );
};
