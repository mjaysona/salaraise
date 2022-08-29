import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import styles from './InputAmount.module.scss';

interface Amount {
  label: string,
  value: string,
}

const InputAmount: NextPage<{ onValueChange?: Function }>
  = ({ onValueChange }) => {
    const [amount, setAmount] = useState<Amount>({
      label: '',
      value: '',
    });
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const span = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setWidth(span.current!.offsetWidth);
    }, [amount.label]);

    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setAmount({
        label: Intl.NumberFormat('en-US').format(parseInt(value)),
        value: value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'),
      });

      if (onValueChange) {
        onValueChange(value ? parseInt(value) : 0);
      }
    };

    const toggleFocus = async () => {
      await setIsFocused(!isFocused);

      setWidth(span.current!.offsetWidth);
    };

    return (
      <div className={styles['input']}>
        <span className={styles['input__currency']}>PHP</span>
        <div>
          <span className={styles['input--hidden']} ref={span}>
            {isFocused || !amount.value ? amount.value : amount.label}
          </span>
          <input
            autoFocus
            maxLength={7}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
            onChange={onInputChange}
            placeholder="0"
            style={{ width }}
            type="text"
            value={isFocused || !amount.value ? amount.value : amount.label}
          />
        </div>
      </div>
    );
  };

export default InputAmount;