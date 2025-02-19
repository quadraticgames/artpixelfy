import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";
import { PixelatedImage } from "@/components/PixelatedImage";
import { PaletteSelector } from "@/components/PaletteSelector";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState([8]);
  const [selectedPalette, setSelectedPalette] = useState('original');
  const [processedCanvas, setProcessedCanvas] = useState<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!processedCanvas) return;
    try {
      const dataUrl = processedCanvas.toDataURL('image/png');
      const link = document.createElement("a");
      link.download = "pixel-art.png";
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen p-7 font-pixel relative"
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite"
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-3.5rem)] justify-between">
        <div className="space-y-7">
          <div className="text-center space-y-1.5">
            <h1 className="text-4xl font-medium tracking-tight text-white">
              <a href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
                ArtPixelfy
              </a>
            </h1>
            <p className="text-white">Upload an image and convert it into beautiful pixel art</p>
          </div>

          {!image ? (
            <ImageUploader onUpload={handleImageUpload} />
          ) : (
            <div className="space-y-5">
              <div className="relative w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] border-2 border-white/20 bg-black/5">
                <PixelatedImage 
                  src={image} 
                  pixelSize={pixelSize[0]} 
                  paletteId={selectedPalette}
                  onCanvasRender={setProcessedCanvas}
                />
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm text-white">Pixel Size</label>
                  <Slider
                    value={pixelSize}
                    onValueChange={setPixelSize}
                    min={4}
                    max={32}
                    step={1}
                    className="w-full"
                  />
                </div>
                <PaletteSelector
                  selectedPalette={selectedPalette}
                  onSelectPalette={setSelectedPalette}
                />
                <div className="flex gap-3 justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <Button
                    variant="purple"
                    className="w-36 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110 hover:border-2 hover:border-white/40 active:scale-95"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload New Image
                  </Button>
                  <Button
                    variant="purple"
                    className="w-36 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110 hover:border-2 hover:border-white/40 active:scale-95"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-white text-sm opacity-50">Version 1.01</p>
            <a href="https://quadraticgames.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/images/quadratic-logo.png" alt="Quadratic Games Logo" className="h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
