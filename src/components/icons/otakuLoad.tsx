import { useEffect, useRef, useState } from "react";

interface ContinuousBeamSVGProps {
  size?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  beamRatio?: number; // Por ejemplo, 0.1 = 10% del total
  className?: string;
}

export default function OtakuLoadIcon({
  size = 100,
  strokeWidth = 5,
  duration = 4,
  color = "#ea527d",
  beamRatio = 0.4,
  className,
}: ContinuousBeamSVGProps) {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Definimos el camino de la línea
  const pathData = `M0 0 C2 0 2 0 4 1 C5 3 5 3 6 5 C13 18 29 26 42 33 C43 33 44 34 45 35 C58 42 71 49 85 55 C87 56 90 58 93 59 C126 75 183 102 221 91 C223 91 223 91 225 93 C228 96 228 100 229 104 C230 117 234 128 241 140 C242 141 243 142 243 143 C247 150 247 150 252 157 C253 157 255 157 256 157 C258 155 258 155 260 152 C261 151 261 151 261 150 C263 148 263 146 264 144 C264 143 265 142 265 142 C273 127 280 113 281 96 C281 94 281 94 283 91 C284 91 285 91 286 91 C316 95 345 85 373 75 C376 73 379 73 382 72 C398 66 413 59 428 52 C429 51 429 51 430 51 C461 36 461 36 489 18 C490 17 491 17 492 16 C497 11 500 6 503 0 C505 0 505 0 508 0 C510 3 510 4 510 9 C501 39 459 60 434 74 C420 82 406 89 392 96 C391 96 390 96 390 97 C380 102 370 106 359 110 C357 111 354 112 352 113 C329 122 329 122 317 123 C315 124 315 124 314 126 C313 127 313 127 313 129 C306 149 295 166 281 183 C271 194 264 207 259 221 C258 224 258 224 256 226 C253 226 253 226 251 226 C249 222 247 218 245 214 C239 200 231 188 221 176 C218 171 214 166 211 162 C210 160 209 158 208 157 C202 149 199 141 195 133 C193 128 193 128 190 125 C188 124 186 123 184 123 C183 122 181 122 180 122 C179 122 179 121 178 121 C147 113 117 97 88 82 C86 81 84 80 82 79 C75 75 69 72 63 68 C61 66 59 65 56 64 C42 55 30 45 17 35 C16 34 15 34 15 33 C8 27 -1 17 -2 8 C-2 2 -2 2 0 0 Z`;

  useEffect(() => {
    if (pathRef1.current && pathRef2.current) {
      const length = pathRef1.current.getTotalLength();
      setPathLength(length);
      const beamLength = length * beamRatio;
      const gapLength = length - beamLength;

      pathRef1.current.style.strokeDasharray = `${beamLength} ${gapLength}`;
      pathRef1.current.style.strokeDashoffset = "0";

      pathRef2.current.style.strokeDasharray = `${beamLength} ${gapLength}`;
      pathRef2.current.style.strokeDashoffset = `${-length / 2}`; // Segunda línea empieza a la mitad del recorrido
    }
  }, [size, beamRatio]);

  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="#fff" className={className}>
      <defs>
        <linearGradient id="beamGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="30%" stopColor={color} stopOpacity="0.5" />
          <stop offset="70%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Primera línea */}
      <path ref={pathRef1} d={pathData} fill="none" stroke="url(#beamGradient)" strokeWidth={strokeWidth}>
        <animate attributeName="stroke-dashoffset" from="0" to={pathLength} dur={`${duration}s`} repeatCount="indefinite" />
      </path>

      {/* Segunda línea con desplazamiento */}
      <path ref={pathRef2} d={pathData} fill="none" stroke="url(#beamGradient)" strokeWidth={strokeWidth}>
        <animate attributeName="stroke-dashoffset" from={-pathLength / 2} to={pathLength / 2} dur={`${duration}s`} repeatCount="indefinite" />
      </path>
    </svg>
  );
}
