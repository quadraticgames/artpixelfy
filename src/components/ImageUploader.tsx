
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative aspect-square w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed transition-all duration-200 ease-in-out cursor-pointer",
        "hover:bg-gray-50 hover:border-gray-300",
        isDragging ? "border-gray-400 bg-gray-50" : "border-gray-200",
      )}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-gray-600 mb-2">Drag and drop your image here</p>
        <p className="text-sm text-gray-400">or click to browse</p>
      </div>
    </div>
  );
};
