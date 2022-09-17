import { mapLocale } from '@/utils/localize';

const localize = mapLocale(() => {
  return {
    exlusions: `Other pays such as 13th month pay and other bonuses are excluded
      in the computation below.`,
  };
});

export { localize };