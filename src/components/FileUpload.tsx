import { Upload, FileCheck } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.toLowerCase().endsWith('.stl')) {
      setFileName(files[0].name);
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${isDragging ? 'scale-[1.02]' : ''}`}
      style={{
        borderColor: isDragging ? 'var(--color-accent)' : 'var(--color-border)',
        background: isDragging ? 'rgba(34,211,238,0.05)' : 'transparent',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" accept=".stl" onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      <div className="flex flex-col items-center gap-3">
        {fileName ? (
          <>
            <FileCheck className="w-10 h-10" style={{ color: 'var(--color-success)' }} />
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{fileName}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Click or drag to replace</p>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10" style={{ color: 'var(--color-text-muted)' }} />
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Drop your STL file here</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>or click to browse</p>
          </>
        )}
      </div>
    </div>
  );
};
