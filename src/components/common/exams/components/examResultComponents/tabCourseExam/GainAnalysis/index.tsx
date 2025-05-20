import { useState } from "react";
import AnalysisTable from "../../AnalysisTable.tsx";
import TestSelector from "../../../TestSelector.tsx";
import HeaderBlock from "../../headerSection/headerBlock/HeaderBlock.tsx";

const GainAnalysis: React.FC<any> = ({ data }) => {
  const [activeTestIndex, setActiveTestIndex] = useState<number | null>(null);

  const handleTestSelect = (index: number) => {
    setActiveTestIndex((prev) => (prev === index ? null : index));
  };

  const testSelectorHeight = `${data.length * 32.5}px`;
  console.log(data);

  return (
    <div>
      <HeaderBlock
        text="SORULARA GÖRE KAZANIM ANALİZİ"
        fill="#A76BF8"
        stroke="#E6EFF3"
        width="100%"
        height="25px"
      />
      <TestSelector
        activeIndex={0}
        onSelect={handleTestSelect}
        data={data}
        width="100%"
        height={testSelectorHeight}
        activeBgColor="#FFFFFF"
        activeTextColor="#000000"
        passiveBgColor="#FFFFFF"
        passiveTextColor="#000000"
        textStyle={{ fontSize: "14px", fontWeight: 100 }}
      />
      <AnalysisTable
        data={data}
        activeTestIndex={activeTestIndex}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default GainAnalysis;
