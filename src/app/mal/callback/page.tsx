"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function CallbackPage() {
  const searchParams = useSearchParams() as any;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<any | null>(null);

  const REDIRECT_URI = process.env.NEXT_PUBLIC_MAL_REDIRECT_URI || "";
  const CODE_VERIFIER = "a2j0jxp1qxnownj747efjuczpbn5qq9yjj556209oo0ab1uv1a715y9e080az22d4d1ed975iatxx7rv"; // Usa el mismo que enviaste

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (!code || !state) {
          setError("Código o estado no presente en la URL.");
          return;
        }

        const response = await fetch("/api/get-tokens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            codeVerifier: CODE_VERIFIER,
            redirectUri: REDIRECT_URI,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        setTokens(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error desconocido.");
        setLoading(false);
      }
    };

    fetchTokens();
  }, [REDIRECT_URI, searchParams]);

  if (error) {
    router.push('/');
    //return <p className="text-red-500">Error: {error}</p>;
  }

  if (loading) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  if (tokens) {
    Cookies.set('mal_token', tokens.access_token, { expires: 30 });
    Cookies.set('mal_refresh_token', tokens.refresh_token, { expires: 30 });
    router.push('/?group=perfil');
  }

  return (
    <div>
      <h1>Tokens obtenidos</h1>
    </div>
  );
}
