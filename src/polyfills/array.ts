import { at, groupBy, isNil, reject, sortBy, sum, sumBy, uniqBy } from 'lodash';

export { };

declare global {
  type Predicate<T, TResult> = (arg: T) => TResult;
  type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
  type Dictionary<T> = { [key: string]: T; }

  interface Array<T> {
    chunk(size: number): T[][];
    compact(): T[];
    difference(values: T[]): T[];
    drop(n?: number): T[];
    dropRight(n?: number): T[];
    first(n?: number): T | T[];
    flatDeep(): T[];
    fromPairs<P>(): Dictionary<P>;
    intersection(...arrays: T[][]): T[];
    takeRight(n?: number): T[];
    last(n?: number): T | T[];
    without(...values: T[]): T[];
    reject(predicate?: ArrayIterator<T, boolean>): T[];
    truthy(): T[];
    falsey(): T[];
    sum(): number;
    sumBy(iteratee?: Predicate<T, number>): number;
    groupBy(iteratee?: Predicate<T, number>): Dictionary<T[]>;
    uniqBy(iteratee?: Predicate<T, number>): T[];
    sortBy(...iteratees: ArrayIterator<T, T>[]): T[];
    put(newValue: T, predicate: ArrayIterator<T, boolean>): void;
    at(index: number): T;
  }

  interface ArrayConstructor {
    getValueOrDefault<T>(value: any | null | undefined, defaultValue: T[]): T[];
    getValueOrEmpty<T>(value: any | null | undefined): T[];
  }
}

Array.prototype.chunk = function (size: number): any[][] {
  return this.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

Array.prototype.compact = function (): any[] {
  return this.filter(Boolean);
}

Array.prototype.difference = function (values: any[]): any[] {
  return this.filter(t => !values.includes(t))
}

Array.prototype.drop = function (n: number = 1): any[] {
  return this.slice(n);
}

Array.prototype.dropRight = function (n: number = 1): any[] {
  return this.slice(0, -Math.abs(n));
}

Array.prototype.first = function (n: number = 1): any | any[] {
  if (n === 1) {
    [...this].shift();
  }

  return this.slice(0, n);
}

Array.prototype.flatDeep = function (): any[] {
  return this.flat(Infinity);
};

Array.prototype.fromPairs = function (): Dictionary<any> {
  return Object.fromEntries(this);
};

Array.prototype.intersection = function (...arrays: any[][]): any[] {
  arrays = [...this, ...arrays];
  return arrays.reduce((a, b) => a.filter(c => b.includes(c)));
};

Array.prototype.takeRight = function (n: number = 1): any[] {
  if (n < 1) {
    return [];
  }

  return this.slice(-Math.abs(n));
}

Array.prototype.last = function (n: number = 1): any | any[] {
  if (n === 1) {
    [...this].pop();
  }

  return this.slice(0, -Math.abs(n));
}

Array.prototype.without = function (...values: any[]): any[] {
  return this.filter(value => {
    return !values.includes(value);
  })
}

Array.prototype.reject = function (predicate?: ArrayIterator<any, boolean>): any[] {
  return reject(this, predicate);
}

Array.prototype.truthy = function (): any[] {
  return this.filter(p => !!p);
}

Array.prototype.falsey = function (): any[] {
  return this.reject(p => !!p);
}

Array.prototype.sum = function (): number {
  return sum(this);
};

Array.prototype.sumBy = function (iteratee?: Predicate<any, number>): number {
  return sumBy(this, iteratee);
};

Array.prototype.groupBy = function (iteratee?: Predicate<any, number>): Dictionary<any[]> {
  return groupBy(this, iteratee);
};

Array.prototype.uniqBy = function (iteratee: Predicate<any, number>): any[] {
  return uniqBy(this, iteratee);
};

Array.prototype.sortBy = function (...iteratees: ArrayIterator<any, any>[]): any[] {
  return sortBy(this, ...iteratees);
};

Array.prototype.put = function (newValue: any, predicate: ArrayIterator<any, boolean>): void {
  if (!newValue) return;

  const index = this.findIndex(predicate);

  if (~index) {
    this[index] = newValue;
    return;
  }

  this.push(newValue);
};

Array.prototype.at = function (index: number) {
  return at(this, index);
}

Array.getValueOrDefault = (value: any | null | undefined, defaultValue: any[]): any[] => {
  if (isNil(value)) {
    return defaultValue;
  }

  return value;
}

Array.getValueOrEmpty = (value: any | null | undefined): any[] => {
  if (isNil(value)) {
    return [];
  }

  return value;
};
