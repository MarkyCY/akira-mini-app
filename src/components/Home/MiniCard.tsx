import Image from 'next/image'

export default function MiniCard() {

  return (
    <a href="#" className="w-full h-[6.5rem] max-w-sm flex items-center py-2 pl-3 pr-2 bg-white shadow-md rounded-[13px] dark:bg-neutral-900 dark:border-neutral-900">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-800 rounded-[12px] flex items-center justify-center">
          <Image
            src="/potion.png"
            alt="Poción Verde"
            className="w-full h-full object-cover rounded-[12px]"
            width={640}
            height={640}
          />
        </div>
      </div>
      <div className="ml-4 my-3 flex-grow">
        <div className="text-lg font-semibold text-black dark:text-white">Poción Verde</div>
        <div className="text-sm leading-4 text-neutral-500 dark:text-neutral-400">
          Lorem ipsum dolor sit amet consectetur.
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
