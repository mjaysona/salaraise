const formatAmount = (value: number|undefined): string => {
  const options = { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  const formattedAmount = value?.toLocaleString('en', options);;
  
  return formattedAmount || '';
};

export { formatAmount };