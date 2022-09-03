import { NextPage } from 'next';
import { Salary, SalaryTableData, SalaryTableItemObj } from '@/interfaces/form';
import SalaryTable from '../SalaryTable/SalaryTable';
import styles from './ContentCard.module.scss';
import { useEffect, useState } from 'react';
import { localize } from './locale';

interface AppProps {
  currentSalaryData: Salary,
  contentType: 'raise' | 'annualIncome',
  increasedSalaryData: Salary,
};

const ContentCard: NextPage<AppProps> = ({
  contentType,
  currentSalaryData,
  increasedSalaryData,
}:AppProps) => {
  const [currentSalary, setCurrentSalary] = useState<SalaryTableData>([]);
  const [increasedSalary, setIncreasedSalary] = useState<SalaryTableData>([]);

  const mapData = (salaryData:Salary):SalaryTableData => {
    let mappedData:SalaryTableData = [];

    Object.entries(salaryData).forEach(([key, value]) => {
      const mappedEntry:SalaryTableItemObj = {
        label: key,
        amount: value,
      };

      mappedData.push(mappedEntry);
    });

    return mappedData;
  };

  useEffect(() => {
    setCurrentSalary(mapData(currentSalaryData));
  }, [currentSalaryData]);

  useEffect(() => {
    setIncreasedSalary(mapData(increasedSalaryData));
  }, [increasedSalaryData]);

  return (
    <div className={styles['content-card']}>
      {contentType === 'annualIncome' &&
        <p><small>{localize('exlusions')}</small></p>
      }
      <div>
        <SalaryTable
          data={currentSalary}
          period={contentType === 'raise' ? 'monthly' : 'annual'}
          type="current"
        />
        {contentType === 'raise' &&
          <SalaryTable 
            data={increasedSalary}
            period="monthly"
            type="increased"
          />
        }
      </div>
    </div>
  );
};

export default ContentCard;