import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingCoinProps {
  x: number;
  y: number;
  value: number;
  id: string;
  onComplete: (id: string) => void;
}

export const FloatingCoin = ({ x, y, value, id, onComplete }: FloatingCoinProps) => {
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRemove(true);
      onComplete(id);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, onComplete]);

  if (shouldRemove) return null;

  return (
    <motion.div
      initial={{ opacity: 1, x, y, scale: 1 }}
      animate={{
        opacity: 0,
        y: y - 100,
        scale: 1.5,
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      <span className="text-3xl font-bold text-yellow-400 drop-shadow-lg text-shadow">
        +{value}
      </span>
    </motion.div>
  );
};
