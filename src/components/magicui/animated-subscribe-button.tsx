import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import confetti from "canvas-confetti";
import Cookies from 'js-cookie';
import { SubscribeUser, UnsubscribeUser } from "@/components/Contest/suscriptionContest";
import WebApp from '@twa-dev/sdk';
import { useSession, signOut } from "next-auth/react";

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  contest_id: string;
  suscribeChange: () => void;
}

export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
  contest_id,
  suscribeChange,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Nuevo estado para carga

  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || "";

  useEffect(() => {
    setIsSubscribed(subscribeStatus);
  }, [subscribeStatus]);

  const buttonClasses = cn(
    "group relative w-full inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    isSubscribed ? "text-white dark:text-black outline outline-1 outline-black" : "text-white dark:text-black",
    "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
    "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
    "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]"
  );

  const handleClick = async () => {

    setIsLoading(true); // Iniciar loading

    try {
      if (isSubscribed) {
        const res = await UnsubscribeUser(token, contest_id);
        if (res.success) {
          setIsSubscribed(false);
          suscribeChange();
        } else if (res.status === 401) {
          signOut({ callbackUrl: '/' });
        } else if (typeof window !== 'undefined') {
          WebApp.showAlert("Error en la suscripción");
        }
      } else {
        const res = await SubscribeUser(token, contest_id);
        if (res.success) {
          setIsSubscribed(true);
          suscribeChange();

          const end = Date.now() + 3 * 1000; // 3 seconds
          const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

          const frame = () => {
            if (Date.now() > end) return;

            confetti({
              particleCount: 2,
              angle: 60,
              spread: 55,
              startVelocity: 60,
              origin: { x: 0, y: 0.5 },
              colors: colors,
            });
            confetti({
              particleCount: 2,
              angle: 120,
              spread: 55,
              startVelocity: 60,
              origin: { x: 1, y: 0.5 },
              colors: colors,
            });

            requestAnimationFrame(frame);
          };
          frame();
        } else if (res.status === 401) {
          signOut({ callbackUrl: '/' });
        } else if (typeof window !== 'undefined') {
          WebApp.showAlert("Error en la suscripción");
        }
      }
    } catch (error) {
      console.error("Error during subscription/unsubscription:", error);
    } finally {
      setIsLoading(false); // Finalizar loading
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.button
          key="loading"
          className={buttonClasses + " opacity-50 cursor-not-allowed"}
          disabled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Cargando...
        </motion.button>
      ) : isSubscribed ? (
        <motion.button
          key="subscribed"
          className={buttonClasses}
          onClick={() => (handleClick())}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="subscribedText"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          key="notSubscribed"
          className={buttonClasses}
          onClick={() => (handleClick())}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="notSubscribedText"
            className="relative block font-semibold"
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
