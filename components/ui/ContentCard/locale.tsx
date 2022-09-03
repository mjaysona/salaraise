import { mapLocale } from '@/utils/localize';

const locale = () => {
  return {
    exlusions: `Other pays such as 13th month pay and other bonuses are excluded
      in the computation below.`,
  };
};

const localize = mapLocale(locale);

export { localize };