import { data, getFormattedDate } from "../assets/data";
import { ChartOptionsParams, DailyData, TableTitles } from "../types/types";
import Highcharts from "highcharts";

export const tableTitles: TableTitles = {
  header: ["Показатель", "Текущий день", "Вчера", "Этот день недели"],
  sideHeaders: [
    "Выручка, руб",
    "Средний чек, руб",
    "Средний гость, руб",
    "Удаления из чека (после оплаты), руб",
    "Удаления из чека (до оплаты), руб",
    "Количество чеков",
    "Количество гостей",
  ],
  subRevenue: ["Наличные", "Безналичный расчет", "Кредитные карты"],
};

export const getDailyStats = (): Record<
  "todayData" | "yesterdayData",
  DailyData
> => {
  const today = getFormattedDate(0);
  const yesterday = getFormattedDate(1);

  const todayData =
    data.find((item) => item.date === today) ?? getDefaultDailyData(today);
  const yesterdayData =
    data.find((item) => item.date === yesterday) ??
    getDefaultDailyData(yesterday);

  return {
    todayData,
    yesterdayData,
  };
};

const getDefaultDailyData = (date: string): DailyData => ({
  date,
  revenue: { total: 0, cash: 0, cashless: 0, credit_cards: 0 },
  average_check: 0,
  average_guest: 0,
  deletions: { post_payment: 0, pre_payment: 0 },
  counts: { checks: 0, guests: 0 },
});

export const getChartOptions = ({
  title,
  xAxisTitle,
  yAxisTitle,
  xData,
  yData,
  color = "#1E90FF",
}: ChartOptionsParams): Highcharts.Options => {
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const sortedData = xData
    .map((date, index) => ({ date, value: yData[index] }))
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  return {
    title: { text: title },
    xAxis: {
      categories: sortedData.map((item) => item.date),
      title: { text: xAxisTitle },
    },
    yAxis: { title: { text: yAxisTitle } },
    series: [
      {
        name: title,
        type: "line",
        data: sortedData.map((item) => item.value),
        color: color,
      },
    ],
    accessibility: { enabled: false },
  };
};

export const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const calculatePercentageDifference = (
  today: number,
  yesterday: number
): string => {
  if (yesterday === 0) return "∞%";
  const difference = ((today - yesterday) / Math.abs(yesterday)) * 100;
  return difference > 0
    ? `+${difference.toFixed(1)}%`
    : `${difference.toFixed(1)}%`;
};

export const getDataKey = (header: string): string | null => {
  const dataKeys: Record<string, string> = {
    "Выручка, руб": "revenue.total",
    "Средний чек, руб": "average_check",
    "Средний гость, руб": "average_guest",
    "Удаления из чека (после оплаты), руб": "deletions.post_payment",
    "Удаления из чека (до оплаты), руб": "deletions.pre_payment",
    "Количество чеков": "counts.checks",
    "Количество гостей": "counts.guests",
  };

  return dataKeys[header] || null;
};
