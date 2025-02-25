import { DailyData } from "../types/types";

export const getFormattedDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const getRandomChange = (
  base: number,
  minChange: number,
  maxChange: number
) => {
  const change = Math.floor(
    Math.random() * (maxChange - minChange + 1) + minChange
  );
  return base + change;
};

export const data: DailyData[] = Array.from({ length: 5 }, (_, index) => {
  const isIncrease = Math.random() > 0.5;
  const sign = isIncrease ? 1 : -1;

  return {
    date: getFormattedDate(index),
    revenue: {
      total: getRandomChange(250000, -10000 * sign, 10000 * sign),
      cash: getRandomChange(100000, -5000 * sign, 5000 * sign),
      cashless: getRandomChange(120000, -6000 * sign, 6000 * sign),
      credit_cards: getRandomChange(30000, -2000 * sign, 2000 * sign),
    },
    average_check: getRandomChange(5200, -300 * sign, 300 * sign),
    average_guest: getRandomChange(3800, -200 * sign, 200 * sign),
    deletions: {
      post_payment: getRandomChange(1200, -200 * sign, 200 * sign),
      pre_payment: getRandomChange(2400, -400 * sign, 400 * sign),
    },
    counts: {
      checks: getRandomChange(350, -20 * sign, 20 * sign),
      guests: getRandomChange(800, -50 * sign, 50 * sign),
    },
  };
});
