import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Check, 
  Link as LinkIcon, 
  Smartphone,
  Sparkles,
  Camera,
  FolderOpen
} from 'lucide-react';

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (imageDataUrl: string) => void;
  label?: string;
  aspectRatioLabel?: string;
}

// Utility to safely compress and optimize images from device gallery/camera
const processFile = (file: File, maxWidth = 1280, maxHeight = 800, quality = 0.82): Promise<{ dataUrl: string; sizeKb: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const raw = event.target?.result as string;
          resolve({ dataUrl: raw, sizeKb: Math.round(file.size / 1024) });
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);
        resolve({ dataUrl, sizeKb });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageSelected,
  label = 'Featured Image',
  aspectRatioLabel = 'From your device gallery or photo library'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'url'>('gallery');
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileDetails, setFileDetails] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const result = await processFile(file);
      onImageSelected(result.dataUrl);
      setFileDetails(`${file.name} (~${result.sizeKb} KB)`);
    } catch (err) {
      console.error('Error processing gallery photo:', err);
      setErrorMessage('Failed to load image from device gallery. Please try another image.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageSelected(urlInput.trim());
      setFileDetails('Online Web Image');
      setUrlInput('');
    }
  };

  const handleRemoveImage = () => {
    onImageSelected('');
    setFileDetails(null);
  };

  return (
    <div className="space-y-3 bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200">
      {/* Label and Subtext */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
          {label}
        </label>
        <span className="text-[11px] text-slate-500 font-medium">
          {aspectRatioLabel}
        </span>
      </div>

      {/* Switcher: Device Gallery vs Web URL */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 w-fit text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Upload from Gallery / Device</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'url'
              ? 'bg-[#0B1B3D] text-amber-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Web URL Link</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <X className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden native File input for Device Gallery / Camera / Photo Library */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*, image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
      />

      {/* Current Image Preview */}
      {currentImage ? (
        <div className="space-y-2">
          <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/60 bg-slate-900 shadow-md max-h-56 group">
            <img
              src={currentImage}
              alt="Selected Preview"
              className="w-full h-48 sm:h-52 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Pick Another Photo</span>
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
              <span className="bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                Ready to Save
              </span>
              {fileDetails && (
                <span className="bg-slate-950/80 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">
                  {fileDetails}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Image loaded. Click 'Save' below to publish on front page.</span>
            </span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline text-[11px]"
            >
              Clear Image
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Gallery Upload Box */}
          {activeTab === 'gallery' && (
            <div
              onClick={() => !loading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                loading
                  ? 'border-amber-400 bg-amber-50/60'
                  : 'border-slate-300 hover:border-amber-500 hover:bg-amber-50/20 bg-white'
              }`}
            >
              {loading ? (
                <div className="py-4 space-y-2">
                  <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-amber-900">Processing image from your device gallery...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      Upload from Device Gallery
                    </span>
                    <span className="text-xs text-slate-500 block mt-1">
                      Tap here to open your phone gallery, photo library, camera, or file browser.
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#0B1B3D] text-amber-300 hover:text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 pointer-events-none shadow-xs"
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Choose from Device Gallery</span>
                  </button>
                  <p className="text-[10px] text-slate-400">
                    Supports JPG, PNG, WEBP (automatically optimized for fast web display)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Web URL Link Tab */}
          {activeTab === 'url' && (
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 block">
                Paste an Image URL
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 bg-[#0B1B3D] hover:bg-slate-800 text-amber-300 rounded-lg text-xs font-bold cursor-pointer shrink-0"
                >
                  Use URL
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
