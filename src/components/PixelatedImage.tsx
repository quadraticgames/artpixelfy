import { useEffect, useRef, useState } from "react";
import { CLASSIC_PALETTES } from "@/lib/palettes";
import { LoadingSpinner } from "./LoadingSpinner";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
  paletteId?: string;
  onCanvasRender?: (canvas: HTMLCanvasElement) => void;
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
  paletteId = 'original',
  onCanvasRender
}: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

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

    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      // Use original image dimensions
      const targetWidth = img.width;
      const targetHeight = img.height;
      
      // Update aspect ratio
      setAspectRatio(targetHeight / targetWidth * 100);
      
      // Set canvas size to match original image
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Draw original image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Get image data for color processing
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      // Get palette colors
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

      // Put the processed image data back
      ctx.putImageData(imageData, 0, 0);

      // Create pixelated effect
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = targetWidth;
      tempCanvas.height = targetHeight;
      tempCtx.drawImage(canvas, 0, 0);
      
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      
      const numPixelsX = Math.floor(targetWidth / pixelSize);
      const numPixelsY = Math.floor(targetHeight / pixelSize);
      
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

      // Notify parent that canvas is ready
      if (onCanvasRender) {
        onCanvasRender(canvas);
      }

      setIsProcessing(false);
    };
  }, [src, pixelSize, paletteId, onCanvasRender]);

  return (
    <>
      {isProcessing && <LoadingSpinner />}
      <div style={{ width: '100%', paddingBottom: `${aspectRatio}%`, position: 'relative' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </>
  );
}
