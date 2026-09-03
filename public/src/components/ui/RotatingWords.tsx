'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export type RotatingWordsProps = {
  words?: string[];
  interval?: number;
  /** gradient / color classes — Hero er gradient ekhane pass koro */
  className?: string;
};

export function RotatingWords({
  words = ['Retail', 'Distribution', 'Credit'],
  interval = 2600,
  className = '',
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => {
      clearInterval(id);
    };
  }, [words.length, interval]);

  return (
    // overflow-hidden mask — word ta box er baire gele dekha jay na,
    // tai "nich theke upore otha" effect ta porishkar ashe
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{
            y: '-110%',
            opacity: 0,
            transition: { ease: [0.55, 0, 0.85, 0.4], duration: 0.18 },
          }}
          transition={{
            // ei back-out easing tai bounce/overshoot toiri kore.
            // 1.56 baralle beshi bounce, 1.2 e soft bounce.
            y: { ease: [0.34, 1.56, 0.64, 1], duration: 0.65 },
            opacity: { duration: 0.25 },
          }}
          className={`inline-block whitespace-nowrap ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
