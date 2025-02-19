import { useEffect, useRef } from "react";
import { CLASSIC_PALETTES } from "@/lib/palettes";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
  useSameResolution?: boolean;
  paletteId?: string;
}

export function PixelatedImage({
  src,
  pixelSize,
  useSameResolution = false,
  paletteId = 'original'
}: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      // Calculate dimensions
      const aspectRatio = img.width / img.height;
      const targetWidth = useSameResolution ? img.width : 512;
      const targetHeight = useSameResolution ? img.height : Math.round(512 / aspectRatio);
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw original image
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Get image data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      // If using a palette other than original, quantize colors
      const palette = CLASSIC_PALETTES.find(p => p.id === paletteId);
      if (palette && palette.id !== 'original') {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Find the closest color in the palette
          const closestColor = findClosestColor([r, g, b], palette.colors);
          const [cr, cg, cb] = hexToRgb(closestColor);
          
          data[i] = cr;
          data[i + 1] = cg;
          data[i + 2] = cb;
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      // Create pixelated effect
      const pixelWidth = Math.floor(targetWidth / pixelSize);
      const pixelHeight = Math.floor(targetHeight / pixelSize);
      
      // Calculate actual pixel size to ensure uniform squares
      const actualPixelWidth = targetWidth / pixelWidth;
      const actualPixelHeight = targetHeight / pixelHeight;
      
      for (let y = 0; y < pixelHeight; y++) {
        for (let x = 0; x < pixelWidth; x++) {
          // Sample from the center of each pixel
          const sourceX = Math.floor((x + 0.5) * actualPixelWidth);
          const sourceY = Math.floor((y + 0.5) * actualPixelHeight);
          const sourceIndex = (sourceY * targetWidth + sourceX) * 4;
          
          const r = data[sourceIndex];
          const g = data[sourceIndex + 1];
          const b = data[sourceIndex + 2];
          const a = data[sourceIndex + 3];
          
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(
            x * actualPixelWidth,
            y * actualPixelHeight,
            actualPixelWidth,
            actualPixelHeight
          );
        }
      }
    };
  }, [src, pixelSize, useSameResolution, paletteId]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

// Helper function to find the closest color in a palette
function findClosestColor(rgb: [number, number, number], paletteColors: string[]): string {
  let minDistance = Infinity;
  let closestColor = paletteColors[0];

  for (const color of paletteColors) {
    const targetRgb = hexToRgb(color);
    const distance = Math.sqrt(
      Math.pow(rgb[0] - targetRgb[0], 2) +
      Math.pow(rgb[1] - targetRgb[1], 2) +
      Math.pow(rgb[2] - targetRgb[2], 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  return closestColor;
}
