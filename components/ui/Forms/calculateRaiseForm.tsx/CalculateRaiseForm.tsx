import { NextPage } from 'next';
import styles from '../Form.module.scss';
import Input from '@/components/ui/Input/Input';
import InputAmount from '@/components/ui/InputAmount/InputAmount';
import { FormValues } from '@/interfaces/form';
import { useEffect, useState } from 'react';

const CalculateRaiseForm: NextPage<{ onFormUpdate: Function }> = ({ onFormUpdate }) => {
  const [salary, setSalary] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const payload:FormValues = {
      salary,
      percentage,
    };

    onFormUpdate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary, percentage]);
  
  return (
    <>
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
    </>
  );
};

export default CalculateRaiseForm;