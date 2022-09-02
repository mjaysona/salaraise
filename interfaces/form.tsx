import { Either } from './utils';

interface DropdownOption {
  name: string,
  label: string,
  isSelected: boolean,
};

interface FormValues {
  salary: number,
  percentage?: number,
};

interface MonthlyFields {
  grossMonthly: number,
  netMonthly: number,
}

interface AnnualFields {
  grossAnnual: number,
  netAnnual: number,
}

interface MonthlySalary extends MonthlyFields {
  taxDue: number,
  sss: number,
  philhealth: number,
  pagibig: number,
  overallDeductions: number,
};

interface AnnualSalary extends AnnualFields {
  taxDue: number,
  sss: number,
  philhealth: number,
  pagibig: number,
  overallDeductions: number,
};

type Salary = Either<MonthlySalary, AnnualSalary>;

interface FormValues {
  salary: number,
  percentage?: number,
};

interface SalaryTableItemObj {
  label: string,
  amount: number,
};

interface SalaryTableData extends Array<SalaryTableItemObj>{};

export type {
  DropdownOption,
  FormValues,
  Salary,
  SalaryTableData,
  SalaryTableItemObj,
};