import { JSX } from "react";
import { HeaderRowsProps } from "./types";
import styles from "./header-rows.module.css";

export const HeaderRows = ({
  titles,
  ...props
}: HeaderRowsProps): JSX.Element => (
  <thead className={styles.headerRows} {...props}>
    <tr>
      {titles.map((title, index) => (
        <th key={index} scope="col">
          {title}
        </th>
      ))}
    </tr>
  </thead>
);
