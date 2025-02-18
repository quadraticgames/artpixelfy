
import { useEffect, useRef } from "react";

interface PixelatedImageProps {
  src: string;
  pixelSize: number;
}

export const PixelatedImage = ({ src, pixelSize }: PixelatedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Calculate dimensions maintaining aspect ratio
      const aspectRatio = img.width / img.height;
      const targetSize = 512; // Fixed size for consistency
      let width = targetSize;
      let height = targetSize;

      if (aspectRatio > 1) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Draw original image
      ctx.drawImage(img, 0, 0, width, height);

      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw pixelated version
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          // Get the color of the first pixel in the block
          const red = data[((y * width + x) * 4)];
          const green = data[((y * width + x) * 4) + 1];
          const blue = data[((y * width + x) * 4) + 2];
          const alpha = data[((y * width + x) * 4) + 3];

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };
  }, [src, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain transition-all duration-300 ease-in-out"
    />
  );
};
