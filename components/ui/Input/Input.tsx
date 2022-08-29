import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import styles from './Input.module.scss';

interface AppProps {
  ending?: string,
  onValueChange?: Function,
}

const Input: NextPage<AppProps> = ({ ending, onValueChange }) => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const span = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(span.current!.offsetWidth);
  }, [value]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));

    if (onValueChange) {
      onValueChange(parseInt(value));
    }
  };

  const toggleFocus = async () => {
    await setIsFocused(!isFocused);

    setWidth(span.current!.offsetWidth);
  };

  return (
    <div className={styles['input']}>
      <div>
        <span className={styles['input--hidden']} ref={span}>{value}</span>
        <input
          maxLength={3}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          onChange={onInputChange}
          placeholder="0"
          style={{ width }}
          type="text"
          value={value}
        />
      </div>
      {ending && <span className={styles['input--ending']}>{ending}</span>}
    </div>
  );
};

export default Input;