import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import Image from 'next/image';
import Cookies from "js-cookie";

import { driver } from "driver.js";
// @ts-ignore
import "driver.js/dist/driver.css";

import { useSession } from "next-auth/react";
import { searchAnimeFanart, getAnimeBackgroud, getAnimeIcon, FanartSearchResult } from "../serverAction/searchAnimeFanart";
import { getCanvaJSON, postCanvaJSON } from "../serverAction/dragAndDropActios";
import { useTheme } from "next-themes";
import SaveIcon from "@/components/icons/save";
import OtakuLoadIcon from "@/components/icons/otakuLoad";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { CldImage, getCldImageUrl } from 'next-cloudinary';

interface Item {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  title?: string;
  description?: string;
  isFixed?: boolean;
}

const DEFAULT_SIZE = 80;
const MAX_SIZE = DEFAULT_SIZE * 3;
const MIN_SIZE = 40;
const API_URL = process.env.NEXT_PUBLIC_S3_URL;

export default function DragAndDropPerfil() {
  const { theme } = useTheme()

  // Construyes la URL transformada
  const getCloudinaryUrl = (
    link: string,
    width: number = 600,
    height: number = 300
  ) => getCldImageUrl({
    src: link,
    width,
    height,
    deliveryType: "fetch",
  });

  // Definición de tutoriales disponibles
  const tutorialsConfig = {
    mainDriver: {
      id: 'mainDriver',
      createDriver: () => {
        return driver({
          showProgress: true,
          steps: [
            {
              popover: {
                title: 'Tarjetas de Perfil',
                description: 'A continuación, vamos a crear tu tarjeta de perfil personalizable. Puedes cambiar el fondo y agregar tus iconos favoritos en ella para lucir a tus amigos.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '#draw-card', popover: {
                title: 'Tarjeta',
                description: 'Esta es tu tarjeta de perfil, con la que podrás interactuar para personalizarla a tu gusto.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '#change-background', popover: {
                title: 'Botón de Cambio de Fondo',
                description: 'Este botón te permite cambiar el fondo de la tarjeta de perfil. Puedes elegir de una lista de fondos.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '#show-icons', popover: {
                title: 'Botón de seleción de Iconos',
                description: 'Este botón te permite seleccionar los iconos que quieras añadir a tu tarjeta de perfil. Puedes elegir de una lista larga de iconos y logos.',
                prevBtnText: 'Anterior',
                nextBtnText: 'Siguiente',
              }
            },
            {
              element: '.save-icon', popover: {
                title: 'Icono de Guardado',
                description: 'Este icono indica el estado de tu tarjeta de perfil. Si está brillando intermitentemente es porque está guardando y no es recomendado salir. Si está en verde está guardado y es seguro salir.',
                prevBtnText: 'Anterior',
                nextBtnText: 'Siguiente',
              }
            },
            {
              element: '#card-buttons', popover: {
                title: 'Sigamos con la guía',
                description: 'Abre cualquier menú para continuar con la explicación.',
                prevBtnText: 'Anterior',
                doneBtnText: 'Finalizar'
              }
            },
          ],
          onDestroyed: () => markTutorialAsViewed('mainDriver')
        });
      }
    },
    backgroundDriver: {
      id: 'backgroundDriver',
      createDriver: () => {
        return driver({
          showProgress: true,
          steps: [
            {
              element: '#background-list', popover: {
                title: 'Lista de fondos',
                description: 'Mira aquí tienes todos los fondos que puedes elegir para tu tarjeta de perfil.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '#background-list .background-img:nth-child(1)', popover: {
                title: 'Selecciona un fondo',
                description: 'Selecciona cualquier fondo que quieras tocando el que más te guste.',
                prevBtnText: 'Anterior',
                doneBtnText: 'Finalizar'
              }
            },
          ],
          onHighlightStarted: () => setIsDriverActive(true),
          onDeselected: () => setIsDriverActive(false),
          onDestroyed: () => {
            setIsDriverActive(false);
            markTutorialAsViewed('backgroundDriver');
          },
        });
      }
    },
    iconsDriver: {
      id: 'iconsDriver',
      createDriver: () => {
        return driver({
          showProgress: true,
          steps: [
            {
              element: '#icons-list-father', popover: {
                title: 'Lista de iconos',
                description: 'Estos son todos los iconos que puedes elegir para tu tarjeta de perfil, siempre estarán limitados aunque si eres premium será mayor el límite.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '#icons-list .pack-name:nth-child(1) .icon-img:nth-child(1)', popover: {
                title: 'Selecciona un icono',
                description: 'Selecciona un icono tocandolo y te enseño como manipularlo.',
                prevBtnText: 'Anterior',
                doneBtnText: 'Finalizar'
              }
            },
          ],
          onHighlightStarted: () => setIsDriverActive(true),
          onDeselected: () => setIsDriverActive(false),
          onDestroyed: () => {
            setIsDriverActive(false);
            markTutorialAsViewed('iconsDriver');
          }
        });
      }
    },
    dragIcnDriver: {
      id: 'dragIcnDriver',
      createDriver: () => {
        return driver({
          showProgress: true,
          steps: [
            {
              element: '.react-draggable .icon-dragger:nth-child(1)', popover: {
                title: 'Movimiento',
                description: 'Puedes mover el icono sosteniendolo y arrastrandolo hacia lo posición deseada.',
                nextBtnText: 'Siguiente',
                prevBtnText: 'Anterior',
              }
            },
            {
              element: '.react-draggable .icon-dragger:nth-child(1)', popover: {
                title: 'Eliminar',
                description: 'Para quitarlo basta con darle doble toque rápidamente.',
                prevBtnText: 'Anterior',
                doneBtnText: 'Finalizar'
              }
            },
          ],
          onHighlightStarted: () => setIsDriverActive(true),
          onDeselected: () => setIsDriverActive(false),
          onDestroyed: () => {
            setIsDriverActive(false);
            markTutorialAsViewed('dragIcnDriver');
          }
        });
      }
    }
  };

  // Función para verificar si un tutorial ya ha sido visto
  const isTutorialViewed = (tutorialId: string): boolean => {
    if (typeof window === 'undefined') return false;

    const viewedTutorials = localStorage.getItem('viewedTutorials');
    if (!viewedTutorials) return false;

    try {
      const parsed = JSON.parse(viewedTutorials);
      return parsed[tutorialId] === true;
    } catch (e) {
      return false;
    }
  };

  // Función para marcar un tutorial como visto
  const markTutorialAsViewed = (tutorialId: string) => {
    if (typeof window === 'undefined') return;

    const viewedTutorials = localStorage.getItem('viewedTutorials');
    let parsed = {};

    if (viewedTutorials) {
      try {
        parsed = JSON.parse(viewedTutorials);
      } catch (e) {
        parsed = {};
      }
    }

    parsed = { ...parsed, [tutorialId]: true };
    localStorage.setItem('viewedTutorials', JSON.stringify(parsed));
  };

  // Funciones para crear drivers dinámicamente cuando sean necesarios
  const createMainDriver = () => tutorialsConfig.mainDriver.createDriver();
  const createBackgroundDriver = () => tutorialsConfig.backgroundDriver.createDriver();
  const createIconsDriver = () => tutorialsConfig.iconsDriver.createDriver();
  const createDragIcn = () => tutorialsConfig.dragIcnDriver.createDriver();


  // Obtener token
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;

  // Variables de estado
  const [perfilItems, setPerfilItems] = useState<Item[]>([]);
  const [bgColor, setBgColor] = useState("#e0e0e0");
  const [bgImage, setBgImage] = useState("https://i.ibb.co/Qjcqy6wL/profile-background.jpg");
  const [canvaRequestJSON, setCanvaRequestJSON] = useState<string>("{}");
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [showIconsMenu, setShowIconsMenu] = useState(false);
  const [MAX_ITEMS, setMAX_ITEMS] = useState(5);
  const [isDriverActive, setIsDriverActive] = useState(false);
  const [tutorialsInitialized, setTutorialsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // Estados para búsqueda de anime
  const [searchQuery, setSearchQuery] = useState("");
  const [animeResults, setAnimeResults] = useState<FanartSearchResult[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<FanartSearchResult | null>(null);
  const [animeBackgrounds, setAnimeBackgrounds] = useState<{ id: string; link: string; width: number; height: number }[]>([]);
  const [animeIcons, setAnimeIcons] = useState<{ id: string; link: string; width: number; height: number }[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Variables para detección de doble toque en móviles
  const touchTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const lastTouchTime = useRef<{ [key: string]: number }>({});

  // Referencias para los menús
  const backgroundMenuRef = useRef<HTMLDivElement>(null);
  const iconsMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const perfilRef = useRef<HTMLDivElement>(null);

  const countBySrc = (src: string) => perfilItems.filter((item) => item.src === src).length;

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchAnime = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setAnimeResults([]);
      setShowSearchDropdown(false);
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchAnimeFanart(query);
        const filtered = results.filter((anime) => parseInt(anime.image_count) > 1);
        setAnimeResults(filtered);
        setShowSearchDropdown(filtered.length > 0);
      } catch (error) {
        console.error("Error searching anime:", error);
        setAnimeResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleSelectAnime = async (anime: FanartSearchResult) => {
    if (!anime.TVDB_ID) return;

    setSelectedAnime(anime);
    setSearchQuery(anime.title);
    setShowSearchDropdown(false);
    setShowBackgroundMenu(false);
    setShowIconsMenu(false);

    try {
      const [backgrounds, icons] = await Promise.all([
        getAnimeBackgroud(anime.TVDB_ID),
        getAnimeIcon(anime.TVDB_ID)
      ]);
      setAnimeBackgrounds(backgrounds);
      setAnimeIcons(icons);
    } catch (error) {
      console.error("Error fetching anime images:", error);
    }
  };

  const handleClearSearch = () => {
    setSelectedAnime(null);
    setSearchQuery("");
    setAnimeResults([]);
    setAnimeBackgrounds([]);
    setAnimeIcons([]);
    setShowBackgroundMenu(false);
    setShowIconsMenu(false);
  };

  const fetchCanvaJSON = async (token: string) => {
    const response = await getCanvaJSON(token)
    if (!response) return;
    setPerfilItems(response.items);
    // setBgColor(response.bgColor);
    setBgImage(response.bgImage);
    Cookies.set("perfilItems", JSON.stringify(response.items));
    setIsLoading(false)
  }

  // Efecto para manejar clics fuera de los menús
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Cerrar dropdown de búsqueda si está abierto y se hace clic fuera
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node) && showSearchDropdown) {
        setShowSearchDropdown(false);
      }

      // Cerrar menú de fondos si está abierto y se hace clic fuera
      if (backgroundMenuRef.current && !backgroundMenuRef.current.contains(event.target as Node) && showBackgroundMenu) {
        setShowBackgroundMenu(false);
      }

      // Cerrar menú de iconos si está abierto y se hace clic fuera
      if (iconsMenuRef.current && !iconsMenuRef.current.contains(event.target as Node) && showIconsMenu) {
        setShowIconsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as any);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [showBackgroundMenu, showIconsMenu, showSearchDropdown]);

  // Efecto para inicializar y mostrar tutoriales automáticamente
  useEffect(() => {
    if (!tutorialsInitialized && typeof window !== 'undefined') {
      setTutorialsInitialized(true);

      // Mostrar el tutorial principal automáticamente si no ha sido visto
      if (!isTutorialViewed('mainDriver')) {
        setTimeout(() => {
          const driverObj = createMainDriver();
          driverObj.drive();
        }, 1000); // Pequeño retraso para asegurar que la UI esté cargada
      }
    }
  }, [tutorialsInitialized]);

  useEffect(() => {
    const stored = Cookies.get("perfilItems");

    // Si esta el token procedemos a pedir los pack e iconos
    if (token) {
      fetchCanvaJSON(token)
    }

    if (stored) {

      const loadedItems = JSON.parse(stored);
      // Actualizamos los items fijos, si no existen en los datos cargados, se agregan.
      const fixedItems: Item[] = [
        // {
        //   id: "fixed-img",
        //   src: "/logro1.png",
        //   x: 20,
        //   y: 20,
        //   width: DEFAULT_SIZE,
        //   height: DEFAULT_SIZE,
        //   rotation: 0,
        //   isFixed: true,
        // },
        // {
        //   id: "fixed-text",
        //   src: "",
        //   x: 120,
        //   y: 20,
        //   width: 100,
        //   height: 0,
        //   rotation: 0,
        //   isFixed: true,
        // },
      ];

      const mergedItems = [
        ...fixedItems.filter((f) => !loadedItems.some((item: Item) => item.id === f.id)),
        ...loadedItems,
      ];
      setPerfilItems(mergedItems);
    } else {
      // Si no hay datos en la cookie, agregar los elementos fijos por defecto.
      const fixedItems: Item[] = [
        // {
        //   id: "fixed-img",
        //   src: "http://localhost:5000/icons/pack/black_white_red/black_white_red_AgADJEoAAj0XMEk.webp",
        //   x: 125,
        //   y: 125,
        //   width: 40,
        //   height: 40,
        //   rotation: 0,
        //   isFixed: false,
        // },
        // {
        //   id: "fixed-text",
        //   src: "",
        //   x: 120,
        //   y: 20,
        //   width: 100,
        //   height: 0,
        //   rotation: 0,
        //   isFixed: true,
        // },
      ];
      setPerfilItems(fixedItems);
    }
  }, [token]);

  const fetchPostCanvaJSON = async (token: string, data: any) => {
    const response = await postCanvaJSON(token, data)
    if (!response) return;
  }

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    // Limpiar el timeout anterior si existe

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (perfilItems.length > 0 && token) {
      setIsSaving(true);
      setSaved(false);
      debounceTimeout.current = setTimeout(() => {
        Cookies.set("perfilItems", JSON.stringify(perfilItems));
        const canvaRequest = {
          items: perfilItems,
          bgColor: bgColor || "#ffffff",
          bgImage: bgImage || null,
          canvas_width: perfilRef.current?.offsetWidth || 318,
          canvas_height: perfilRef.current?.offsetHeight || 158,
          scale: 2
        };
        setCanvaRequestJSON(JSON.stringify(canvaRequest, null, 2));
        fetchPostCanvaJSON(token, canvaRequest);
        setIsSaving(false);
        setSaved(true);
        // setTimeout(() => setSaved(false), 2000);
      }, 2000);
    }
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [perfilItems, bgColor, bgImage, token]);

  // const handleExport = async (type: 'png' | 'gif' = 'png') => {
  //   if (!perfilRef.current) return;

  //   if (type === 'png') {
  //     const canvas = await html2canvas(perfilRef.current, {
  //       scale: 4,
  //       useCORS: true,
  //     });
  //     const dataURL = canvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = dataURL;
  //     link.download = "perfil.png";
  //     link.click();
  //   } else {
  //     const frames: string[] = [];
  //     const fps = 10;
  //     const durationSec = 3;
  //     const frameCount = durationSec * fps;

  //     for (let i = 0; i < frameCount; i++) {
  //       const canvas = await html2canvas(perfilRef.current, {
  //         useCORS: true,
  //         scale: 2
  //       });
  //       frames.push(canvas.toDataURL('image/png'));
  //       await new Promise(r => setTimeout(r, 1000 / fps));
  //     }

  //     gifshot.createGIF({
  //       images: frames,
  //       gifWidth: perfilRef.current.offsetWidth,
  //       gifHeight: perfilRef.current.offsetHeight,
  //       interval: 1 / fps,
  //       numFrames: frames.length
  //     }, function (obj: any) {
  //       if (!obj.error) {
  //         const link = document.createElement('a');
  //         link.href = obj.image;
  //         link.download = 'perfil_anim.gif';
  //         link.click();
  //       }
  //     });
  //   }
  // };

  const eliminarItem = (id: string) => {
    setPerfilItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para manejar el doble toque en dispositivos móviles
  const handleTouchStart = (id: string, isFixed: boolean | undefined) => {
    if (isFixed) return;

    const now = new Date().getTime();
    const lastTime = lastTouchTime.current[id] || 0;

    // Si hay un toque previo y el intervalo es menor a 300ms, considerarlo como doble toque
    if (now - lastTime < 300) {
      eliminarItem(id);
      // Limpiar el timeout y el registro de tiempo
      if (touchTimeouts.current[id]) {
        clearTimeout(touchTimeouts.current[id]);
        delete touchTimeouts.current[id];
      }
      delete lastTouchTime.current[id];
    } else {
      // Registrar el tiempo del primer toque
      lastTouchTime.current[id] = now;

      // Limpiar el timeout anterior si existe
      if (touchTimeouts.current[id]) {
        clearTimeout(touchTimeouts.current[id]);
      }

      // Establecer un timeout para limpiar el registro después de 300ms
      touchTimeouts.current[id] = setTimeout(() => {
        delete lastTouchTime.current[id];
      }, 300);
    }
  };

  // const saveToCookie = () => {
  //   Cookies.set("perfilItems", JSON.stringify(perfilItems));
  // };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
      <div className="flex justify-between">
        <h5 className="text-base pb-3 font-semibold text-gray-900 md:text-xl dark:text-white">
          Tarjeta Personalizable
        </h5>
        <SaveIcon className={`${isSaving ? "animate-pulse text-neutral-200" : saved ? "text-emerald-400/70" : "text-neutral-400"} save-icon`} />
      </div>
      {/* <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Color de fondo:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Imagen de fondo:</label>
          <input
            type="text"
            value={bgImage}
            onChange={(e) => setBgImage(e.target.value)}
            placeholder="URL de imagen"
            className="border px-2 py-1 rounded"
          />
        </div>
      </div> */}

      {/* Los iconos ahora se muestran en el menú desplegable */}

      <div className="flex flex-col items-start gap-4">
        {isLoading ? (<div
          ref={perfilRef}
          className="relative border dark:border-neutral-800 touch-none w-full justify-center items-center"
          style={{
            aspectRatio: "2/1",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          {/* <OtakuLoadIcon color={theme === "dark" ? "#ea527d" : "#b50638"} className="absolute z-10 w-full h-full size-50 pt-10" /> */}
          <FlickeringGrid
            className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={2}
            color={theme === "dark" ? "#fff" : "#000"}
            maxOpacity={0.6}
            flickerChance={0.1}
          />
        </div>
        ) : (
          <div
            ref={perfilRef}
            className="relative border dark:border-neutral-800 touch-none w-full"
            id="draw-card"
            style={{
              aspectRatio: "2/1",
              backgroundImage: `url(${bgImage})`,
              backgroundColor: bgColor,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Imagen de Fondo */}
            <Image
              alt=""
              src={bgImage}
              fill
              unoptimized
            />
            {/* Iconos */}
            {perfilItems.map((item) => (
              <Rnd
                key={item.id}
                size={{ width: item.width, height: item.height }}
                position={{ x: item.x, y: item.y }}
                bounds="parent"
                lockAspectRatio
                enableResizing={
                  item.isFixed
                    ? false
                    : {
                      top: true,
                      right: true,
                      bottom: true,
                      left: true,
                      topRight: true,
                      bottomRight: true,
                      bottomLeft: true,
                      topLeft: true,
                    }
                }
                onDragStop={(_, d) => {
                  setPerfilItems((prev) =>
                    prev.map((el) =>
                      el.id === item.id ? { ...el, x: d.x, y: d.y } : el
                    )
                  );
                }}
                onResizeStop={(_, __, ref, ___, position) => {
                  const width = parseInt(ref.style.width);
                  const height = parseInt(ref.style.height);
                  setPerfilItems((prev) =>
                    prev.map((el) =>
                      el.id === item.id
                        ? {
                          ...el,
                          width: width,
                          height: height,
                          x: position.x,
                          y: position.y,
                        }
                        : el
                    )
                  );
                }}
                onDoubleClick={() => {
                  if (!item.isFixed) eliminarItem(item.id);
                }}
                onTouchStart={() => handleTouchStart(item.id, item.isFixed)}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: item.isFixed ? 2 : 3,
                }}
              >
                <div className="relative w-full h-full icon-dragger">
                  {item.src ? (
                    <Image
                      src={getCloudinaryUrl(item.src, 200, 100)}
                      unoptimized
                      width={item.width}
                      height={item.height}
                      alt="Icon"
                      className="object-contain pointer-events-none select-none touch-none p-0.5"
                    />
                  ) : (
                    <h3 className="flex text-center justify-center items-center text-xl text-white">Solen&apos;ya</h3>
                  )}
                </div>
              </Rnd>
            ))}
          </div>
        )}
        {/* <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => { handleExport('png') }}
        >
          Exportar Perfil
        </button> */}
        {/* 
        <button
          className="px-4 py-2 bg-red-500 text-white rounded mt-4"
          onClick={() => {
            // setPerfilItems([]);
            Cookies.remove("perfilItems");
          }}
        >
          Limpiar todo
        </button> */}
      </div>
      <div id="card-buttons" className="relative flex flex-col gap-2">
        {/* Input de búsqueda - solo visible cuando no hay anime seleccionado */}
        {!selectedAnime && (
          <div className="relative" ref={searchInputRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchAnime(e.target.value)}
              placeholder="Buscar anime..."
              className="w-full p-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-white"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
              </div>
            )}

            {/* Dropdown de resultados */}
            {showSearchDropdown && animeResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {animeResults.map((anime) => (
                  <div
                    key={anime.id}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => handleSelectAnime(anime)}
                  >
                    {/* {anime.poster && (
                      <Image
                        src={anime.poster}
                        alt={anime.title}
                        width={40}
                        height={60}
                        className="object-cover rounded"
                        unoptimized
                      />
                    )} */}
                    <span className="text-sm text-neutral-700 dark:text-neutral-200">{anime.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Botones Fondos e Iconos - visibles cuando hay anime seleccionado */}
        {selectedAnime && (
          <div className="flex gap-2">
            <button
              id="change-background"
              className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-700 dark:text-neutral-100 w-full"
              onClick={() => {
                setShowBackgroundMenu(!showBackgroundMenu)
                setShowIconsMenu(false)
              }}
            >
              Fondos
            </button>
            <button
              id="show-icons"
              className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-700 dark:text-neutral-100 w-full"
              onClick={() => {
                setShowIconsMenu(!showIconsMenu)
                setShowBackgroundMenu(false)
              }}
            >
              Iconos
            </button>
            <button
              onClick={handleClearSearch}
              className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-700 dark:text-neutral-100"
            >
              ×
            </button>
          </div>
        )}

        {/* Menú de fondos del anime */}
        {showBackgroundMenu && selectedAnime && animeBackgrounds.length > 0 && (
          <div
            id="background-menu"
            ref={backgroundMenuRef}
            className={`absolute ${isDriverActive ? 'z-50' : 'z-10'} p-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-x-auto`}
          >
            <div id="background-list" className="grid grid-flow-col grid-rows-2 auto-cols-max gap-2">
              {animeBackgrounds.map((bg) => (
                <div
                  key={bg.id}
                  className="relative w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity background-img"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBgImage(getCloudinaryUrl(bg.link));
                  }}
                >
                  <Image
                    src={getCloudinaryUrl(bg.link)}
                    alt={`background-${bg.id}`}
                    fill
                    unoptimized
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menú de iconos del anime */}
        {showIconsMenu && selectedAnime && animeIcons.length > 0 && (
          <div
            id="icons-list-father"
            ref={iconsMenuRef}
            className={`absolute ${isDriverActive ? 'z-50' : 'z-10'} p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto`}
          >
            <div id="icons-list" className="flex flex-wrap gap-2">
              {animeIcons.map((icon) => {
                const count = countBySrc(icon.link);
                const isMaxed = count >= 1 || perfilItems.length >= MAX_ITEMS;
                return (
                  <Image
                    key={icon.id}
                    src={getCloudinaryUrl(icon.link, 200, 100)}
                    width={130}
                    height={100}
                    alt={`icon-${icon.id}`}
                    unoptimized
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMaxed) return;

                      const rect = perfilRef.current?.getBoundingClientRect();
                      const id = Date.now().toString();
                      const x = Math.random() * ((rect?.width ?? 400) - DEFAULT_SIZE);
                      const y = Math.random() * ((rect?.height ?? 200) - DEFAULT_SIZE);

                      const maxWidth = 300;
                      const scale = icon.width > maxWidth ? maxWidth / icon.width : 1;
                      const newWidth = icon.width * scale;
                      const newHeight = icon.height * scale;

                      const newItem = {
                        id,
                        src: icon.link,
                        x: 0,
                        y: 0,
                        width: newWidth,
                        height: newHeight,
                        rotation: 0,
                      };

                      const newItems = [...perfilItems, newItem];
                      console.log("Agregando nuevo item:", newItem);
                      setPerfilItems(newItems);

                      if (!isTutorialViewed('dragIcnDriver')) {
                        setTimeout(() => {
                          const driverDrag = createDragIcn();
                          driverDrag.drive();
                        }, 100);
                      }
                    }}
                    className={`cursor-pointer rounded-md ${isMaxed ? "opacity-30 pointer-events-none" : ""} icon-img`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* <div className="mt-4 w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2">Datos del Perfil (JSON)</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-[300px] w-80">
          {perfilItemsJSON}
        </pre>
        <h2 className="text-lg font-semibold mb-2 mt-4">CanvaRequest (JSON)</h2>
        <pre className="bg-gray-100 text-black p-4 rounded overflow-auto text-sm max-h-[300px] w-80">
          {canvaRequestJSON}
        </pre>
      </div> */}
    </div>
  );
}
