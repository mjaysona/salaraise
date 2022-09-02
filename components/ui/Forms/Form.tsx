import { NextPage } from 'next';
import styles from './Form.module.scss';
import SelectDropdown from '@/components/ui/SelectDropdown/SelectDropdown';
import { DropdownOption } from '@/interfaces/form';
import { useEffect, useState } from 'react';
import CalculateRaiseForm from './calculateRaiseForm.tsx/CalculateRaiseForm';
import AnnualIncomeForm from './calculateRaiseForm.tsx/AnnualIncomeForm';

const DEFAULT_OPTION = {
  name: '',
  label: '',
  isSelected: false,
};

const OPTIONS = [
  {
    name: 'raise',
    label: 'Expected raise',
    isSelected: true,
  },
  {
    name: 'annualIncome',
    label: 'Annual income',
    isSelected: false,
  },
];

const Form: NextPage<{ onItemSelect: Function, onFormUpdate: Function }> = ({
  onItemSelect,
  onFormUpdate,
}) => {
  const [selectedItem, setSelectedItem] = useState<DropdownOption>(DEFAULT_OPTION);

  const selectItem = (item: DropdownOption) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    onItemSelect(selectedItem?.name);
  }, [selectedItem]);
  
  return (
    <form className={styles['form']}>
      <div className={styles['form__field']}>
        <label>I want to calculate my</label>
        <SelectDropdown
          data={OPTIONS}
          selectItem={selectItem}
        />
      </div>
      {(() => {
        if (selectedItem) {
          if (selectedItem.name === 'raise') {
            return <CalculateRaiseForm onFormUpdate={onFormUpdate} />
          }
          if (selectedItem.name === 'annualIncome') {
            return <AnnualIncomeForm onFormUpdate={onFormUpdate} />
          }
        }
      })()}
    </form>
  );
};

export default Form;