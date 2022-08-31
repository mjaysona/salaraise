import { NextPage } from 'next';
import styles from './Form.module.scss';
import SelectDropdown from '@/components/ui/SelectDropdown/SelectDropdown';
import Input from '@/components/ui/Input/Input';
import InputAmount from '@/components/ui/InputAmount/InputAmount';
import { useEffect, useState } from 'react';

const Form: NextPage<{ onFormUpdate: Function }> = ({ onFormUpdate }) => {
  const [salary, setSalary] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    onFormUpdate({ salary, percentage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary, percentage]);

  const optionsMock = [
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
    {
      name: 'tax',
      label: 'Tax for bonuses',
      isSelected: false,
    },
  ];
  
  return (
    <form className={styles['form']}>
      <div className={styles['form__field']}>
        <label>I want to calculate my</label>
        <SelectDropdown
          data={optionsMock}
          selectItem={(e:Event) => console.log(e.target)}
        />
      </div>
      <div
        className={styles['form__field']}
      >
        <label>What’s your gross monthly basic salary?</label>
        <InputAmount
          onValueChange={(salary: number) => setSalary(salary)}
        />
      </div>
      <div className={styles['form__field']}>
        <label>How much increase do you want?</label>
        <Input
          ending="%"
          onValueChange={(percentage: number) => setPercentage(percentage)}
        />
      </div>
    </form>
  );
};

export default Form;