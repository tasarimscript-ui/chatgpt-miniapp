import { motion } from 'framer-motion';
import { useState } from 'react';

interface CoinButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CoinButton = ({ onClick }: CoinButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    onClick(e);
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <div className="flex items-center justify-center py-8">
      <motion.button
        onClick={handleClick}
        className="relative focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isPressed ? 0.9 : 1,
          rotate: isPressed ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0) 70%)',
          }}
        />

        {/* Coin */}
        <motion.div
          className="relative w-48 h-48 rounded-full gradient-gold shadow-2xl flex items-center justify-center border-4 border-yellow-600"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Inner Circle */}
          <div className="absolute inset-4 rounded-full border-4 border-yellow-600 opacity-30" />
          
          {/* Coin Symbol */}
          <span className="text-8xl drop-shadow-lg">💎</span>
          
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Tap Text */}
        <motion.p
          className="text-white text-lg font-bold mt-4 text-center text-shadow"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Tıkla! 👆
        </motion.p>
      </motion.button>
    </div>
  );
};
