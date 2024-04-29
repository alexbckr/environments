// normalize a value from [0, 1] to [min, max]
export const normalize = (value: number, range: number[]) =>
  value * (range[1] - range[0]) + range[0];
