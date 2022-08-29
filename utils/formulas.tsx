interface Bracket {
  min: number|null,
  max: number|null,
  contribution: number|null,
  initialContribution: number,
};

interface Deductions {
  pagibig: number,
  philhealth: number,
  sss: number,
};

interface TaxableIncome {
  salary: number,
  deductions: number,
};

const computeSss = (value: number): number => {
  const minContribution: number = 135;
  const maxContribution: number = 1125;
  const minSalary: number = 3249;
  const maxSalary: number = 24750;
  const salaryAddend: number = 500;
  const contributionAddend: number = 22.5;

  if (value > minSalary) {
    if (value >= maxSalary) {
      return maxContribution;
    } else {
      let contribution: number = minContribution + contributionAddend;
      let salary: number = minSalary;
  
      for (let i = 0; i <= 43; i++) {
        const maxOnRange = salary + salaryAddend;
  
        if (value >= salary && value <= maxOnRange) {
          return contribution;
        }
  
        salary += salaryAddend;
        contribution += contributionAddend;
      }
    }
  }
  
  return minContribution;
};

const computePhilhealth = (value: number) => {
  const premium: number = 0.04;
  const minSalary: number = 10000;
  const maxSalary: number = 80000;

  const getContribution = (value: number) => (value * premium)/2;

  if (value <= minSalary) {
    return getContribution(minSalary);
  } else if (value >= maxSalary) {
    return getContribution(maxSalary);
  } else {
    return getContribution(value);
  }
};

const computePagIbig = (value: number) => {
  const employeeShare: number = 0.02;
  const minSalary: number = 1500;
  const maxSalary: number = 5000;
  
  const getContribution = (value: number) => value * employeeShare;

  if (value <= minSalary) {
    return getContribution(value/2);
  } else if (value > minSalary && value <= maxSalary) {
    return getContribution(value);
  } else {
    return getContribution(maxSalary);
  }
};

const computeTotalDeductions =
  ({pagibig, philhealth, sss}: Deductions) => {
    return pagibig + philhealth + sss;
  };

const computeWithholdingTax = (value: number): number => {
  const getBracket = (salary: number): Bracket => {
    const brackets: Bracket[] = [
      {
        min: null,
        max: 20832,
        contribution: 0,
        initialContribution: 0,
      },
      {
        min: 20833,
        max: 33332,
        contribution: 0.2,
        initialContribution: 0,
      },
      {
        min: 33333,
        max: 66666,
        contribution: 0.25,
        initialContribution: 2500,
      },
      {
        min: 66667,
        max: 166666,
        contribution: 0.3,
        initialContribution: 10833,
      },
      {
        min: 166667,
        max: 666666,
        contribution: 0.32,
        initialContribution: 40833,
      },
      {
        min: 666667,
        max: null,
        contribution: 0.35,
        initialContribution: 200833,
      },
    ];

    const bracket = brackets.find(
      ({ min, max }) => {
        return (min ? salary > min : true) && (max ? salary < max : true);
      }
    );

    return bracket || {
      min: null,
      max: null,
      contribution: null,
      initialContribution: 0,
    };
  };

  const { min, contribution, initialContribution } = getBracket(value);
 
  const incomeTax: number = contribution
    ? ((value - (min || 0)) * contribution) + initialContribution
    : 0;

  return incomeTax;
};

const computeTaxableIncome = ({ salary, deductions }: TaxableIncome) => {
  return salary - deductions;
};

const isValidSalary = (value:number) => {
  return value > 335;
};

export {
  computeSss,
  computePhilhealth,
  computePagIbig,
  computeWithholdingTax,
  computeTotalDeductions,
  computeTaxableIncome,
  isValidSalary,
};