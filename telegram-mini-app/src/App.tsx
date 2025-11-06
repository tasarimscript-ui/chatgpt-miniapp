import { useState, useEffect, useCallback } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { ScoreBoard } from './components/ScoreBoard';
import { CoinButton } from './components/CoinButton';
import { FloatingCoin } from './components/FloatingCoin';
import { UpgradePanel } from './components/UpgradePanel';

interface FloatingCoinData {
  id: string;
  x: number;
  y: number;
  value: number;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  icon: string;
  type: 'click' | 'auto';
}

function App() {
  const { user, hapticFeedback } = useTelegram();
  
  // Game State
  const [coins, setCoins] = useState(0);
  const [coinsPerClick, setCoinsPerClick] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [level, setLevel] = useState(1);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoinData[]>([]);
  
  // Upgrades
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'click1',
      name: 'Güçlü Parmak',
      description: 'Tıklama başına +1 coin',
      cost: 10,
      level: 0,
      icon: '👆',
      type: 'click',
    },
    {
      id: 'click2',
      name: 'Altın Eldiven',
      description: 'Tıklama başına +5 coin',
      cost: 100,
      level: 0,
      icon: '🧤',
      type: 'click',
    },
    {
      id: 'auto1',
      name: 'Coin Robotu',
      description: 'Saniyede +1 coin',
      cost: 50,
      level: 0,
      icon: '🤖',
      type: 'auto',
    },
    {
      id: 'auto2',
      name: 'Coin Fabrikası',
      description: 'Saniyede +5 coin',
      cost: 500,
      level: 0,
      icon: '🏭',
      type: 'auto',
    },
    {
      id: 'auto3',
      name: 'Coin İmparatorluğu',
      description: 'Saniyede +20 coin',
      cost: 2000,
      level: 0,
      icon: '👑',
      type: 'auto',
    },
  ]);

  // Auto-generate coins
  useEffect(() => {
    if (coinsPerSecond > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + coinsPerSecond / 10);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [coinsPerSecond]);

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(coins / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      hapticFeedback('heavy');
    }
  }, [coins, level, hapticFeedback]);

  // Handle coin click
  const handleCoinClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    // Add coins
    setCoins(prev => prev + coinsPerClick);

    // Create floating coin animation
    const newFloatingCoin: FloatingCoinData = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      value: coinsPerClick,
    };

    setFloatingCoins(prev => [...prev, newFloatingCoin]);

    // Haptic feedback
    hapticFeedback('light');
  }, [coinsPerClick, hapticFeedback]);

  // Remove floating coin
  const removeFloatingCoin = useCallback((id: string) => {
    setFloatingCoins(prev => prev.filter(coin => coin.id !== id));
  }, []);

  // Handle upgrade
  const handleUpgrade = useCallback((upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || coins < upgrade.cost) return;

    // Deduct coins
    setCoins(prev => prev - upgrade.cost);

    // Update upgrade
    setUpgrades(prev => prev.map(u => {
      if (u.id === upgradeId) {
        const newLevel = u.level + 1;
        const newCost = Math.floor(u.cost * 1.5);

        // Update game stats
        if (u.type === 'click') {
          if (u.id === 'click1') setCoinsPerClick(prev => prev + 1);
          if (u.id === 'click2') setCoinsPerClick(prev => prev + 5);
        } else if (u.type === 'auto') {
          if (u.id === 'auto1') setCoinsPerSecond(prev => prev + 1);
          if (u.id === 'auto2') setCoinsPerSecond(prev => prev + 5);
          if (u.id === 'auto3') setCoinsPerSecond(prev => prev + 20);
        }

        return { ...u, level: newLevel, cost: newCost };
      }
      return u;
    }));

    // Haptic feedback
    hapticFeedback('medium');
  }, [upgrades, coins, hapticFeedback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-bg via-purple-900 to-telegram-bg overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto">
        {/* Score Board */}
        <ScoreBoard
          coins={coins}
          coinsPerClick={coinsPerClick}
          coinsPerSecond={coinsPerSecond}
          level={level}
          username={user?.username || user?.first_name}
        />

        {/* Coin Button */}
        <CoinButton onClick={handleCoinClick} />

        {/* Upgrade Panel */}
        <UpgradePanel
          upgrades={upgrades}
          coins={coins}
          onUpgrade={handleUpgrade}
        />
      </div>

      {/* Floating Coins */}
      {floatingCoins.map(coin => (
        <FloatingCoin
          key={coin.id}
          id={coin.id}
          x={coin.x}
          y={coin.y}
          value={coin.value}
          onComplete={removeFloatingCoin}
        />
      ))}
    </div>
  );
}

export default App;
