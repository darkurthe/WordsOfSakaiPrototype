import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, File } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, isProcessing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
      'application/pdf': ['.pdf']
    },
    multiple: true,
    disabled: isProcessing
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <Upload className="w-8 h-8 text-gray-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isProcessing ? 'Processing files...' : 'Upload Japanese Text Files'}
          </h3>
          <p className="text-gray-600">
            {isDragActive 
              ? 'Drop files here...' 
              : 'Drag & drop HTML or PDF files here, or click to select'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span>HTML</span>
          </div>
          <div className="flex items-center space-x-1">
            <File className="w-4 h-4" />
            <span>PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};