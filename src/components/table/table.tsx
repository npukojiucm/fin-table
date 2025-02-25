import { data } from "../../assets/data";
import { getDailyStats, tableTitles } from "../../utils/utils";
import { BodyRows } from "../body-rows";
import { HeaderRows } from "../header-rows";

export default function Table() {
  const dailyStats = getDailyStats();

  return (
    <table>
      <HeaderRows titles={tableTitles.header} />
      <BodyRows
        sideHeaders={tableTitles.sideHeaders}
        dailyStats={dailyStats}
        allData={data}
      />
    </table>
  );
}
