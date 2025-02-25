import { useState } from "react";
import { BodyRowsProps } from "./types";
import {
  getNestedValue,
  calculatePercentageDifference,
  getDataKey,
} from "../../utils/utils";
import styles from "./body-rows.module.css";
import React from "react";
import { SubRows } from "../sub-rows";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getChartOptions } from "../../utils/utils";

export const BodyRows = ({
  sideHeaders,
  dailyStats,
  allData,
}: BodyRowsProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (header: string) => {
    setExpandedRow((prev) => (prev === header ? null : header));
  };

  return (
    <tbody className={styles.body}>
      {sideHeaders.map((head, index) => {
        const dataKey = getDataKey(head);
        if (!dataKey) return null;

        const today = getNestedValue(dailyStats.todayData, dataKey);
        const yesterday = getNestedValue(dailyStats.yesterdayData, dataKey);
        const hasSubRows = head === "Выручка, руб";

        return (
          <React.Fragment key={index}>
            <tr onClick={() => toggleRow(head)} className={styles.bodyRow}>
              <th scope="row">{head}</th>
              <td>{today}</td>
              <td
                className={`${
                  today > yesterday ? styles.positive : styles.negative
                }`}
              >
                <span>{yesterday}</span>
                <span
                  className={`${
                    today > yesterday
                      ? styles.percentagePositive
                      : styles.percentageNegative
                  }`}
                >
                  ({calculatePercentageDifference(today, yesterday)})
                </span>
              </td>
              <td
                className={`${
                  today > yesterday ? styles.positive : styles.negative
                }`}
              >
                {yesterday}
              </td>
            </tr>

            {expandedRow === head && (
              <>
                <tr>
                  <td colSpan={4}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={getChartOptions({
                        title: `${head} за весь период`,
                        xAxisTitle: "Дата",
                        yAxisTitle: "Сумма (₽)",
                        xData: allData.map((stat) => stat.date),
                        yData: allData.map((stat) =>
                          getNestedValue(stat, dataKey)
                        ),
                      })}
                    />
                  </td>
                </tr>

                {hasSubRows && (
                  <SubRows dailyStats={dailyStats} allData={allData} />
                )}
              </>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};
