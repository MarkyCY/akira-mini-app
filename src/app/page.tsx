"use client";

import { useState, lazy, Suspense } from 'react';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';

const ShowData = lazy(() => import('@/components/Home/ShowData'));
import ShowDataSkeleton from '@/components/Home/ShowDataSkeleton';

import MiniCardSkeleton from '@/components/Home/MiniCardSkeleton';
import ShowResume from '@/components/stats/ShowResume';
import TopUserPost from '@/components/stats/TopUserPost';
import ShowResumeSkeleton from '@/components/stats/ShowResumeSkeleton';
import TopUserSkeleton from '@/components/stats/TopUserSkeleton';
import SliderContent from '@/components/Home/SliderContent';
import SliderContentSkeleton from '@/components/Home/SliderContentSkeleton';
const MiniCard = lazy(() => import('@/components/Home/MiniCard'));

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
    <div className='px-5 pb-24 grid items-start gap-2.5'>
      {/* <div className="w-full max-w-sm p-3 bg-white border border-gray-200 rounded-[13px] shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
        <h2 className="mb-3 text-2xl tracking-tight text-gray-900 dark:text-white">Otaku Senpai Mini App</h2>
        <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800" onClick={handleClick}>Ver Mensaje</button>
        {alertMessage && <span>{alertMessage}</span>}
      </div> */}
      <Suspense fallback={<ShowResumeSkeleton />}>
        <ShowResume />
      </Suspense>
      {/*  */}
      <Suspense fallback={<TopUserSkeleton />}>
        <TopUserPost />
      </Suspense>
      {/*  */}
      <Suspense fallback={<ShowDataSkeleton />}>
        <ShowData />

      </Suspense>
      {/*  */}
      <Suspense fallback={<MiniCardSkeleton />}>
        <MiniCard />
      </Suspense>
      {/*  */}
      <Suspense fallback={<SliderContentSkeleton />}>
        <SliderContent />
        <SliderContentSkeleton />
      </Suspense>
    </div>
  );
}
