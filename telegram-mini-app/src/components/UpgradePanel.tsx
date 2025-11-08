import { motion } from 'framer-motion';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  icon: string;
  type: 'click' | 'auto';
}

interface UpgradePanelProps {
  upgrades: Upgrade[];
  coins: number;
  onUpgrade: (upgradeId: string) => void;
}

export const UpgradePanel = ({ upgrades, coins, onUpgrade }: UpgradePanelProps) => {
  return (
    <div className="w-full px-4 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-white text-2xl font-bold mb-4 text-center text-shadow">
          🚀 Yükseltmeler
        </h2>

        <div className="space-y-3">
          {upgrades.map((upgrade, index) => {
            const canAfford = coins >= upgrade.cost;
            
            return (
              <motion.button
                key={upgrade.id}
                onClick={() => canAfford && onUpgrade(upgrade.id)}
                disabled={!canAfford}
                className={`w-full glass rounded-2xl p-4 transition-all ${
                  canAfford
                    ? 'hover:bg-white/10 active:scale-95 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={canAfford ? { scale: 1.02 } : {}}
                whileTap={canAfford ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="text-5xl">{upgrade.icon}</div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">{upgrade.name}</h3>
                      <span className="text-telegram-hint text-sm">Lv.{upgrade.level}</span>
                    </div>
                    <p className="text-telegram-hint text-sm mb-2">{upgrade.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">💰 {upgrade.cost.toLocaleString()}</span>
                      {upgrade.type === 'click' && (
                        <span className="text-xs text-telegram-hint">• Tıklama Gücü</span>
                      )}
                      {upgrade.type === 'auto' && (
                        <span className="text-xs text-telegram-hint">• Otomatik Kazanç</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  {canAfford && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-white text-2xl"
                    >
                      →
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
