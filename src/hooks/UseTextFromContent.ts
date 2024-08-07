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

      return text;
    } catch (error) {
      return '';
    }
  }, []);

  return extractTextFromContent;
};

export default useExtractTextFromContent;
