import React from 'react';
import { ProcessedFile } from '../types';
import { X, FileText, Languages, Globe } from 'lucide-react';

interface FileDetailModalProps {
  file: ProcessedFile;
  onClose: () => void;
}

export const FileDetailModal: React.FC<FileDetailModalProps> = ({ file, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{file.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Word Count</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{file.wordCount}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Languages className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Confidence</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(file.translationConfidence * 100)}%
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Themes</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{file.themes.length}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{file.summary}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Themes</h3>
            <div className="flex flex-wrap gap-2">
              {file.themes.map((theme) => (
                <span
                  key={theme}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Japanese Text</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-gray-700 font-japanese text-sm leading-relaxed">
                  {file.japaneseText || 'No Japanese text extracted'}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Original English</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {file.englishText || 'No English text extracted'}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">New Translation</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{file.newTranslation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};