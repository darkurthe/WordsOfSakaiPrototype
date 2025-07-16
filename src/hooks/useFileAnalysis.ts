import { useState, useCallback } from 'react';
import { ProcessedFile, ThemeAnalysis, TranslationComparison, ChatMessage } from '../types';
import { fileProcessor } from '../services/fileProcessor';
import { translationService } from '../services/translationService';

export const useFileAnalysis = () => {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [themes, setThemes] = useState<ThemeAnalysis[]>([]);
  const [comparisons, setComparisons] = useState<TranslationComparison[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const processFiles = useCallback(async (selectedFiles: File[]) => {
    setIsProcessing(true);
    try {
      const processedFiles: ProcessedFile[] = [];
      
      for (const file of selectedFiles) {
        let processedFile: ProcessedFile;
        
        if (file.type === 'application/pdf') {
          processedFile = await fileProcessor.processPDFFile(file);
        } else {
          processedFile = await fileProcessor.processHTMLFile(file);
        }
        
        processedFiles.push(processedFile);
      }
      
      setFiles(prev => [...prev, ...processedFiles]);
      
      // Generate theme analysis
      await generateThemeAnalysis([...files, ...processedFiles]);
      
      // Generate translation comparisons
      await generateTranslationComparisons(processedFiles);
      
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

  const generateThemeAnalysis = useCallback(async (allFiles: ProcessedFile[]) => {
    const themeMap = new Map<string, ThemeAnalysis>();
    
    allFiles.forEach(file => {
      file.themes.forEach(theme => {
        if (themeMap.has(theme)) {
          const existing = themeMap.get(theme)!;
          existing.frequency += 1;
          existing.files.push(file.name);
        } else {
          themeMap.set(theme, {
            theme,
            files: [file.name],
            frequency: 1,
            description: `Analysis of ${theme} theme across uploaded files`
          });
        }
      });
    });
    
    setThemes(Array.from(themeMap.values()));
  }, []);

  const generateTranslationComparisons = useCallback(async (processedFiles: ProcessedFile[]) => {
    const newComparisons: TranslationComparison[] = [];
    
    for (const file of processedFiles) {
      if (file.englishText && file.newTranslation) {
        const comparison = await translationService.analyzeTranslationDifferences(
          file.englishText,
          file.newTranslation
        );
        newComparisons.push(comparison);
      }
    }
    
    setComparisons(prev => [...prev, ...newComparisons]);
  }, []);

  const sendChatMessage = useCallback(async (message: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: generateChatResponse(message, files, themes),
        timestamp: new Date(),
        relatedFiles: findRelatedFiles(message, files)
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending chat message:', error);
    } finally {
      setIsChatLoading(false);
    }
  }, [files, themes]);

  const generateChatResponse = (message: string, files: ProcessedFile[], themes: ThemeAnalysis[]): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('theme') || lowerMessage.includes('common')) {
      const topThemes = themes.slice(0, 3);
      return `Based on your uploaded files, the most common themes are: ${topThemes.map(t => t.theme).join(', ')}. The theme "${topThemes[0]?.theme}" appears in ${topThemes[0]?.frequency} files.`;
    }
    
    if (lowerMessage.includes('translation') || lowerMessage.includes('difference')) {
      return `The new translations focus on more natural English expressions while preserving the emotional depth of the original Japanese text. Common improvements include better cultural context and contemporary language usage.`;
    }
    
    if (lowerMessage.includes('summary') || lowerMessage.includes('about')) {
      return `Your collection contains ${files.length} files exploring themes of love, longing, and human emotion. The content uses poetic Japanese expressions that convey deep feelings about relationships and life experiences.`;
    }
    
    return `I can help you analyze your Japanese text collection. You have ${files.length} files with ${themes.length} distinct themes. What specific aspect would you like to explore?`;
  };

  const findRelatedFiles = (message: string, files: ProcessedFile[]): string[] => {
    const lowerMessage = message.toLowerCase();
    return files
      .filter(file => 
        file.name.toLowerCase().includes(lowerMessage) ||
        file.themes.some(theme => theme.toLowerCase().includes(lowerMessage))
      )
      .slice(0, 3)
      .map(file => file.name);
  };

  return {
    files,
    themes,
    comparisons,
    chatMessages,
    isProcessing,
    isChatLoading,
    processFiles,
    sendChatMessage
  };
};