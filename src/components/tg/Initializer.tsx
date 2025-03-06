'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const TelegramInitializer = () => {
  useEffect(() => {
    const initTelegram = async () => {
      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        WebApp.expand();
      }
    };

    initTelegram();
  }, []);

  return null;
};

export default dynamic(() => Promise.resolve(TelegramInitializer), {
  ssr: false
});