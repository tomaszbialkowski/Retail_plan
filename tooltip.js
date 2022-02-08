// export

const tooltips = [
  'UPS... Jeszcze nie działam :(',
  'Jeszcze długo nie.',
  'Nie tak prędko, nie zaprogramowano mnie.',
  'Oh nie... jeszcze nie działam',
  'Nieaktywne przyciski są nieaktywne, NADAL!',
  'Zadziałam, ale nie dzisiaj...',
];

export function setTooltip(min = 0, max = tooltips.length - 1) {
  const index = Math.floor(Math.random() * (max - min + 1)) + min;
  return tooltips[index];
}
