import React, { useState } from "react";
import TestSelector from "../../../TestSelector.tsx";
import AnalysisTable from "../../AnalysisTable.tsx";
import "./index.css";
import HeaderBlock from "../../headerSection/headerBlock/HeaderBlock.tsx";

const LearningOutcomeAnalysis: React.FC<any> = ({ data }) => {
  const [activeTestIndex, setActiveTestIndex] = useState<number | null>(null);
  const handleTestSelect = (index: number) => {
    setActiveTestIndex((prev) => (prev === index ? null : index));
  };
  const testSelectorHeight = `${data.length * 32.5}px`;

  return (
    <div className="d-flex flex-column gap-1 table-responsive" >
    <HeaderBlock
      text="SORULARA GÖRE KAZANIM ANALİZİ"
      fill="#0082FF"
      stroke="#E6EFF3"
      width="100%"
      height="26px"
    />
    <TestSelector
      data={data}
      activeIndex={activeTestIndex}
      onSelect={handleTestSelect}
      width="100%"
      height={testSelectorHeight}

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

export default LearningOutcomeAnalysis;
