import React, { useState, useEffect } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
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
import { FormatBold, FormatItalic, FormatUnderlined, FormatColorText, ArrowDropDown, Link } from '@mui/icons-material';
import LinkModal from './LinkModal';

interface TextEditorToolbarProps {
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  currentFontSize: string; // 추가된 속성
}

const TextEditorToolbar: React.FC<TextEditorToolbarProps> = ({ editorState, onEditorChange, currentFontSize }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  const [fontSize, setFontSize] = useState<string>('14'); // 기본값을 '14'로 설정
  const [fontColor, setFontColor] = useState<string>('black');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fontColorAnchorEl, setFontColorAnchorEl] = useState<null | HTMLElement>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const fontColorOpen = Boolean(fontColorAnchorEl);
  const fontSizes = ['9', '10', '12', '14', '15', '16', '18', '20', '24', '28', '30', '32', '38', '50'];
  const fontColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white'];

  useEffect(() => {
    if (currentFontSize) {
      setFontSize(currentFontSize);
    }
  }, [currentFontSize]);

  const applyStyle = (style: string) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyFontSize = (size: string) => {
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(editorState.getCurrentContent(), selection, `FONTSIZE_${size}`);
    onEditorChange(EditorState.push(editorState, contentState, 'change-inline-style'));
    setFontSize(size);
  };

  const applyFontColor = (color: string) => {
    const selection = editorState.getSelection();
    const contentState = Modifier.applyInlineStyle(editorState.getCurrentContent(), selection, color.toUpperCase());
    onEditorChange(EditorState.push(editorState, contentState, 'change-inline-style'));
    setFontColor(color);
    handleFontColorClose();
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(event.target.value);
  };

  const handleFontSizeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const size = fontSize;
      if (!isNaN(Number(size)) && Number(size) > 0) {
        applyFontSize(size);
        handleClose();
      }
    }
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

  const handleLinkClick = () => {
    setLinkDialogOpen(true);
  };

  const handleLinkDialogClose = () => {
    setLinkDialogOpen(false);
  };

  const confirmLink = (url: string) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
      onEditorChange(newEditorState);
    }
    handleLinkDialogClose();
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
        onKeyDown={handleFontSizeKeyDown}
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
          selected={currentStyle.has(fontColor.toUpperCase())}
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
      <ToggleButtonGroup size="small" exclusive>
        <ToggleButton value="link" onClick={handleLinkClick}>
          <Link />
        </ToggleButton>
      </ToggleButtonGroup>
      {linkDialogOpen && <LinkModal showButtons={true} onConfirm={confirmLink} onCancel={handleLinkDialogClose} />}
    </Box>
  );
};

export default TextEditorToolbar;
