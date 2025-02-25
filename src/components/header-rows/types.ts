import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderRowsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  titles: string[];
}
