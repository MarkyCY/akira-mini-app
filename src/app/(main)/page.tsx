"use client";

import { useSearchParams } from 'next/navigation';
import Group from '@/components/Nav/GroupStats';
import ProfileStats from '@/components/Nav/ProfileStats';
// import SocialContent from '@/components/Nav/SocialContent';
import ShinyButton from '@/components/magicui/shiny-button';
import ShopContent from '@/components/Nav/ShopContent';

export default function Home() {
  const searchParams = useSearchParams() as any;
  const params = new URLSearchParams(searchParams);

  const startParam = params.get('tgWebAppStartParam');

  // Función para cambiar el componente basado en el parámetro de la URL
  const handleComponentChange = (componentName: string) => {
    if (componentName) {
      params.set('group', componentName);
      // Actualizamos la URL sin recargar la página
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }
  };

  if (startParam === 'perfil') {
    params.set('group', 'perfil');
    params.delete('tgWebAppStartParam');
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }

  // Función para determinar qué componente renderizar basado en el parámetro 'group'
  const getComponentByParam = () => {
    const group = params.get('group');
    switch (group) {
      case 'grupo':
        return <Group />;
      case 'perfil':
        return <ProfileStats />;
      // case 'social':
      //   return <SocialContent />;
      // case 'shop':
      //   return <ShopContent />;
      default:
        return <Group />;
    }
  };

  const currentGroup = params.get('group') || 'grupo';

  return (
    <>
      <div className="pb-3 flex gap-1">
        <div onClick={() => handleComponentChange('grupo')} className="cursor-pointer">
          <ShinyButton
            active={currentGroup === 'grupo' ? true : false}
            text="📊 Grupo"
            className={currentGroup === 'grupo' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
          />
        </div>
        <div onClick={() => handleComponentChange('perfil')} className="cursor-pointer">
          <ShinyButton
            active={currentGroup === 'perfil' ? true : false}
            text="👤 Perfil"
            className={currentGroup === 'perfil' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
          />
        </div>
        {/* <div onClick={() => handleComponentChange('social')} className="cursor-pointer">
          <ShinyButton
            active={currentGroup === 'social' ? true : false}
            text="📺 Social"
            className={currentGroup === 'social' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
          />
        </div> */}

        {/* <div onClick={() => handleComponentChange('shop')} className="cursor-pointer">
          <ShinyButton
            active={currentGroup === 'shop' ? true : false}
            text="🛒 Shop"
            className={currentGroup === 'shop' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
          />
        </div> */}
      </div >

      <div className="grid items-start gap-3">
        {getComponentByParam()}
      </div>
    </>
  );
}
