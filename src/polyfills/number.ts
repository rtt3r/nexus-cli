import { isNaN, isNil } from 'lodash';

export { };

declare global {
  interface Number {
    formatDecimal(minimumIntegerDigits?: number): string | undefined;
  }

  interface NumberConstructor {
    isNil(value: number | null | undefined): value is null | undefined;
    getValueOrDefault(value: number | null | undefined, defaultValue: number): number;
  }
}

Number.prototype.formatDecimal = function (minimumIntegerDigits: number = 2) {
  return new Intl.NumberFormat('en-us', { minimumFractionDigits: minimumIntegerDigits, useGrouping: false }).format(+this);
}

Number.isNil = (value: any): value is null | undefined => isNil(value);

Number.getValueOrDefault = (value: any, defaultValue: any) => {
  if (isNil(value) || isNaN(value)) {
    return defaultValue;
  }

  return value;
}

