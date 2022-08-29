import { NextPage } from 'next';
import { Salary } from '@/interfaces/form';
import SalaryTable from '../SalaryTable/SalaryTable';
import styles from './ContentCard.module.scss';

interface AppProps {
  currentSalary: Salary,
  increasedSalary: Salary,
};

const ContentCard: NextPage<AppProps> = ({
  currentSalary,
  increasedSalary,
}:AppProps) => {
  return (
    <div className={styles['content-card']}>
      <SalaryTable data={currentSalary} type="current" />
      <SalaryTable data={increasedSalary} type="increased" />
    </div>
  );
};

export default ContentCard;