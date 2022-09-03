import { mapLocale } from '@/utils/localize';

interface Locale {
  percentage: string,
  netDifferenceValue: string,
  netDifferencePercentage: string,
}

const locale = (param: Locale) => {
  const raiseSummary =
    <>
      A {param?.percentage} increase in your monthly gross increases your
      monthly net by {param?.netDifferenceValue} which is
      &nbsp;{param?.netDifferencePercentage} higher than your current monthly
      net.
    </>;

  return {
    raiseSummary,
  };
};

const localize = mapLocale(locale);

export { localize };