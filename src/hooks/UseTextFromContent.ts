// hooks/UseTextFromContent.ts
import { useCallback } from 'react';

const useExtractTextFromContent = () => {
  const extractTextFromContent = useCallback((content: string): string => {
    try {
      const contentState = JSON.parse(content);
      let text = '';

      if (contentState.blocks && Array.isArray(contentState.blocks)) {
        contentState.blocks.forEach((block: any) => {
          if (block.text) {
            text += block.text + '\n'; // Add newline for separation
          }
        });
      }
      console.log(text);

      return text;
    } catch (error) {
      console.error('Error parsing content JSON:', error);
      return '';
    }
  }, []);

  return extractTextFromContent;
};

export default useExtractTextFromContent;
