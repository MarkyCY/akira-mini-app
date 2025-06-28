"use client";

import BlurFade from "../../../magicui/blur-fade";

function generateCodeVerifier() {
  return [...Array(80)]
    .map(() => Math.random().toString(36)[2])
    .join('');
}

const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_MAL_REDIRECT_URI || "";
const AUTH_URL = "https://myanimelist.net/v1/oauth2/authorize";
const STATE = "akira-mini-apps";
const codeVerifier = "a2j0jxp1qxnownj747efjuczpbn5qq9yjj556209oo0ab1uv1a715y9e080az22d4d1ed975iatxx7rv"; // Mismo que se usará en el servidor

export default function LoginAnimeList() {
  const loginWithMyAnimeList = () => {
    const authUrl = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${STATE}&code_challenge=${codeVerifier}&code_challenge_method=plain`;

    // Redirige al usuario
    window.location.href = authUrl;
  };

  return (
    <BlurFade delay={0} duration={0.50} inView className="w-full h-auto max-w-sm flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
      <h1 className="text-xl font-bold pb-5">Iniciar Sesión en MyAnimeList</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loginWithMyAnimeList}>
        Iniciar Sesión
      </button>
    </BlurFade>
  );
}
