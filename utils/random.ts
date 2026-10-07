export const getRandomEmail = (): string => {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `qa.sunflower.${randomString}@example.com`;
};
