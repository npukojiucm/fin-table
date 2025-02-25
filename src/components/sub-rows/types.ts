import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DailyData } from "../../types/types";

export interface SubRowsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
  dailyStats: Record<"todayData" | "yesterdayData", DailyData>;
  allData: DailyData[];
}
