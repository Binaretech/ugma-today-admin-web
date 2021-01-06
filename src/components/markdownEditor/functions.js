import {useEffect, useRef} from 'react';
import {useState} from 'react';

export function useTextEdit(propsValue) {
  const [value, setValue] = useState(propsValue);
  const [move, setMove] = useState(0);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  useEffect(() => {
    moveCursor(move);
  }, [move]);

  const textarea = useRef(null);

  function moveCursor(pos) {
    textarea.current.focus();
    textarea.current.setSelectionRange(pos, pos);
  }

  function insertString(value, cursor, string) {
    return value.slice(0, cursor) + string + value.slice(cursor);
  }

  function onChange({target}) {
    setValue(target.value);
  }

  function onBold() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, '****');
    setValue(newValue);

    setMove(cursor + 2);
  }

  function onItalic() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, '**');
    setValue(newValue);

    setMove(cursor + 2);
    moveCursor(cursor + 1);
  }

  function onOrderedList() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, '\n1. ');
    setValue(newValue);

    moveCursor(cursor + 5);
  }

  function onUnOrderedList() {
    const cursor = textarea.current.selectionEnd;
    const newValue = insertString(value, cursor, '\n* ');
    setValue(newValue);

    moveCursor(cursor + 4);
  }

  return [
    value,
    textarea,
    onChange,
    onBold,
    onItalic,
    onOrderedList,
    onUnOrderedList,
  ];
}
