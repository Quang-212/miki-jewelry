import { motion, useScroll } from 'framer-motion';

export default function ScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed h-1 inset-0 bg-primary-2 origin-[0%] z-drawer"
    ></motion.div>
  );
}
