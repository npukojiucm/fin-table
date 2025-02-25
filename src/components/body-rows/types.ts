import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DailyData } from "../../types/types";

export interface BodyRowsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  sideHeaders: string[];
  dailyStats: Record<"todayData" | "yesterdayData", DailyData>;
  allData: DailyData[];
}
