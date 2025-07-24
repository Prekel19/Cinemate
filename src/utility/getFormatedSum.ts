export const getFormatedSum = (value: number): string => {
  const result: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return result;
};
