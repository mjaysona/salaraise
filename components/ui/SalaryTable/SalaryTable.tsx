import { NextPage } from 'next';
import { SalaryTableData, SalaryTableItemObj } from '@/interfaces/form';
import { formatAmount } from '@/utils/format';
import styles from './SalaryTable.module.scss';
import { localize } from './locale';
import { useEffect, useState } from 'react';

interface AppProps {
  data: SalaryTableData,
  type: 'current' | 'increased',
  period: 'annual' | 'monthly',
};

const SalaryTable: NextPage<AppProps> = ({ data, type, period }:AppProps) => {
  const [gross, setGross] = useState<number>(0);
  const [overallDeductions, setOverallDeductions] = useState<number>(0);
  const [net, setNet] = useState<number>(0);

  useEffect(() => {
    const gross = data.find(({ label }) => {
      return label === (period === 'monthly' ? 'grossMonthly' : 'grossAnnual');
    });
    const net = data.find(({ label }) => {
      return label === (period === 'monthly' ? 'netMonthly' : 'netAnnual');
    });
    const deductions = data.find(({ label }) => label === 'overallDeductions');

    setGross(gross ? gross.amount : 0);
    setNet(net ? net.amount : 0);
    setOverallDeductions(deductions ? deductions.amount : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles['salary-table']}>
      <div className={styles['salary-table__items']}>
        {
          data.map((item:SalaryTableItemObj) => {
            if (item.label !== 'netMonthly') {
              return (
                <div key={item.label} className={styles['salary-table__item']}>
                  <span>{localize(item.label)}</span>
                  <span>{formatAmount(item.amount)}</span>
                </div>
              );
            }
          })
        }
      </div>
      <div className={styles['salary-table__summary']}>
        <span>
          {formatAmount(gross)} - {formatAmount(overallDeductions)} =
        </span>
      </div>
      <div className={styles['salary-table__overall']}>
        <span>
          <strong>
            {localize(
              'monthlyIncome',
              {
                type: type === 'current' ? 'Current' : 'Increased',
                period,
              }
            )}
          </strong>
        </span>
        <div><span>₱<strong>{formatAmount(net)}</strong></span></div>
      </div>
    </div>
  );
};

export default SalaryTable;