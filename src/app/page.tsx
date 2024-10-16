"use client";

import { useSearchParams } from 'next/navigation';
import Group from '@/components/Nav/GroupStats';
import ProfileStats from '@/components/Nav/ProfileStats';
import SocialContent from '@/components/Nav/SocialContent';
import ShinyButton from '@/components/magicui/shiny-button';

export default function Home() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // Función para cambiar el componente basado en el parámetro de la URL
  const handleComponentChange = (componentName: string) => {
    if (componentName) {
      params.set('group', componentName);
      // Actualizamos la URL sin recargar la página
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }
  };

  // Función para determinar qué componente renderizar basado en el parámetro 'group'
  const getComponentByParam = () => {
    const group = params.get('group');
    switch (group) {
      case 'grupo':
        return <Group />;
      case 'perfil':
        return <ProfileStats />;
      case 'social':
        return <SocialContent />;
      default:
        return <Group />;
    }
  };

  const currentGroup = params.get('group') || 'grupo';

  return (
    <>
      <div className="pl-5 pb-3 flex gap-3">
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
        <div onClick={() => handleComponentChange('social')} className="cursor-pointer">
          <ShinyButton
            active={currentGroup === 'social' ? true : false}
            text="📺 Social"
            className={currentGroup === 'social' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
          />
        </div>
      </div >

      <div className="px-5 grid items-start gap-2.5">
        {getComponentByParam()}
      </div>
    </>
  );
}
