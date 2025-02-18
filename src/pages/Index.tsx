import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import { ImageUploader } from "@/components/ImageUploader";
import { PixelatedImage } from "@/components/PixelatedImage";
import { PaletteSelector } from "@/components/PaletteSelector";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState([8]);
  const [useSameResolution, setUseSameResolution] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState('original');
  const pixelatedRef = useRef<HTMLDivElement>(null);
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
    if (!pixelatedRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(pixelatedRef.current);
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
    <div className="min-h-screen p-7 font-pixel"
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite"
      }}
    >
      <div className="max-w-4xl mx-auto space-y-7">
        <div className="text-center space-y-1.5">
          <h1 className="text-4xl font-medium tracking-tight text-white">
            <a href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              Create Pixel Art
            </a>
          </h1>
          <p className="text-white">Upload an image and convert it into beautiful pixel art</p>
        </div>

        {!image ? (
          <ImageUploader onUpload={handleImageUpload} />
        ) : (
          <div className="space-y-5">
            <div ref={pixelatedRef} className="relative aspect-square w-full max-w-xl mx-auto rounded-lg overflow-hidden">
              <PixelatedImage 
                src={image} 
                pixelSize={pixelSize[0]} 
                useSameResolution={useSameResolution}
                paletteId={selectedPalette}
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
              <div className="flex items-center space-x-1.5">
                <input
                  type="checkbox"
                  id="resolutionCheckbox"
                  checked={useSameResolution}
                  onChange={(e) => setUseSameResolution(e.target.checked)}
                />
                <label htmlFor="resolutionCheckbox" className="text-sm text-white">
                  Use same resolution as source image
                </label>
              </div>
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
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  Upload New Image
                </Button>
                <Button onClick={handleDownload} className="gradient-button">Download Pixel Art</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
