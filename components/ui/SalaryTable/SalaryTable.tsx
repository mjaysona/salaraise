import { NextPage } from 'next';
import { Salary } from '@/interfaces/form';
import { formatAmount } from '@/utils/format';
import styles from './SalaryTable.module.scss';

interface AppProps {
  data: Salary,
  type: 'current' | 'increased',
};

const SalaryTable: NextPage<AppProps> = ({ data, type }:AppProps) => {
  return (
    <div className={styles['salary-table']}>
      <div className={styles['salary-table__items']}>
        {
          data.map((item) => {
            return  <div className={styles['salary-table__item']}>
                <span>{item.label}</span>
                <span>{formatAmount(item.amount)}</span>
              </div>
            
          })
        }
      </div>
      {/* <div className={styles['salary-table__summary']}>
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
        <div><span>₱<strong>{formatAmount(netMonthly)}</strong></span></div>
      </div> */}
    </div>
  );
};

export default SalaryTable;