import React from 'react';
import { motion, useScroll } from 'framer-motion';

export default function Test() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed, h-2 top-0 left-0 right-0 bg-pink-600 origin-[0%]"
    ></motion.div>
  );
}
