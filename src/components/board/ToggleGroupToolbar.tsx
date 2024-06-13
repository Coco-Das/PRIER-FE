import React from 'react';
import { EditorState, RichUtils, DraftInlineStyleType, Modifier } from 'draft-js';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatSize, FormatColorText } from '@mui/icons-material';

interface ToggleGroupToolbarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
}

const ToggleGroupToolbar: React.FC<ToggleGroupToolbarProps> = ({ editorState, onEditorChange }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  const applyStyle = (style: DraftInlineStyleType) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    if (selection.isCollapsed()) {
      const nextContentState = Modifier.applyInlineStyle(contentState, selection, style);
      onEditorChange(EditorState.push(editorState, nextContentState, 'change-inline-style'));
    } else {
      onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const applyBlockType = (blockType: string) => {
    onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <ToggleButtonGroup size="small" exclusive>
      <ToggleButton value="bold" selected={currentStyle.has('BOLD')} onClick={() => applyStyle('BOLD')}>
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic" selected={currentStyle.has('ITALIC')} onClick={() => applyStyle('ITALIC')}>
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underline" selected={currentStyle.has('UNDERLINE')} onClick={() => applyStyle('UNDERLINE')}>
        <FormatUnderlined />
      </ToggleButton>
      <ToggleButton
        value="header-one"
        selected={RichUtils.getCurrentBlockType(editorState) === 'header-one'}
        onClick={() => applyBlockType('header-one')}
      >
        <FormatSize />
      </ToggleButton>
      <ToggleButton
        value="color"
        selected={currentStyle.has('RED')}
        onClick={() => applyStyle('RED' as DraftInlineStyleType)}
      >
        <FormatColorText />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleGroupToolbar;
