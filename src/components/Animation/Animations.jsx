import { motion } from 'framer-motion';

export default function Animation({ variant, children, className }) {
  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  );
}
