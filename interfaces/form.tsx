interface DropdownOption {
  name: string,
  label: string,
  isSelected: boolean,
};

interface FormValues {
  salary: number,
  percentage?: number,
};

interface SalaryFields {
  taxDue: number,
  sss: number,
  philhealth: number,
  pagibig: number,
  overallDeductions: number,
}

interface MonthlyFields {
  grossMonthly: number,
  netMonthly: number,
  grossAnnual?: never,
  netAnnual?: never,
}

interface AnnualFields {
  grossMonthly?: never,
  netMonthly?: never,
  grossAnnual: number,
  netAnnual: number,
}

interface MonthlySalary extends MonthlyFields, SalaryFields {};

interface AnnualSalary extends AnnualFields, SalaryFields {};

type Salary = MonthlySalary | AnnualSalary;

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