import Image from 'next/image';
import SliderCard from './SliderCard';
import { Suspense } from 'react';
import SliderCardSkeleton from './SliderCardSkeleton';

const customStyles: React.CSSProperties = {
    position: 'relative',
    '--radix-scroll-area-corner-width': '0px',
    '--radix-scroll-area-corner-height': '0px'
} as React.CSSProperties;

export default function SliderContent() {

    return (
        <div className='relative overflow-hidden' style={customStyles}>
            <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]" style={{ overflow: 'auto' }}>
                <div style={{ minWidth: '100%', display: 'table' }}>
                    <div className="flex space-x-4 pb-3">
                        <Suspense fallback={<SliderCardSkeleton />}>
                            <SliderCard />
                            <SliderCard />
                            <SliderCard />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}