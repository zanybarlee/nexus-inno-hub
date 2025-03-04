
import { useState, useRef } from 'react';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';

interface UploadBoxProps {
  onFilesAdded: (files: File[]) => void;
}

const UploadBox = ({ onFilesAdded }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };
  
  const handleFiles = (newFiles: File[]) => {
    // Validate file types
    const validFiles = newFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      // Assuming BIM files have extensions like .rvt, .ifc, etc.
      return ['rvt', 'ifc', 'nwd', 'nwc', 'dwg'].includes(extension || '');
    });
    
    if (validFiles.length !== newFiles.length) {
      setErrorMessage('Some files were rejected. Only BIM model formats are accepted.');
    } else {
      setErrorMessage('');
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      onFilesAdded(validFiles);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const simulateUpload = () => {
    if (files.length === 0) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      
      // Reset after showing success message
      setTimeout(() => {
        setFiles([]);
        setUploadStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="w-full">
      {/* Upload Box */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-medium">
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload BIM Model'}
          </h3>
          
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Drag and drop your BIM files here, or click to browse
          </p>
          
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            accept=".rvt,.ifc,.nwd,.nwc,.dwg"
          />
          
          {uploadStatus === 'idle' && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
            >
              Browse Files
            </button>
          )}
          
          {uploadStatus === 'uploading' && (
            <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse"></div>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-2" />
              <span>Upload Complete!</span>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Upload Failed</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive flex items-start">
          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      
      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Selected Files</h4>
            {uploadStatus === 'idle' && (
              <button
                type="button"
                onClick={simulateUpload}
                className="btn-primary text-sm"
              >
                Upload All
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 border rounded-md bg-card"
              >
                <div className="flex items-center overflow-hidden">
                  <File className="h-4 w-4 text-primary mr-3 shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 shrink-0">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                
                {uploadStatus === 'idle' && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
