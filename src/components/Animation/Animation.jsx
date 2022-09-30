import { motion } from 'framer-motion';

export default function Animation({ scroll, gestures, variant, children, className }) {
  if (scroll) {
    return (
      <motion.div variants={variant} className={className}>
        {children}
      </motion.div>
    );
  }

  if (gestures) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
}
