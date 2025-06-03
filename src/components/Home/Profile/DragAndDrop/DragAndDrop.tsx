import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";
import Image from "next/image";
import Cookies from "js-cookie";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// @ts-ignore
// import gifshot from 'gifshot';
import { getIconsPacks, Packs } from "../serverAction/getIconPack";
import { useSession } from "next-auth/react";
import { getCanvaJSON, postCanvaJSON } from "../serverAction/dragAndDropActios";
import SaveIcon from "@/components/icons/save";

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
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DragAndDropPerfil() {

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
  const [IconsPacks, setIconsPacks] = useState<Packs>()
  const [canvaRequestJSON, setCanvaRequestJSON] = useState<string>("{}");
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
  const [showIconsMenu, setShowIconsMenu] = useState(false);
  const [MAX_ITEMS, setMAX_ITEMS] = useState(5);
  const [isDriverActive, setIsDriverActive] = useState(false);
  const [tutorialsInitialized, setTutorialsInitialized] = useState(false);

  // Variables para detección de doble toque en móviles
  const touchTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const lastTouchTime = useRef<{ [key: string]: number }>({});

  // Referencias para los menús
  const backgroundMenuRef = useRef<HTMLDivElement>(null);
  const iconsMenuRef = useRef<HTMLDivElement>(null);

  const perfilRef = useRef<HTMLDivElement>(null);

  const countBySrc = (src: string) => perfilItems.filter((item) => item.src === src).length;

  const fetchInconsPacks = async (token: string) => {
    const response = await getIconsPacks(token);
    setIconsPacks(response);
  }

  const fetchCanvaJSON = async (token: string) => {
    const response = await getCanvaJSON(token)
    if (!response) return;
    setPerfilItems(response.items);
    // setBgColor(response.bgColor);
    setBgImage(response.bgImage);
    Cookies.set("perfilItems", JSON.stringify(response.items));
  }

  // Efecto para manejar clics fuera de los menús
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
  }, [showBackgroundMenu, showIconsMenu]);

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
      fetchInconsPacks(token)
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
        <div
          ref={perfilRef}
          className="relative border border-gray-400 touch-none w-full"
          id="draw-card"
          style={{
            aspectRatio: "2/1",
            backgroundImage: `url(${bgImage})`,
            backgroundColor: bgColor,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image
            alt="cal"
            src={bgImage}
            fill />
          {perfilItems.map((item) => (
            <Rnd
              key={item.id}
              size={{ width: item.width, height: item.height }}
              position={{ x: item.x, y: item.y }}
              bounds="parent"
              lockAspectRatio
              minWidth={MIN_SIZE}
              minHeight={MIN_SIZE}
              maxWidth={MAX_SIZE}
              maxHeight={MAX_SIZE}
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
                // const width = parseInt(ref.style.width);
                // const height = parseInt(ref.style.height);
                const size = parseInt(ref.style.width);
                setPerfilItems((prev) =>
                  prev.map((el) =>
                    el.id === item.id
                      ? {
                        ...el,
                        width: size,
                        height: size,
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
                    src={item.src}
                    alt="elemento"
                    fill
                    className="object-contain pointer-events-none select-none touch-none p-0.5"
                  />
                ) : (
                  <h3 className="flex text-center justify-center items-center text-xl text-white">Solen&apos;ya</h3>
                )}
              </div>
            </Rnd>
          ))}
        </div>

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
      <div id="card-buttons" className="relative flex gap-2">
        <button
          id="change-background"
          className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-100 w-full"
          onClick={() => {
            setShowBackgroundMenu(!showBackgroundMenu)
            setTimeout(() => {
              if (!isTutorialViewed('backgroundDriver')) {
                const driverBck = createBackgroundDriver();
                driverBck.drive();
              }
            }, 100)
          }}
        >
          Cambiar Fondo
        </button>
        <button
          id="show-icons"
          className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-100 w-full"
          onClick={() => {
            setShowIconsMenu(!showIconsMenu)
            setTimeout(() => {
              if (!isTutorialViewed('iconsDriver')) {
                const driverIcn = createIconsDriver();
                driverIcn.drive();
              }
            }, 100)
          }}
        >
          Mostrar Iconos
        </button>

        {/* Menú de fondos */}
        {showBackgroundMenu && IconsPacks && (
          <div
            id="background-menu"
            ref={backgroundMenuRef}
            className={`absolute ${isDriverActive ? 'z-50' : 'z-10'} p-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-x-auto`}
          >
            <div id="background-list" className="grid grid-flow-col grid-rows-2 auto-cols-max gap-2">
              {Object.entries(IconsPacks.packs).map(([pack, icons]) => {
                if (pack !== "background") return null;
                return icons.map((icon) => (
                  <div
                    key={icon}
                    className="relative w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity background-img"
                    onClick={(e) => {
                      // Evitar que el evento se propague al documento
                      e.stopPropagation();
                      setBgImage(`${API_URL}/icons/pack/${pack}/${icon}`);
                      // Ya no cerramos el menú automáticamente para permitir seleccionar más fondos
                    }}
                  >
                    <Image
                      src={`${API_URL}/icons/pack/${pack}/${icon}`}
                      alt={icon}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ));
              })}
            </div>
          </div>
        )}

        {/* Menú de iconos */}
        {showIconsMenu && IconsPacks && (
          <div
            id="icons-list-father"
            ref={iconsMenuRef}
            className={`absolute ${isDriverActive ? 'z-50' : 'z-10'} p-3 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto`}
          >
            <div id="icons-list" className="flex flex-col gap-3">
              {Object.entries(IconsPacks.packs).map(([pack, icons]) => {
                if (pack === "background") return null;
                return (
                  <div key={pack} className="flex flex-col gap-2 pack-name">
                    <h3 className="text-white text-sm font-medium">{pack}</h3>
                    <div className="flex flex-wrap gap-2">
                      {icons.map((icon) => {
                        const count = countBySrc(`${API_URL}/icons/pack/${pack}/${icon}`);
                        const isMaxed = count >= 1 || perfilItems.length >= MAX_ITEMS;

                        return (
                          <Image
                            key={icon}
                            src={`${API_URL}/icons/pack/${pack}/${icon}`}
                            alt={icon}
                            width={30}
                            height={30}
                            onClick={(e) => {
                              // Evitar que el evento se propague al documento
                              e.stopPropagation();

                              if (isMaxed) return;

                              const rect = perfilRef.current?.getBoundingClientRect();
                              const id = Date.now().toString();
                              const x = Math.random() * ((rect?.width ?? 400) - DEFAULT_SIZE);
                              const y = Math.random() * ((rect?.height ?? 200) - DEFAULT_SIZE);

                              const newItem = {
                                id,
                                src: `${API_URL}/icons/pack/${pack}/${icon}`,
                                x,
                                y,
                                width: DEFAULT_SIZE,
                                height: DEFAULT_SIZE,
                                rotation: 0,
                              };

                              const newItems = [...perfilItems, newItem];
                              setPerfilItems(newItems);

                              // Ya no cerramos el menú automáticamente para permitir seleccionar más iconos

                              // Mostrar tutorial de arrastrar si es el primer icono y no se ha visto el tutorial
                              if (!isTutorialViewed('dragIcnDriver')) {
                                setTimeout(() => {
                                  const driverDrag = createDragIcn();
                                  driverDrag.drive();
                                }, 100);
                              }

                            }}
                            className={`cursor-pointer ${isMaxed ? "opacity-30 pointer-events-none" : ""} icon-img`}
                          />
                        );
                      })}
                    </div>
                  </div>
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
