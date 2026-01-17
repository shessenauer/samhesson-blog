import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Add smooth spring animation to the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-living-green-500 dark:bg-living-green-400 origin-left z-50"
      style={{
        scaleX,
        boxShadow: '0 0 10px rgba(107, 127, 103, 0.5)'
      }}
    />
  );
}
