import { Check, Minus } from "lucide-react";
import { useId } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const items = [
  { value: "light", label: "Claro", image: "/ui-light.png" },
  { value: "dark", label: "Oscuro", image: "/ui-dark.png" },
  { value: "system", label: "Sistema", image: "/ui-system.png" },
];

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const id = useId();

  return (
    <fieldset className="space-y-4 max-w-[400px]">
      <legend className="text-sm font-medium leading-none text-foreground">
        Selecciona un tema
      </legend>
      <div className="flex gap-3">
        {items.map((item) => (
          <label
            key={`${id}-${item.value}`}
            htmlFor={`${id}-${item.value}`}
            className={`cursor-pointer ${theme === item.value ? "opacity-100" : "opacity-50"}`} // Resalta la opción seleccionada
          >
            <input
              type="radio"
              id={`${id}-${item.value}`}
              value={item.value}
              className="sr-only"
              onChange={() => setTheme(item.value)}
              checked={theme === item.value}
            />
            <Image
              src={item.image}
              alt={item.label}
              width={88}
              height={70}
              className={`rounded-lg border-2 transition-all ${
                theme === item.value ? "border-blue-500" : "border-transparent"
              }`} // Borde azul para la opción seleccionada
              unoptimized
            />
            <span className="group mt-2 flex items-center gap-1">
              {theme === item.value ? ( // Muestra el ícono correcto según el estado
                <Check size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Minus size={16} strokeWidth={2} aria-hidden="true" />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}