import { mapLocale } from '@/utils/localize';

interface Locale {
  type: string,
  period: string,
};

const locale = (param: Locale) => {
  return {
    grossAnnual: 'Gross annual',
    grossMonthly: 'Gross monthly',
    taxDue: 'Tax due',
    sss: 'SSS',
    philhealth: 'Philhealth',
    pagibig: 'Pag-ibig',
    overallDeductions: 'Overall deductions',
    netAnnual: 'Net annual',
    netMonthly: 'Net monthly',
    monthlyIncome: `${param?.type} ${param?.period} net income`,
  };
};

export const localize = mapLocale(locale);