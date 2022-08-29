import { NextPage } from 'next';
import Head from 'next/head';
import Form from '@/components/ui/Form/Form';
import ContentCard from '@/components/ui/ContentCard/ContentCard';
import { useEffect, useState } from 'react';
import { FormValues, Salary } from '@/interfaces/form';
import { formatAmount } from '@/utils/format';
import {
  computeSss,
  computePhilhealth,
  computePagIbig,
  computeTaxableIncome,
  computeTotalDeductions,
  computeWithholdingTax,
  isValidSalary,
} from '@/utils/formulas';
import styles from '../styles/Home.module.scss';

interface NetIncome {
  salary: number,
  deductions: number,
  taxDue: number
};

interface NetDifference {
  value: number,
  percentage: number,
};

const Home: NextPage = () => {
  const [currentSalary, setCurrentSalary] = useState<Salary>({
    grossMonthly: 0,
    taxDue: 0,
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    overallDeductions: 0,
    netMonthly: 0,
  });
  const [increase, setIncrease] = useState<Salary>({
    grossMonthly: 0,
    taxDue: 0,
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    overallDeductions: 0,
    netMonthly: 0,
  });
  const [salary, setSalary] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [netDifference, setNetDifference] = useState<NetDifference>({
    value: 0,
    percentage: 0,
  });

  const handleFormUpdate = ({ salary, percentage }: FormValues) => {
    setSalary(salary);
    setPercentage(percentage);
  };

  const computeNetIncome = ({ salary, deductions, taxDue }: NetIncome) => {
    return salary - (deductions + taxDue);
  };

  const computeSalary = (type?: string) => {
    const salaryToCompute = type === 'increase'
      ? (salary + (percentage ? (salary * (percentage * 0.01)) : 0))
      : salary;
    const pagibig = computeSss(salaryToCompute);
    const philhealth = computePhilhealth(salaryToCompute);
    const sss = computePagIbig(salaryToCompute);
    const deductions: number = computeTotalDeductions({
      pagibig,
      philhealth,
      sss,
    });
    const taxableIncome: number = computeTaxableIncome({
      salary: salaryToCompute,
      deductions,
    });
    const taxDue: number = computeWithholdingTax(taxableIncome);
    const netMonthly = computeNetIncome({
      salary: salaryToCompute,
      deductions,
      taxDue,
    });
    const overallDeductions = taxDue + deductions;
    const isValid = (() => isValidSalary(salaryToCompute))();

    return {
      grossMonthly: salaryToCompute,
      taxDue: taxDue,
      sss: sss,
      philhealth: isValid ? philhealth: 0,
      pagibig: isValid ? pagibig : 0,
      overallDeductions: isValid ? overallDeductions : 0,
      netMonthly: isValid ? netMonthly : 0,
    };
  };

  const getNetDifference = (current:number, increase:number):NetDifference => {
    return {
      value: increase - current,
      percentage: current || increase
        ? ((increase - current)/current)*100
        : 0,
    };
  };

  useEffect(() => {
    setCurrentSalary(computeSalary());
    setIncrease(computeSalary('increase'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary, percentage]);

  useEffect(() => {
    const { netMonthly: current } = currentSalary;
    const { netMonthly: withIncrease } = increase;

    setNetDifference(getNetDifference(current, withIncrease));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSalary, increase]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles['container']}>
          <div>
            <Form
              onFormUpdate={handleFormUpdate}
            />
          </div>
          <div className={styles['content']}>
            <ContentCard
              currentSalary={currentSalary}
              increasedSalary={increase}
            />
            {
              !!(percentage && isValidSalary(salary)) &&
              <p>
                A <strong>{percentage}%</strong> increase in your monthly gross 
                increases your monthly net by PHP <strong>
                  {formatAmount(netDifference.value)}</strong> which is <strong>
                  {formatAmount(netDifference.percentage)}%</strong> higher from
                your current monthly net.
              </p>
            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;