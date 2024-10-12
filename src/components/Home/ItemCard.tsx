import Image from 'next/image'

export default function ItemCard() {

  return (

    // <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
    <figure className="relative max-w-sm">
      <a href="#">
        <Image
          className="rounded-xl"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
          alt="image description"
          width={640}
          height={640}
        />
      </a>
      <h1 className="absolute top-0 left-6 z-10 flex items-center justify-center w-72 h-full text-white text-4xl font-black uppercase tracking-wide">
        Lorem ipsum dolor sit amet ipsum.
      </h1>
      <figcaption className="absolute flex items-center box-border h-20 pl-2 w-full rounded-b-xl bottom-0 text-lg text-white bg-gray-600/10 backdrop-blur-md">
        {/* <div className="size-12 bg-gradient-to-r from-amber-400/40 to-orange-800/40 rounded-[12px]"> */}
        <div className="size-14">
          <Image
            src="/potion.png"
            alt="Poción Verde"
            className="w-full h-full object-cover rounded-[12px]"
            width={640}
            height={640}
          />
        </div>
        <div className='ml-1 my-2 flex-grow'>
          <h1 className='text-base font-semibold text-white'>Poción Verde</h1>
          <h2 className='text-sm leading-4 text-neutral-100 dark:text-neutral-200'>
            Lorem ipsum dolor sit amet con...
          </h2>
        </div>
      </figcaption>
    </figure>

  )
}
