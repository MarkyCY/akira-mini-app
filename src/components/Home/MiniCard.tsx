import Image from 'next/image'

export default function MiniCard() {

  return (
    <a href="#" className="h-[6.5rem] flex items-center py-2 pl-3 pr-2 bg-white shadow-md rounded-[13px] dark:bg-neutral-900 dark:border-neutral-900">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-gradient-to-r from-red-400/10 to-rose-800/10 rounded-[12px] flex items-center justify-center">
          <Image
            src="/potion6.png"
            alt="Poción Verde"
            className="w-full h-full object-cover rounded-[12px]"
            width={640}
            height={640}
            unoptimized
          />
        </div>
      </div>
      <div className="ml-4 my-3 flex-grow">
        <div className="text-lg font-semibold text-black dark:text-white">Poción Musical</div>
        <div className="text-sm leading-4 text-neutral-500 dark:text-neutral-400">
          Te da la oportunidad de reproducir música...
        </div>
      </div>
      <div className="w-32 text-center">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">Puntos</div>
        <div className="text-xl font-bold text-black dark:text-white">200</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">por 1 día</div>
      </div>
    </a>
  )
}
