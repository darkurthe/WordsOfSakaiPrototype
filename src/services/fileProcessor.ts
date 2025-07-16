import { ProcessedFile } from '../types';
import { translationService } from './translationService';

export class FileProcessor {
  async processHTMLFile(file: File): Promise<ProcessedFile> {
    const content = await file.text();
    
    // Extract Japanese and English text from HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // This is a simplified extraction - in real implementation, 
    // you'd need more sophisticated parsing based on your HTML structure
    const textContent = doc.body.textContent || '';
    
    // Mock extraction for demo
    const japaneseText = this.extractJapaneseText(textContent);
    const englishText = this.extractEnglishText(textContent);
    
    // Process with translation service
    const newTranslation = await translationService.translateText(file.name);
    const summary = await translationService.generateSummary(japaneseText, englishText);
    const themes = await translationService.extractThemes(textContent);
    
    return {
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      originalText: textContent,
      japaneseText,
      englishText,
      newTranslation,
      summary,
      themes,
      processedAt: new Date(),
      wordCount: textContent.split(/\s+/).length,
      translationConfidence: 0.8 + Math.random() * 0.2
    };
  }

  async processPDFFile(file: File): Promise<ProcessedFile> {
    // In real implementation, use PDF.js or similar library
    // For now, treat as text file
    const content = await file.text();
    
    return this.processHTMLFile(file);
  }

  private extractJapaneseText(content: string): string {
    // Simple regex to find Japanese characters
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;
    const matches = content.match(japaneseRegex);
    return matches ? matches.join(' ') : '';
  }

  private extractEnglishText(content: string): string {
    // Simple regex to find English text
    const englishRegex = /[a-zA-Z\s.,!?;:'"()-]+/g;
    const matches = content.match(englishRegex);
    return matches ? matches.filter(match => match.trim().length > 3).join(' ') : '';
  }
}

export const fileProcessor = new FileProcessor();