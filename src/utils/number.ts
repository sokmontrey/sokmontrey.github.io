export function toRoman(num: number) {
  const roman_values = {
    x: 10,
    ix: 9,
    v: 5,
    iv: 4,
    i: 1,
  };

  let roman = "";
  for (let key in roman_values) {
    while (num >= roman_values[key]) {
      roman += key;
      num -= roman_values[key];
    }
  }
  return roman;
}
