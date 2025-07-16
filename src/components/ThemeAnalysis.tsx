import React from 'react';
import { ThemeAnalysis } from '../types';
import { TrendingUp, FileText, Hash } from 'lucide-react';

interface ThemeAnalysisProps {
  themes: ThemeAnalysis[];
  onThemeClick: (theme: ThemeAnalysis) => void;
}

export const ThemeAnalysisComponent: React.FC<ThemeAnalysisProps> = ({
  themes,
  onThemeClick
}) => {
  const sortedThemes = [...themes].sort((a, b) => b.frequency - a.frequency);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Theme Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedThemes.map((theme) => (
          <div
            key={theme.theme}
            onClick={() => onThemeClick(theme)}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{theme.theme}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Hash className="w-3 h-3" />
                <span>{theme.frequency}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {theme.description}
            </p>
            
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {theme.files.length} files
              </span>
            </div>
            
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {theme.files.slice(0, 3).map((file) => (
                  <span
                    key={file}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {file}
                  </span>
                ))}
                {theme.files.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{theme.files.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};