"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { answerChatJoinRequest } from "@/contexts/ServerActions";

type Props = {
    queryId: string;
};

export default function CaptchaButtons({ queryId }: Props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    const handlePress = async (result: "approve" | "decline" | "queue") => {
        setLoading(true);
        try {
            const response = await answerChatJoinRequest(queryId, result);
            if (response.ok) {
                setMessage("Solicitud procesada correctamente");
                setIsError(false);
            } else {
                setMessage(response.description || "Error al procesar la solicitud");
                setIsError(true);
            }
        } catch {
            setMessage("Error al conectar con el servidor");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
            <h1 className="text-xl font-bold text-foreground">Verificación</h1>
            <p className="text-sm text-muted-foreground text-center">
                Selecciona una opción para continuar
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button
                    variant="destructive"
                    size="lg"
                    disabled={loading || message !== null}
                    onClick={() => handlePress("decline")}
                    className="w-full"
                >
                    Soy un bot
                </Button>

                <Button
                    variant="default"
                    size="lg"
                    disabled={loading || message !== null}
                    onClick={() => handlePress("approve")}
                    className="w-full"
                >
                    No soy un bot
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    disabled={loading || message !== null}
                    onClick={() => handlePress("queue")}
                    className="w-full"
                >
                    Dejar elegir a los admins
                </Button>
            </div>

            {message && (
                <p className={`text-sm text-center mt-2 ${isError ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
