import { isNil } from 'lodash';

export { };

declare global {
  interface ObjectConstructor {
    isNil(value: any): value is null | undefined;
    getValueOrDefault<T>(value: any, defaultValue: T): T;
  }
}

Object.isNil = (value: any): value is null | undefined => isNil(value);

Object.getValueOrDefault = (value: any, defaultValue: any) => {
  if (isNil(value)) {
    return defaultValue;
  }

  return value;
}
