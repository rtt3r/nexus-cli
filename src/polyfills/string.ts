export { };

declare global {
  interface String {
    format(...replacements: string[]): string;
    trimEnd(...char: string[]): string;
    reverse(): string;
  }
}

String.prototype.format = function () {
  const args = arguments;
  const sprintfRegex = /\{(\d+)\}/g;

  const sprintf = (match: any, num: number) => {
    return num in args ? args[num] : match;
  };

  return this.replace(sprintfRegex, sprintf);
};

String.prototype.trimEnd = function () {
  let text = `${this}`;

  if (!text)
    return text;

  const args = Array.from(arguments)
    .map(arg => `\\${arg}`)
    .join('');

  const pattern = new RegExp('[' + args + ']+$', 'g');

  return text.replace(pattern, '');
}

String.prototype.reverse = function () {
  const str = this;

  const split = str.split("");
  const reverseArray = split.reverse();

  return reverseArray.join("");
}
