import { useEffect, useRef } from "react";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
  useSameResolution: boolean;
}

export const PixelatedImage = ({ src, pixelSize, useSameResolution }: PixelatedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Use original image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Calculate target dimensions based on useSameResolution
      let targetWidth = img.width;
      let targetHeight = img.height;
      if (!useSameResolution) {
        // Scale down the image while maintaining aspect ratio
        const scale = Math.min(800 / img.width, 800 / img.height);
        targetWidth = Math.floor(img.width * scale);
        targetHeight = Math.floor(img.height * scale);
        
        // Update canvas size
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Draw original image at target size
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Get image data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      // Clear canvas
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      // Draw pixelated version
      for (let y = 0; y < targetHeight; y += pixelSize) {
        for (let x = 0; x < targetWidth; x += pixelSize) {
          // Get the color of the first pixel in the block
          const red = data[((y * targetWidth + x) * 4)];
          const green = data[((y * targetWidth + x) * 4) + 1];
          const blue = data[((y * targetWidth + x) * 4) + 2];
          const alpha = data[((y * targetWidth + x) * 4) + 3];

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };
  }, [src, pixelSize, useSameResolution]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain transition-all duration-300 ease-in-out"
    />
  );
};
