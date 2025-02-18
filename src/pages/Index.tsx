
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import { ImageUploader } from "@/components/ImageUploader";
import { PixelatedImage } from "@/components/PixelatedImage";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState([8]);
  const pixelatedRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8 font-pixel">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">Transform</span>
          <h1 className="text-4xl font-medium tracking-tight">Create Pixel Art</h1>
          <p className="text-gray-500">Upload an image and convert it into beautiful pixel art</p>
        </div>

        <Card className="p-8 bg-white/50 backdrop-blur-sm border border-gray-100">
          {!image ? (
            <ImageUploader onUpload={handleImageUpload} />
          ) : (
            <div className="space-y-6">
              <div ref={pixelatedRef} className="relative aspect-square w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
                <PixelatedImage src={image} pixelSize={pixelSize[0]} />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Pixel Size</label>
                  <Slider
                    value={pixelSize}
                    onValueChange={setPixelSize}
                    min={4}
                    max={32}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImage(null);
                      setPixelSize([8]);
                    }}
                  >
                    Upload New Image
                  </Button>
                  <Button onClick={handleDownload}>Download Pixel Art</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
