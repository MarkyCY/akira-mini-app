'use client';
import { useState, useEffect } from 'react';

export default function Countdown({ Timestamp }: { Timestamp: number }) {
    const targetTimestamp = Timestamp * 1000; // Convertimos de segundos a milisegundos
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    // Función para calcular el tiempo restante
    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const difference = targetTimestamp - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 1) {
                return `${days} Días`;
            } else {
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            }
        }
        return "Cerrado";
    }

    // useEffect para actualizar el tiempo restante cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 60000); // Actualiza cada minuto

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return <div>{timeRemaining}</div>;
}