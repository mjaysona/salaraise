const mapLocale = (locale: Function) => {
  return (...args: any) => locale(args[1])[args[0]];
};

export { mapLocale };