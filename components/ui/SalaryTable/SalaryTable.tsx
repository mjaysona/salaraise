import { NextPage } from 'next';
import { Salary } from '@/interfaces/form';
import { formatAmount } from '@/utils/format';
import styles from './SalaryTable.module.scss';

interface AppProps {
  data: Salary,
  type: 'current' | 'increased',
};

const SalaryTable: NextPage<AppProps> = ({ data, type }:AppProps) => {
  const {
    grossMonthly = 0,
    taxDue = 0,
    sss = 0,
    philhealth = 0,
    pagibig = 0,
    overallDeductions = 0,
    netMonthly = 0,
  } = data;

  return (
    <div className={styles['salary-table']}>
      <div className={styles['salary-table__items']}>
        <div className={styles['salary-table__item']}>
          <span>Gross monthly</span>
          <span>{formatAmount(grossMonthly)}</span>
        </div>
        <div className={styles['salary-table__item']}>
          <span>Tax due</span>
          <span>{formatAmount(taxDue)}</span>
        </div>
        <div className={styles['salary-table__item']}>
          <span>SSS</span>
          <span>{formatAmount(sss)}</span>
        </div>
        <div className={styles['salary-table__item']}>
          <span>Philhealth</span>
          <span>{formatAmount(philhealth)}</span>
        </div>
        <div className={styles['salary-table__item']}>
          <span>Pag-ibig</span>
          <span>{formatAmount(pagibig)}</span>
        </div>
      </div>
      <div className={styles['salary-table__summary']}>
        <span>
          {formatAmount(grossMonthly)} - {formatAmount(overallDeductions)} =
        </span>
      </div>
      <div className={styles['salary-table__overall']}>
        <span>
          <strong>
            {type === 'current' ? 'Current' : 'Increased'} monthly net income
          </strong>
        </span>
        <div><span>PHP <strong>{formatAmount(netMonthly)}</strong></span></div>
      </div>
    </div>
  );
};

export default SalaryTable;