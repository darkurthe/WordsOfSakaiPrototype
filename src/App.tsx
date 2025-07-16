import React, { useState } from 'react';
import { FileText, MessageSquare, BarChart3, GitCompare, Menu, X } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { FileCard } from './components/FileCard';
import { FileDetailModal } from './components/FileDetailModal';
import { ChatInterface } from './components/ChatInterface';
import { ThemeAnalysisComponent } from './components/ThemeAnalysis';
import { TranslationComparisonComponent } from './components/TranslationComparison';
import { useFileAnalysis } from './hooks/useFileAnalysis';
import { ProcessedFile, ThemeAnalysis } from './types';

type ActiveTab = 'files' | 'themes' | 'comparisons' | 'chat';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('files');
  const [selectedFile, setSelectedFile] = useState<ProcessedFile | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeAnalysis | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const {
    files,
    themes,
    comparisons,
    chatMessages,
    isProcessing,
    isChatLoading,
    processFiles,
    sendChatMessage
  } = useFileAnalysis();

  const tabs = [
    { id: 'files' as const, label: 'Files', icon: FileText, count: files.length },
    { id: 'themes' as const, label: 'Themes', icon: BarChart3, count: themes.length },
    { id: 'comparisons' as const, label: 'Comparisons', icon: GitCompare, count: comparisons.length },
    { id: 'chat' as const, label: 'Chat', icon: MessageSquare, count: chatMessages.length }
  ];

  const handleFileView = (file: ProcessedFile) => {
    setSelectedFile(file);
  };

  const handleThemeClick = (theme: ThemeAnalysis) => {
    setSelectedTheme(theme);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'files':
        return (
          <div className="space-y-6">
            <FileUpload onFilesSelected={processFiles} isProcessing={isProcessing} />
            
            {files.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Processed Files ({files.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onView={handleFileView}
                      onCompare={handleFileView}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'themes':
        return themes.length > 0 ? (
          <ThemeAnalysisComponent themes={themes} onThemeClick={handleThemeClick} />
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Upload files to see theme analysis</p>
          </div>
        );
      
      case 'comparisons':
        return comparisons.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Translation Comparisons
            </h2>
            {comparisons.map((comparison, index) => (
              <TranslationComparisonComponent key={index} comparison={comparison} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <GitCompare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Upload files to see translation comparisons</p>
          </div>
        );
      
      case 'chat':
        return (
          <div className="h-full">
            <ChatInterface
              messages={chatMessages}
              onSendMessage={sendChatMessage}
              isLoading={isChatLoading}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Japanese Text Analyzer</h1>
                  <p className="text-sm text-gray-500">AI-powered translation & analysis</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-64 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className={activeTab === 'chat' ? 'h-[calc(100vh-200px)]' : ''}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedFile && (
        <FileDetailModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}

export default App;