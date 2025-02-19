import { useEffect, useRef } from "react";
import { CLASSIC_PALETTES } from "@/lib/palettes";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
  useSameResolution?: boolean;
  paletteId?: string;
}

// Cache for color matching to avoid recalculating the same colors
const colorCache = new Map<string, string>();

// Helper function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

// More efficient color distance calculation using weighted RGB
function colorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  // Using weighted RGB components for better perceptual matching
  const rmean = (rgb1[0] + rgb2[0]) / 2;
  const r = rgb1[0] - rgb2[0];
  const g = rgb1[1] - rgb2[1];
  const b = rgb1[2] - rgb2[2];
  return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
}

// Optimized closest color finder with caching
function findClosestColor(rgb: [number, number, number], paletteColors: string[]): string {
  // Create a cache key
  const cacheKey = `${rgb[0]},${rgb[1]},${rgb[2]}`;
  
  // Check cache first
  const cached = colorCache.get(cacheKey);
  if (cached) return cached;
  
  let minDistance = Infinity;
  let closestColor = paletteColors[0];
  
  // Convert all palette colors to RGB once
  const paletteRgb = paletteColors.map(color => hexToRgb(color));
  
  for (let i = 0; i < paletteRgb.length; i++) {
    const distance = colorDistance(rgb, paletteRgb[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = paletteColors[i];
    }
  }
  
  // Cache the result
  colorCache.set(cacheKey, closestColor);
  
  return closestColor;
}

export function PixelatedImage({
  src,
  pixelSize,
  useSameResolution = false,
  paletteId = 'original'
}: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clear cache when component unmounts or when palette changes
  useEffect(() => {
    return () => {
      colorCache.clear();
    };
  }, [paletteId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      // Calculate dimensions to maintain aspect ratio
      const aspectRatio = img.width / img.height;
      const baseSize = 512; // Base size for scaling
      let targetWidth, targetHeight;
      
      if (useSameResolution) {
        targetWidth = img.width;
        targetHeight = img.height;
      } else {
        if (aspectRatio >= 1) {
          targetWidth = baseSize;
          targetHeight = Math.round(baseSize / aspectRatio);
        } else {
          targetHeight = baseSize;
          targetWidth = Math.round(baseSize * aspectRatio);
        }
      }

      // Calculate pixel dimensions
      const numPixelsX = Math.floor(targetWidth / pixelSize);
      const numPixelsY = Math.floor(targetHeight / pixelSize);
      
      // Adjust canvas size to match exact pixel grid
      canvas.width = numPixelsX * pixelSize;
      canvas.height = numPixelsY * pixelSize;
      
      // Set up crisp rendering
      ctx.imageSmoothingEnabled = false;
      
      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data for color processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Process colors if using a palette
      const palette = CLASSIC_PALETTES.find(p => p.id === paletteId);
      if (palette && palette.id !== 'original') {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const closestColor = findClosestColor([r, g, b], palette.colors);
          const [cr, cg, cb] = hexToRgb(closestColor);
          
          data[i] = cr;
          data[i + 1] = cg;
          data[i + 2] = cb;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Create pixelated effect
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < numPixelsY; y++) {
        for (let x = 0; x < numPixelsX; x++) {
          const sourceX = x * pixelSize;
          const sourceY = y * pixelSize;
          
          const pixelData = tempCtx.getImageData(sourceX, sourceY, 1, 1).data;
          
          ctx.fillStyle = `rgba(${pixelData[0]},${pixelData[1]},${pixelData[2]},${pixelData[3] / 255})`;
          ctx.fillRect(
            x * pixelSize,
            y * pixelSize,
            pixelSize,
            pixelSize
          );
        }
      }
    };
  }, [src, pixelSize, useSameResolution, paletteId]);

  return (
    <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
}
