import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
  selectedImage?: File | null;
  onImageRemove?: () => void;
}

export const ImageUpload = ({ 
  onImageSelect, 
  isLoading = false, 
  selectedImage, 
  onImageRemove 
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      const file = files[0];
      onImageSelect(file);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      const file = files[0];
      onImageSelect(file);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, [onImageSelect]);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onImageRemove?.();
  }, [previewUrl, onImageRemove]);

  return (
    <Card className="p-8 transition-all duration-300 hover:shadow-card">
      {selectedImage || previewUrl ? (
        <div className="space-y-6">
          <div className="relative group">
            <img 
              src={previewUrl || (selectedImage ? URL.createObjectURL(selectedImage) : '')}
              alt="Selected potato leaf"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="upload"
              size="lg"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ImageIcon className="h-5 w-5" />
                  Analyze Disease
                </>
              )}
            </Button>
            
            <label className="flex-1">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <span>
                  <Upload className="h-5 w-5" />
                  Upload Different Image
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-12 text-center transition-all duration-300",
            isDragOver && "border-accent bg-accent/5 scale-105",
            "hover:border-accent hover:bg-accent/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center animate-float">
              <Upload className="h-8 w-8 text-accent" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Upload Potato Leaf Image
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop your potato leaf image here, or click to browse. 
                Our AI will analyze it for disease detection.
              </p>
            </div>
            
            <label>
              <Button variant="hero" size="lg" asChild>
                <span>
                  <ImageIcon className="h-5 w-5" />
                  Choose Image
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, WebP formats
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};