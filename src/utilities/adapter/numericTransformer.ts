const numericTransformer = {
  to: (value: number) => value,
  from: (value: string): number => Number.parseFloat(value),
};
export default numericTransformer;