import React, { useState } from 'react';
import { EditorState, RichUtils, DraftInlineStyleType, Modifier } from 'draft-js';
import {
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Menu,
  MenuItem,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatColorText, ArrowDropDown } from '@mui/icons-material';

interface TextEditorToolbarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
}

const TextEditorToolbar: React.FC<TextEditorToolbarProps> = ({ editorState, onEditorChange }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  const [fontSize, setFontSize] = useState<string>('12');
  const [fontColor, setFontColor] = useState<string>('black');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fontColorAnchorEl, setFontColorAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const fontColorOpen = Boolean(fontColorAnchorEl);
  const fontSizes = ['9', '10', '12', '15', '16', '18', '20', '24', '28', '30', '32'];
  const fontColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white'];

  const applyStyle = (style: DraftInlineStyleType) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyFontSize = (size: string) => {
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(editorState.getCurrentContent(), selection, `FONTSIZE_${size}`);
    onEditorChange(EditorState.push(editorState, contentState, 'change-inline-style'));
    setFontSize(size);
    handleClose();
  };

  const applyFontColor = (color: string) => {
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(editorState.getCurrentContent(), selection, color.toUpperCase());
    onEditorChange(EditorState.push(editorState, contentState, 'change-inline-style'));
    setFontColor(color);
    handleFontColorClose();
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;
    setFontSize(size);
    applyFontSize(size);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFontColorClick = (event: React.MouseEvent<HTMLElement>) => {
    setFontColorAnchorEl(event.currentTarget);
  };

  const handleFontColorClose = () => {
    setFontColorAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" gap={0.5} padding={1}>
      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton value="bold" selected={currentStyle.has('BOLD')} onClick={() => applyStyle('BOLD')}>
          <FormatBold />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton value="italic" selected={currentStyle.has('ITALIC')} onClick={() => applyStyle('ITALIC')}>
          <FormatItalic />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton
          value="underline"
          selected={currentStyle.has('UNDERLINE')}
          onClick={() => applyStyle('UNDERLINE')}
        >
          <FormatUnderlined />
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        value={fontSize}
        onChange={handleFontSizeChange}
        style={{ width: '90px', height: '40px' }}
        inputProps={{
          style: { height: '7px' },
        }}
        InputProps={{
          style: { borderColor: 'rgba(0, 0, 0, 0.001)' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClick}>
                <ArrowDropDown />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {fontSizes.map(size => (
          <MenuItem key={size} onClick={() => applyFontSize(size)}>
            {size}
          </MenuItem>
        ))}
      </Menu>
      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton
          value="fontColor"
          selected={currentStyle.has(fontColor.toUpperCase() as DraftInlineStyleType)}
          onClick={handleFontColorClick}
        >
          <FormatColorText style={{ color: fontColor }} />
        </ToggleButton>
      </ToggleButtonGroup>
      <Menu anchorEl={fontColorAnchorEl} open={fontColorOpen} onClose={handleFontColorClose}>
        {fontColors.map(color => (
          <MenuItem key={color} onClick={() => applyFontColor(color)} style={{ color }}>
            {color}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TextEditorToolbar;
