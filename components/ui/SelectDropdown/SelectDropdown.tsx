import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styles from './SelectDropdown.module.scss';

const DEFAULT_OPTION = {
  name: '',
  label: '',
  isSelected: false,
};

interface Option {
  name: string,
  label: string,
  isSelected: boolean,
};

interface AppProps {
  data: Option[],
  selectItem: Function,
};

const SelectDropdown: NextPage<AppProps> = ({ data, selectItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option>(DEFAULT_OPTION);

  const handleOptionSelect = (name:string) => {
    setIsOpen(false);

    const updatedOptions:Option[] = options.map((option:Option) => {
      return {
        ...option,
        isSelected: option.name === name
      };
    });

    setOptions(updatedOptions);
  };

  useEffect(() => {
    setOptions(data);
  }, [data]);

  useEffect(() => {
    const selected:Option | undefined = options.find((option:Option) => {
      return option.isSelected;
    });

    setSelected(selected || DEFAULT_OPTION);
  }, [options]);

  return (
    <div className={styles['dropdown']}>
      <div
        className={styles['dropdown__selector']}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div><strong>{selected.label}</strong></div>
        <div><FontAwesomeIcon icon={faChevronDown} size="xs" /></div>
      </div>
      <div className={`
        ${styles['dropdown__selection']}
        ${isOpen ? styles['dropdown__selection--open'] : ''}
      `}>
        {options
          .filter((option) => !option.isSelected)
          .map(({ name, label }) => {
            return (
              <div
                className={styles['dropdown__selection__item']}
                onClick={() => handleOptionSelect(name)}
                key={name}
              >
                <strong>{label}</strong>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default SelectDropdown;