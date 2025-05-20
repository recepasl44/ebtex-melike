import React from "react";
import { AnalysisListType } from "../../../../../../types/exam/analysisListType.ts";
import MultiRowTable from "./multiRowTable";
import { TableRow } from "./multiRowTable/type.ts";
import { getHeaderBlockColor } from "../../../../../../utils/headerBlockColor.tsx";
import Option1 from "./option1";
import Option2 from "./option2";
import Option3 from "./option3";
import Option4 from "./option4";
import Option5 from "./option5";
import Option6 from "./option6";
import Option7 from "./option7";
import Option8 from "./option8";
import Option9 from "./option9";
import Option10 from "./option10";
import Option11 from "./option11/inde.tsx";
import Option12 from "./option12";
import Option13 from "./option13";
import Option14 from "./option14";
import Option15 from "./option15";
import HeaderBlock from "../headerSection/headerBlock/HeaderBlock.tsx";
import Option16 from "./option16/index.tsx";
import Option19 from "./option19/index.tsx";

interface ResultsListProps extends AnalysisListType {}

const ResultsList: React.FC<ResultsListProps> = (props) => {
  const { ordered_list_type } = props;

  const getRowsByType = (): TableRow[] => {
    switch (ordered_list_type) {
      case 1:
        return Option1(props);
      case 2:
        return Option2(props);
      case 3:
        return Option3(props);
      case 4:
        return Option4(props);
      case 5:
        return Option5(props);
      case 6:
        return Option6(props);
      case 7:
        return Option7(props);
      case 8:
        return Option8(props);
      case 9:
        return Option9(props);
      case 10:
        return Option10(props);
      case 11:
        return Option11(props);
      case 12:
        return Option12(props);
      case 13:
        return Option13(props);
      case 14:
        return Option14(props);
      case 15:
        return Option15(props);
      case 16:
        return Option16(props);
      case 17:
        return Option16(props);
      case 18:
        return Option16(props);
      case 19:
        return Option19(props);
      default:
        return [];
    }
  };

  const tableRows = getRowsByType();

  return (
    <div className="d-flex flex-column w-100">
      <HeaderBlock
        text={props.quiz}
        fill={getHeaderBlockColor(ordered_list_type)}
        stroke="#E6EFF3"
        width="100%"
        height="23px"
      />
      <MultiRowTable rows={tableRows} />
    </div>
  );
};

export default ResultsList;
