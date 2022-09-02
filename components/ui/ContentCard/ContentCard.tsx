import { NextPage } from 'next';
import { Salary, SalaryTableData, SalaryTableItemObj } from '@/interfaces/form';
import SalaryTable from '../SalaryTable/SalaryTable';
import styles from './ContentCard.module.scss';
import { useEffect, useState } from 'react';

interface AppProps {
  currentSalaryData: Salary,
  contentType: 'raise' | 'annual',
  increasedSalaryData: Salary,
};

const ContentCard: NextPage<AppProps> = ({
  contentType,
  currentSalaryData,
  increasedSalaryData,
}:AppProps) => {
  const [currentSalary, setCurrentSalary] = useState<SalaryTableData>([]);
  const [increasedSalary, setIncreasedSalary] = useState<SalaryTableData>([]);

  const mapData = (salaryData:Salary) => {
    let mappedData:Salary[] = [];

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
      <SalaryTable data={currentSalary} type="current" />
      {
        contentType === 'raise'
          && <SalaryTable data={increasedSalary} type="increased" />
      }
    </div>
  );
};

export default ContentCard;