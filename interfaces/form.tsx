interface FormValues {
  salary: number,
  percentage: number,
};

interface Salary {
  grossMonthly: number,
  taxDue: number,
  sss: number,
  philhealth: number,
  pagibig: number,
  overallDeductions: number,
  netMonthly: number,
};

export type { FormValues, Salary };