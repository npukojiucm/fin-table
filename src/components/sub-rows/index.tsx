import { useState } from "react";
import { SubRowsProps } from "./types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  calculatePercentageDifference,
  getChartOptions,
} from "../../utils/utils";
import styles from "./sub-rows.module.css";
import React from "react";

export const SubRows = ({ dailyStats, allData }: SubRowsProps) => {
  const [expandedSubRow, setExpandedSubRow] = useState<string | null>(null);

  const toggleSubRow = (subHeader: string) => {
    setExpandedSubRow((prev) => (prev === subHeader ? null : subHeader));
  };

  return (
    <React.Fragment>
      {(["cash", "cashless", "credit_cards"] as const).map((type) => {
        const subTitle =
          type === "cash"
            ? "Наличные"
            : type === "cashless"
            ? "Безналичный расчет"
            : "Кредитные карты";

        return (
          <React.Fragment key={type}>
            <tr
              onClick={() => toggleSubRow(subTitle)}
              className={`${styles.subRow} ${
                expandedSubRow === subTitle ? styles.activeSubRow : ""
              }`}
            >
              <th>{subTitle}</th>
              <td className={styles.blueColumn}>
                {dailyStats.todayData.revenue[type]}
              </td>
              <td
                className={`${styles.percentageCell} ${
                  dailyStats.todayData.revenue[type] >
                  dailyStats.yesterdayData.revenue[type]
                    ? styles.positive
                    : styles.negative
                }`}
              >
                <span>{dailyStats.yesterdayData.revenue[type]}</span>
                <span
                  className={
                    dailyStats.todayData.revenue[type] >
                    dailyStats.yesterdayData.revenue[type]
                      ? styles.percentagePositive
                      : styles.percentageNegative
                  }
                >
                  (
                  {calculatePercentageDifference(
                    dailyStats.todayData.revenue[type],
                    dailyStats.yesterdayData.revenue[type]
                  )}
                  )
                </span>
              </td>
              <td
                className={
                  dailyStats.todayData.revenue[type] >
                  dailyStats.yesterdayData.revenue[type]
                    ? styles.positive
                    : styles.negative
                }
              >
                {dailyStats.yesterdayData.revenue[type]}
              </td>
            </tr>

            {expandedSubRow === subTitle && (
              <tr>
                <td colSpan={4}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={getChartOptions({
                      title: `${subTitle} за весь период`,
                      xAxisTitle: "Дата",
                      yAxisTitle: "Сумма (₽)",
                      xData: allData.map((stat) => stat.date),
                      yData: allData.map((stat) => stat.revenue[type]),
                    })}
                  />
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
