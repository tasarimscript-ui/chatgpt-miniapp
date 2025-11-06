import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Telegram Web App'i başlat
    WebApp.ready();
    WebApp.expand();
    
    // Kullanıcı bilgilerini al
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user as TelegramUser);
    }
    
    setIsReady(true);

    // Arka plan rengini ayarla
    WebApp.setBackgroundColor('#17212b');
    WebApp.setHeaderColor('#17212b');
  }, []);

  const hapticFeedback = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    if (WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred(style);
    }
  };

  const showAlert = (message: string) => {
    WebApp.showAlert(message);
  };

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    WebApp.showConfirm(message, callback);
  };

  return {
    user,
    isReady,
    hapticFeedback,
    showAlert,
    showConfirm,
    webApp: WebApp,
  };
};
