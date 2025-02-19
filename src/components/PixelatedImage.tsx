import { useEffect, useRef } from "react";
import { CLASSIC_PALETTES } from "@/lib/palettes";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
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
      // Use original image dimensions
      const targetWidth = img.width;
      const targetHeight = img.height;
      
      // Set canvas size to match original image
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Draw original image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;
      
      // Get palette colors
      const paletteColors = CLASSIC_PALETTES.find(p => p.id === paletteId)?.colors || [];
      
      // Process pixels
      for (let y = 0; y < targetHeight; y += pixelSize) {
        for (let x = 0; x < targetWidth; x += pixelSize) {
          // Sample the color from the center of each pixel block
          const centerX = Math.min(x + Math.floor(pixelSize / 2), targetWidth - 1);
          const centerY = Math.min(y + Math.floor(pixelSize / 2), targetHeight - 1);
          const centerIndex = (centerY * targetWidth + centerX) * 4;
          
          const r = data[centerIndex];
          const g = data[centerIndex + 1];
          const b = data[centerIndex + 2];
          
          // Find the closest color in the palette if a palette is selected
          let finalColor: string;
          if (paletteColors.length > 0) {
            finalColor = findClosestColor([r, g, b], paletteColors);
            const [pr, pg, pb] = hexToRgb(finalColor);
            
            // Fill the pixel block with the palette color
            for (let py = y; py < Math.min(y + pixelSize, targetHeight); py++) {
              for (let px = x; px < Math.min(x + pixelSize, targetWidth); px++) {
                const index = (py * targetWidth + px) * 4;
                data[index] = pr;
                data[index + 1] = pg;
                data[index + 2] = pb;
              }
            }
          } else {
            // If no palette is selected, just fill with the sampled color
            for (let py = y; py < Math.min(y + pixelSize, targetHeight); py++) {
              for (let px = x; px < Math.min(x + pixelSize, targetWidth); px++) {
                const index = (py * targetWidth + px) * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
              }
            }
          }
        }
      }
      
      // Put the processed image data back
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src, pixelSize, paletteId]);

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
