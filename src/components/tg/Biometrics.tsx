// import WebApp from '@twa-dev/sdk';
// import { useState } from 'react';

// export default function Biometrics() {
//     const BiometricManager = WebApp.BiometricManager;
//     const [status, setStatus] = useState("Nada");
//     const [ info, setInfo] = useState("Nada");

//     BiometricManager.init(() => {
//         if (BiometricManager.isInited) {
//             console.log("BiometricManager initialized successfully");
//         }
//     });

//     (WebApp as any).onEvent("activated", ():void => {
//         setStatus("Activated");
//     });
//     (WebApp as any).onEvent("deactivated", () => {
//         setStatus("Deactivated");
//     });

//     const showPopupAllow = () => {
//         const params = {
//             title: "Acceso denegado a los datos biométricos",
//             message: "Por favor, permite el acceso a la autenticación biométrica para continuar.",
//             buttons: [
//                 { id: "ok", type: "default" as const, text: "Aceptar" },
//                 { id: "cancel", type: "default" as const, text: "Cancelar" },
//             ]
//         };

//         WebApp.showPopup(params, (buttonId?: string) => {
//             if (buttonId === "ok") {
//                 BiometricManager.openSettings();
//             }
//         });
//     }

//     const updateToken = async () => {
//         const token = "";

//         BiometricManager.updateBiometricToken(token, (success) => {
//             if (success) {
//                 setInfo("Token updated successfully");
//             } else {
//                 setInfo("Token update failed");
//             }
//         });
//     }

//     const authenticateUser = () => {
//         const params = {
//             reason: "Por favor verifique su identidad para continuar."
//         };

//         BiometricManager.authenticate(params, (success) => {
//             if (success) {
//                 console.log("User authenticated successfully");
//             } else {
//                 console.log("Authentication failed");
//             }
//         });
//     };

//     const requestAccess = () => {
//         const params = {
//             reason: "Necesitamos tu autenticación biometrica para continuar."
//         };
//         BiometricManager.requestAccess(params, (granted) => {
//             if (granted) {
//                 authenticateUser();
//             } else {
//                 showPopupAllow();
//             }
//         });
//     };


//     return (
//         <div>
//             <button onClick={requestAccess}>Request</button>
//             <button onClick={updateToken}>Update Token</button>
//             <p>Status: {status}</p>
//             <p>Info: {info}</p>
//         </div>
//     )
// }






