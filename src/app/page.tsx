"use client";

import { useState, lazy, Suspense } from 'react';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';

const ShowData = lazy(() => import('@/components/ShowData'));
import ShowDataSkeleton from '@/components/ShowDataSkeleton';

import MiniCardSkeleton from '@/components/MiniCardSkeleton';
import ShowResume from '@/components/stats/ShowResume';
import TopUserPost from '@/components/stats/TopUserPost';
import ShowResumeSkeleton from '@/components/stats/ShowResumeSkeleton';
import TopUserSkeleton from '@/components/stats/TopUserSkeleton';
const MiniCard = lazy(() => import('@/components/MiniCard'));

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

  const customStyles: React.CSSProperties = {
    position: 'relative',
    '--radix-scroll-area-corner-width': '0px',
    '--radix-scroll-area-corner-height': '0px'
  } as React.CSSProperties;

  return (
    <div className='px-5 pt-10 pb-24 grid items-start gap-2.5'>
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
      <div className='relative overflow-hidden' style={customStyles}>
        <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]" style={{ overflow: 'auto' }}>
          <div style={{ minWidth: '100%', display: 'table' }}>
            <div className="flex space-x-4">

              <div className="space-y-3 w-[200px] rounded-[13px] shadow bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-900">
                <span data-state="closed">
                  <div className="overflow-hidden bg-gradient-to-r from-orange-400 to-pink-500 rounded-t-[12px] h-28 w-full">
                    <Image src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" alt="Sunset Beach Hotel" className="object-cover rounded-t-[12px]" width={640} height={640} />
                  </div>
                </span>
                <div className="space-y-1 text-sm px-4 pb-4">
                  <h3 className="text-base font-medium leading-none text-black dark:text-white">React Rendezvous</h3>
                  <p className="text-sm text-muted-foreground text-neutral-700 dark:text-neutral-400">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>

              <div className="space-y-3 w-[200px] rounded-[13px] shadow bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-900">
                <span data-state="closed">
                  <div className="overflow-hidden rounded-t-[12px] h-28 w-full animate-pulse">
                    <div className="flex items-center justify-center object-cover rounded-t-[12px] bg-gray-300 dark:bg-neutral-700 h-full w-full">
                      <svg className="w-10 h-10 text-gray-200 dark:text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                </span>
                <div className="space-y-2 text-sm px-4 pb-4">
                  <h3 className="text-base font-medium leading-none text-black dark:text-white animate-pulse bg-gray-300 dark:bg-neutral-700 h-4 w-3/4 rounded"></h3>
                  <p className="text-sm text-muted-foreground text-neutral-700 dark:text-neutral-400 animate-pulse bg-gray-300 dark:bg-neutral-700 h-2 w-4/5 rounded"></p>
                  <p className="text-sm text-muted-foreground text-neutral-700 dark:text-neutral-400 animate-pulse bg-gray-300 dark:bg-neutral-700 h-2 w-1/2 rounded"></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
