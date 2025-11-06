import { motion } from 'framer-motion';

interface ScoreBoardProps {
  coins: number;
  coinsPerClick: number;
  coinsPerSecond: number;
  level: number;
  username?: string;
}

export const ScoreBoard = ({ coins, coinsPerClick, coinsPerSecond, level, username }: ScoreBoardProps) => {
  return (
    <div className="w-full px-4 py-6">
      {/* Kullanıcı Bilgisi */}
      {username && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <p className="text-telegram-hint text-sm">Hoş geldin,</p>
          <p className="text-white text-xl font-bold text-shadow">@{username}</p>
        </motion.div>
      )}

      {/* Ana Skor */}
      <motion.div
        className="glass rounded-3xl p-6 mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center">
          <p className="text-telegram-hint text-sm mb-2">Toplam Coin</p>
          <motion.div
            key={coins}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-5xl">💰</span>
            <span className="text-4xl font-bold text-white text-shadow">
              {Math.floor(coins).toLocaleString()}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="glass rounded-2xl p-4 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-telegram-hint text-xs mb-1">Seviye</p>
          <p className="text-2xl font-bold text-white">⭐ {level}</p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-telegram-hint text-xs mb-1">Tıklama</p>
          <p className="text-2xl font-bold text-yellow-400">+{coinsPerClick}</p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-4 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-telegram-hint text-xs mb-1">Otomatik</p>
          <p className="text-2xl font-bold text-green-400">+{coinsPerSecond}/s</p>
        </motion.div>
      </div>
    </div>
  );
};
