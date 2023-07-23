export const getRandomBoolean = () => {
  const randomNumber = Math.random();
  return randomNumber < 0.5;
};

export const getRandomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
