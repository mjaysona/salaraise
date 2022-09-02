import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { DropdownOption } from '@/interfaces/form';
import styles from './SelectDropdown.module.scss';

const DEFAULT_OPTION = {
  name: '',
  label: '',
  isSelected: false,
};

interface AppProps {
  data: DropdownOption[],
  selectItem: Function,
};

const SelectDropdown: NextPage<AppProps> = ({ data, selectItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [selected, setSelected] = useState<DropdownOption>(DEFAULT_OPTION);

  const handleOptionSelect = (item:DropdownOption) => {
    setIsOpen(false);

    const updatedOptions:DropdownOption[] = options.map((option:DropdownOption) => {
      return {
        ...option,
        isSelected: option.name === item.name
      };
    });

    setOptions([...updatedOptions]);
  };

  useEffect(() => {
    setOptions(data);
  }, []);

  useEffect(() => {
    const selected:DropdownOption | undefined = options.find((option:DropdownOption) => {
      return option.isSelected;
    });

    setSelected(selected || DEFAULT_OPTION);
    selectItem(selected);
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
          .map((option) => {
            return (
              <div
                className={styles['dropdown__selection__item']}
                onClick={() => handleOptionSelect(option)}
                key={option.name}
              >
                <strong>{option.label}</strong>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default SelectDropdown;