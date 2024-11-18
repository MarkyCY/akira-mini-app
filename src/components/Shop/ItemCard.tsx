import Image from 'next/image'

export default function ItemCard() {

  return (

    // <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
    <figure className="relative shadow-md">
      <a href="#">
        <Image
          className="rounded-xl"
          src="/mistic_green_forest.webp"
          alt="image description"
          width={640}
          height={640}
          unoptimized
        />
      </a>
      <h1 className="absolute top-0 left-6 z-10 flex items-center justify-center w-72 h-full text-white text-4xl font-black uppercase tracking-wide">
        Si lees esto eres super gei pero no mas que slime.
      </h1>
      <figcaption className="absolute flex items-center box-border h-20 pl-2 w-full rounded-b-xl bottom-0 text-lg text-white bg-neutral-300/5 dark:bg-neutral-600/10 backdrop-blur-sm">
        {/* <div className="size-12 bg-gradient-to-r from-amber-400/40 to-orange-800/40 rounded-[12px]"> */}
        <div className="size-14">
          <Image
            src="/potion7.webp"
            alt="Poción Verde"
            className="w-full h-full object-cover rounded-[12px]"
            width={640}
            height={640}
            unoptimized
          />
        </div>
        <div className='ml-2 flex-grow'>
          <h1 className='text-base font-semibold text-white'>Poción Oscura</h1>
          <h2 className='text-sm leading-4 text-neutral-100 dark:text-neutral-200'>
            Puedes ver el camino que han seguido...
          </h2>
        </div>
        <div className="w-32 text-center">
        <div className="text-sm text-neutral-300 dark:text-neutral-400">Reutil.</div>
        <div className="text-xl font-bold text-white dark:text-white">4 V/D</div>
        <div className="text-xs text-neutral-300 dark:text-neutral-400">30 días</div>
      </div>
      </figcaption>
    </figure>

  )
}
