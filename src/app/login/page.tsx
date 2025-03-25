"use client";
import React, { useState, useEffect } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import WebApp from '@twa-dev/sdk';
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loading";

const LoginPage: React.FC = () => {
    const [clientid, setClientid] = useState<number>();

    const [step, setStep] = useState(0);
    const [mesg, setMsg] = useState('Intentando iniciar sesión...');
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setStep(1);
        if (typeof window !== "undefined") {
            WebApp.ready();
            const params = new URLSearchParams(WebApp.initData);
            const userData = decodeURIComponent(params.get('user') || '');
            const user = JSON.parse(userData);

            if (!user.username) {
                setMsg('No tienes nombre de usuario');
                return;
            }
            setClientid(user.id);

            // setClientid(873919300);

            const handleComplete = async (clientid: number) => {
              setStep(2);
              try {
                const result = await signIn("credentials", {
                  userid: clientid,
                  redirect: false, // Evita la redirección automática
                });
            
                if (result?.error && result?.status != 200) {
                  setError(true);
                  setMsg("¡Inicio de sesión fallido!");
                } else {
                  setMsg("¡Inicio de sesión exitoso!");
                  setStep(3); // 3️⃣ Autenticación exitosa, redirigiendo...
                  window.location.replace("/");
                }
              } catch (error) {
                setError(true);
                setMsg("Ocurrió un error durante la autenticación.");
              }
            }

            if (clientid) {
                handleComplete(clientid)
            }
        };
    }, [clientid, router]);
    

  const loadingStates = [
    { text: "Conectando con Telegram..." },
    { text: "Obteniendo datos del usuario..." },
    { text: "Autenticando en la API..." },
    { text: "¡Inicio de sesión exitoso! Redirigiendo..." },
  ];

  return (
    <div className="fixed flex flex-col space-y-3 inset-x-0 bottom-12 items-center justify-center h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[150px] h-[150px] pb-5 text-neutral-100 dark:text-white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z" />
      </svg>
      <p className="dark:text-white">{mesg}</p>
      <Loader loadingStates={loadingStates} loading={true} value={step} error_msg={mesg} error={error} />
    </div>
  );
};

export default LoginPage;



// "use client";

// import { signIn } from "next-auth/react";

// export default function Login() {

//   return (
//     <div>
//       <button onClick={async () => await signIn("credentials", {
//       userid: 873919300,
//       redirectTo: "/",
//     })}>Iniciar sesión como Calvo</button>
//     </div>
//   );
// }

