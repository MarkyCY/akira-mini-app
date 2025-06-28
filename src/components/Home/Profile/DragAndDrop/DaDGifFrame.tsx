import { useState, useEffect } from "react";
import { parseGIF, decompressFrames } from "gifuct-js";

export interface GifFrame {
  blob: Blob;
  delay: number; // in milliseconds
}

export function useGifFrames(gifUrl: string) {
  const [frames, setFrames] = useState<GifFrame[]>([]);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(gifUrl);
        const buffer = await resp.arrayBuffer();
        const gif = parseGIF(buffer);
        const decoded = decompressFrames(gif, true);

        let acc = 0;
        const frameBlobs: GifFrame[] = [];

        for (const f of decoded) {
          const { width, height } = f.dims;
          // Render frame patch on temporary canvas
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = width;
          tempCanvas.height = height;
          const ctx = tempCanvas.getContext("2d")!;
          const imageData = ctx.createImageData(width, height);
          imageData.data.set(f.patch);
          ctx.putImageData(imageData, 0, 0);

          // Convert to Blob
          const blob = await new Promise<Blob>((res) =>
            tempCanvas.toBlob((b) => res(b!), "image/png")
          );

          const delay = (f.delay || 10) * 10; // centiseconds to ms
          frameBlobs.push({ blob, delay });
          acc += delay;
        }

        setFrames(frameBlobs);
        setTotalDuration(acc);
      } catch (error) {
        console.error("Error decoding GIF:", error);
      }
    })();
  }, [gifUrl]);

  return { frames, totalDuration };
}
