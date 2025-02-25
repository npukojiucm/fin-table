type Revenue = {
  total: number;
  cash: number;
  cashless: number;
  credit_cards: number;
};

type Deletions = {
  post_payment: number;
  pre_payment: number;
};

type Counts = {
  checks: number;
  guests: number;
};

export type DailyData = {
  date: string;
  revenue: Revenue;
  average_check: number;
  average_guest: number;
  deletions: Deletions;
  counts: Counts;
};


type TableTitleKeys = "header" | "sideHeaders" | "subRevenue";
export type TableTitles = Record<TableTitleKeys, string[]>;

export type ChartOptionsParams = {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  xData: string[];
  yData: number[];
  color?: string;
};

