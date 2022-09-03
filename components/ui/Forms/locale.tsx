import { mapLocale } from '@/utils/localize';

interface Locale {
  firstName: string,
  lastName: string,
}

const locale = (param: Locale) => {
  return {
    iWantTo: 'I want to calculate my',
  };
};

const localize = mapLocale(locale);

export { localize };