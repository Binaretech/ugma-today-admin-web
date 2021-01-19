import React, {useEffect, useRef, useState} from 'react';
import MarkDown from 'react-markdown';
import styles from './styles.module.css';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {Divider, IconButton} from '@material-ui/core';
import {useTextEdit} from './functions.js';
import {useWindowSize} from '../../utils/customHooks';

function MarkDownEditor(props) {
  const mobile = 640;
  const [
    value,
    textarea,
    onChange,
    onBold,
    onItalic,
    onOrderedList,
    onUnOrderedList,
  ] = useTextEdit(props.value);
  const preview = useRef();
  const [width] = useWindowSize();
  const [dividerOrientation, setDividerOrientation] = useState(
    width > mobile ? 'vertical' : 'horizontal',
  );

  useEffect(() => {
    props?.onChange?.(value);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    setDividerOrientation(width > mobile ? 'vertical' : 'horizontal');
  }, [width]);
  function onScroll(event) {
    preview.current.scrollTop = event.target.scrollTop;
  }

  return (
    <div className={styles.container}>
      <div>
        <IconButton onClick={onBold}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={onItalic}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton onClick={onOrderedList}>
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton onClick={onUnOrderedList}>
          <FormatListBulletedIcon />
        </IconButton>
      </div>
      <div
        className={`${styles.editor} ${
          props.minimized && styles.minimized
        }`.trim()}>
        <textarea
          aria-label="markdown-field"
          ref={textarea}
          onChange={onChange}
          onScroll={onScroll}
          defaultValue={props.defaultValue}
          value={value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        <Divider orientation={dividerOrientation} />
        <div
          aria-label="markdown-preview"
          className={styles.preview}
          ref={preview}>
          <MarkDown>{value}</MarkDown>
        </div>
      </div>
    </div>
  );
}

MarkDownEditor.defaultProps = {
  value: '',
};

export default MarkDownEditor;
