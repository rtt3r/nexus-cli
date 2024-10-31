import { DateTime, Duration, DurationUnits } from 'luxon';

export { };

declare global {
  interface Date {
    addYears(years: number): Date;
    addMonths(months: number): Date;
    addDays(days: number): Date;
    addSeconds(seconds: number): Date;
    date(): Date;
    isToday(): boolean;
    clone(): Date;
    isWeekend(): boolean;
    equals(date: Date): boolean;
    isBefore(date: Date): boolean;
    isBefore(date: Date): boolean;
    isBetween(from: Date, to: Date): boolean;
    isAfter(date: Date): boolean;
    isSameOrBefore(date: Date): boolean;
    isSameOrAfter(date: Date): boolean;
    format(format?: string): string | null;
    isValid(): boolean;
    diff(from: Date, unitOfTime?: DurationUnits): Duration;
  }

  interface DateConstructor {
    today(): Date;
  }

  type diff = (
    'year' | 'years' | 'y' |
    'month' | 'months' | 'M' |
    'week' | 'weeks' | 'w' |
    'day' | 'days' | 'd' |
    'hour' | 'hours' | 'h' |
    'minute' | 'minutes' | 'm' |
    'second' | 'seconds' | 's' |
    'millisecond' | 'milliseconds' | 'ms' |
    'quarter' | 'quarters' | 'Q'
  );
}

Date.prototype.format = function (format?: string): string | null {

  const luxon = DateTime.fromJSDate(this);

  if (!!format) {
    return luxon.toFormat(format);
  }

  return luxon.toISO();
};

Date.prototype.isValid = function (): boolean {
  if (!this) {
    return false;
  }

  return DateTime.fromJSDate(this).isValid;
};

Date.prototype.addYears = function (years: number): Date {
  if (!years) {
    return this;
  }

  return DateTime.fromJSDate(this)
    .plus({ years })
    .toJSDate();
};

Date.prototype.addMonths = function (months: number): Date {
  if (!months) {
    return this;
  }

  return DateTime.fromJSDate(this)
    .plus({ months })
    .toJSDate();
};

Date.prototype.addDays = function (days: number): Date {
  if (!days) {
    return this;
  }

  return DateTime.fromJSDate(this)
    .plus({ days })
    .toJSDate();
};

Date.prototype.addSeconds = function (seconds: number): Date {
  if (!seconds) {
    return this;
  }

  return DateTime.fromJSDate(this)
    .plus({ seconds })
    .toJSDate();
};

Date.prototype.date = function (): Date {
  return DateTime
    .fromJSDate(this)
    .startOf('day')
    .toJSDate();
};

Date.prototype.isToday = function (): boolean {
  const today = DateTime
    .now()
    .startOf('day');

  const date = DateTime
    .fromJSDate(this)
    .startOf('day');

  return date === today;
};

Date.prototype.clone = function (): Date {
  return DateTime
    .fromJSDate(this)
    .toJSDate();
};

Date.prototype.isWeekend = function (): boolean {
  return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.equals = function (date: Date): boolean {
  return DateTime.fromJSDate(this) === DateTime.fromJSDate(date);
};

Date.prototype.isBefore = function (date: Date): boolean {
  return DateTime.fromJSDate(this) < DateTime.fromJSDate(date);
}

Date.prototype.isBetween = function (from: Date, to: Date): boolean {
  const date = DateTime.fromJSDate(this);
  return date >= DateTime.fromJSDate(from) && date <= DateTime.fromJSDate(to);
}

Date.prototype.isAfter = function (date: Date): boolean {
  return DateTime.fromJSDate(this) > DateTime.fromJSDate(date);
}

Date.prototype.isSameOrBefore = function (date: Date): boolean {
  return DateTime.fromJSDate(this) <= DateTime.fromJSDate(date);
}

Date.prototype.isSameOrAfter = function (date: Date): boolean {
  return DateTime.fromJSDate(this) >= DateTime.fromJSDate(date);
}

Date.prototype.diff = function (from: Date, unitOfTime?: DurationUnits): Duration {
  return DateTime.fromJSDate(this).diff(DateTime.fromJSDate(from), unitOfTime, { conversionAccuracy: 'longterm' });
};

Date.today = function () {
  return DateTime
    .now()
    .startOf('day')
    .toJSDate();
}
