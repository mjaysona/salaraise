import { NextPage } from 'next';
import styles from './Form.module.scss';
import SelectDropdown from '@/components/ui/SelectDropdown/SelectDropdown';
import { DropdownOption } from '@/interfaces/form';
import { useEffect, useState } from 'react';
import CalculateRaiseForm from './calculateRaiseForm.tsx/CalculateRaiseForm';
import AnnualIncomeForm from './calculateRaiseForm.tsx/AnnualIncomeForm';
import { localize } from './locale';

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
  const [selectedItem, setSelectedItem]
    = useState<DropdownOption>(DEFAULT_OPTION);

  const selectItem = (item: DropdownOption) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    onItemSelect(selectedItem?.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  
  return (
    <form className={styles['form']}>
      <div className={styles['form__field']}>
        <label>{localize('iWantTo')}</label>
        <SelectDropdown
          data={OPTIONS}
          selectItem={selectItem}
        />
      </div>
      {(() => {
        if (selectedItem) {
          if (selectedItem.name === 'raise') {
            return <CalculateRaiseForm onFormUpdate={onFormUpdate} />;
          }
          if (selectedItem.name === 'annualIncome') {
            return <AnnualIncomeForm onFormUpdate={onFormUpdate} />;
          }
        }
      })()}
    </form>
  );
};

export default Form;