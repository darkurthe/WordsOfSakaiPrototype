import React from 'react';
import { ProcessedFile } from '../types';
import { FileText, Clock, Hash, Target } from 'lucide-react';

interface FileCardProps {
  file: ProcessedFile;
  onView: (file: ProcessedFile) => void;
  onCompare: (file: ProcessedFile) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onView, onCompare }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
            <p className="text-sm text-gray-500 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{file.processedAt.toLocaleDateString()}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Target className="w-3 h-3" />
            <span>{Math.round(file.translationConfidence * 100)}%</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Summary</p>
          <p className="text-sm text-gray-600 line-clamp-2">{file.summary}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Themes</p>
          <div className="flex flex-wrap gap-1">
            {file.themes.slice(0, 3).map((theme) => (
              <span
                key={theme}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {theme}
              </span>
            ))}
            {file.themes.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{file.themes.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Hash className="w-3 h-3" />
            <span>{file.wordCount} words</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onView(file)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onCompare(file)}
          className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
        >
          Compare
        </button>
      </div>
    </div>
  );
};