import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";
import Image from "next/image";
import Cookies from "js-cookie";
// @ts-ignore
// import gifshot from 'gifshot';
import { getIconsPacks, Packs } from "../serverAction/getIconPack";
import { useSession } from "next-auth/react";
import { getCanvaJSON, postCanvaJSON } from "../serverAction/dragAndDropActios";

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

  useEffect(() => {
    // Limpiar el timeout anterior si existe
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Solo guardar si hay elementos
    if (perfilItems.length > 0 && token) {
      debounceTimeout.current = setTimeout(() => {
        Cookies.set("perfilItems", JSON.stringify(perfilItems));
        // Construir el objeto CanvaRequest
        const canvaRequest = {
          items: perfilItems,
          bgColor: bgColor || "#ffffff",
          bgImage: bgImage || null,
          canvas_width: perfilRef.current?.offsetWidth || 318,
          canvas_height: perfilRef.current?.offsetHeight || 158,
          scale: 3
        };
        setCanvaRequestJSON(JSON.stringify(canvaRequest, null, 2));

        fetchPostCanvaJSON(token, canvaRequest);
      }, 3000);
    }
    // Limpiar el timeout al desmontar o cambiar dependencias
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
    <div className="flex flex-col gap-2 p-2 w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
      <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Tarjeta Personalizable
      </h5>
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
              <div className="relative w-full h-full">
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
      <div className="relative flex gap-2">
        <button
          className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-100 w-full"
          onClick={() => setShowBackgroundMenu(!showBackgroundMenu)}
        >
          Cambiar Fondo
        </button>
        <button
          className="p-2 bg-neutral-200/10 border border-neutral-500/25 rounded-lg text-neutral-100 w-full"
          onClick={() => setShowIconsMenu(!showIconsMenu)}
        >
          Mostrar Iconos
        </button>

        {/* Menú de fondos */}
        {showBackgroundMenu && IconsPacks && (
          <div
            ref={backgroundMenuRef}
            className="absolute z-10 p-3 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-x-auto"
          >
            <div className="grid grid-flow-col grid-rows-2 auto-cols-max gap-2">
              {Object.entries(IconsPacks.packs).map(([pack, icons]) => {
                if (pack !== "background") return null;
                return icons.map((icon) => (
                  <div
                    key={icon}
                    className="relative w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setBgImage(`${API_URL}/icons/pack/${pack}/${icon}`);
                      setShowBackgroundMenu(false);
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
            ref={iconsMenuRef}
            className="absolute z-10 p-3 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {Object.entries(IconsPacks.packs).map(([pack, icons]) => {
                if (pack === "background") return null;
                return (
                  <div key={pack} className="flex flex-col gap-2">
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
                            onClick={() => {
                              if (isMaxed) return;

                              const rect = perfilRef.current?.getBoundingClientRect();
                              const id = Date.now().toString();
                              const x = Math.random() * ((rect?.width ?? 400) - DEFAULT_SIZE);
                              const y = Math.random() * ((rect?.height ?? 200) - DEFAULT_SIZE);

                              setPerfilItems((prev) => [
                                ...prev,
                                {
                                  id,
                                  src: `${API_URL}/icons/pack/${pack}/${icon}`,
                                  x,
                                  y,
                                  width: DEFAULT_SIZE,
                                  height: DEFAULT_SIZE,
                                  rotation: 0,
                                },
                              ]);
                            }}
                            className={`cursor-pointer ${isMaxed ? "opacity-30 pointer-events-none" : ""}`}
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
