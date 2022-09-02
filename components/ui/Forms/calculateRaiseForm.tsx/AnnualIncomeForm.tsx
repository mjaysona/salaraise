import { NextPage } from 'next';
import styles from '../Form.module.scss';
import InputAmount from '@/components/ui/InputAmount/InputAmount';
import { FormValues } from '@/interfaces/form';
import { useEffect, useState } from 'react';

const AnnualIncomeForm: NextPage<{ onFormUpdate: Function }> = ({ onFormUpdate }) => {
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    const payload:FormValues = {
      salary,
    };

    onFormUpdate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary]);
  
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
    </>
  );
};

export default AnnualIncomeForm;