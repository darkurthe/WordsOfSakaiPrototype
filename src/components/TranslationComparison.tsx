import React from 'react';
import { TranslationComparison } from '../types';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface TranslationComparisonProps {
  comparison: TranslationComparison;
}

export const TranslationComparisonComponent: React.FC<TranslationComparisonProps> = ({
  comparison
}) => {
  const confidenceColor = comparison.confidence >= 0.8 ? 'text-green-600' : 
                         comparison.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const ConfidenceIcon = comparison.confidence >= 0.8 ? CheckCircle : AlertCircle;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Translation Comparison</h3>
        <div className={`flex items-center space-x-1 ${confidenceColor}`}>
          <ConfidenceIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {Math.round(comparison.confidence * 100)}% confidence
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Original Translation</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{comparison.original}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">New Translation</h4>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{comparison.new}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Differences</h4>
          <ul className="space-y-1">
            {comparison.differences.map((diff, index) => (
              <li key={index} className="flex items-center space-x-2">
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-600">{diff}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{comparison.reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};