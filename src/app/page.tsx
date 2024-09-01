"use client";

import { useState, lazy, Suspense } from 'react';
import WebApp from '@twa-dev/sdk';
const ShowData = lazy(() => import('./ShowData'));
import ShowDataSkeleton from './components/ShowDataSkeleton';

WebApp.ready();



export default function Home() {
  const [alertMessage, setAlertMessage] = useState('');

  const requestPhoneNumber = (el: HTMLElement) => {
    WebApp.requestContact((access: boolean, event?: { responseUnsafe?: { contact?: { phone_number?: string } } }) => {
      if (access) {
        setAlertMessage(`Phone number sent to the bot${event?.responseUnsafe?.contact?.phone_number ? ': ' + event.responseUnsafe.contact.phone_number : ''}`);
      } else {
        setAlertMessage('User declined this request');
      }
    });
  };

  const handleClick = () => {
    WebApp.showAlert("Hola Wapa")
    // WebApp.showPopup({
    //   title: 'Request Phone Number',
    //   message: 'Please share your phone number with the bot.',
    //   buttons: [
    //     { id: 'request', type: 'default', text: 'Request Phone Number' },
    //     { type: 'cancel' },
    //   ]
    // }, (buttonId) => {
    //   if (buttonId === 'request') {
    //     requestPhoneNumber(document.createElement('div')); // Puedes ajustar esto según tu lógica
    //   }
    // });
  };


  return (
    <>
      <div className='flex intems-center justify-center'>
        <div className='px-5 py-10'>
          <div className="card pb-5">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Otaku Senpai Mini App</h2>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleClick}>Ver Mensaje</button>
            {alertMessage && <span>{alertMessage}</span>}
          </div>
          {/*  */}
          <div>
            <h1>
              <Suspense fallback={<ShowDataSkeleton />}>
                <ShowData />
              </Suspense>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
