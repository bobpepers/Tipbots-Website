export const formatNumber = (value) => (Math.floor(value * 100) / 100).toString()

export const formatDuration = (seconds) => {
  let s = parseInt(seconds, 10);
  let m = 0;
  let h = 0;
  if (s >= 60) {
    m = parseInt(s / 60, 10);
    s = parseInt(s % 60, 10);
    if (m >= 60) {
      h = parseInt(m / 60, 10);
      m = parseInt(m % 60, 10);
    }
  }
  let text = `${s} seconds`;
  if (m > 0) text = `${m} minutes ${text}`;
  if (h > 0) text = `${h} Hours ${text}`;
  return text;
}
const shouldBeSortedAs = [
  'RunesTip',
  'PirateTip',
  'TokelTip',
  'SecretTip',
  'StellarTip',
];

export const tipbotSort = (x, y) => shouldBeSortedAs.indexOf(x) - shouldBeSortedAs.indexOf(y)
