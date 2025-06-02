import {
  AnalysisData,
  /*  AnalysisListDataOption1,
  AnalysisListDataOption10,
  AnalysisListDataOption11,
  AnalysisListDataOption12,
  AnalysisListDataOption13,
  AnalysisListDataOption14,
  AnalysisListDataOption15,
  AnalysisListDataOption16, */
  AnalysisListDataOption19,
  /*  AnalysisListDataOption4,
  AnalysisListDataOption5,
  AnalysisListDataOption6,
  AnalysisListDataOption7,
  AnalysisListDataOption8,
  AnalysisListDataOption9, */
  courseExamData,
  exampleExamResultsData,
  // exampleExamResultsData2,
} from "./dummyData.ts";
import LearningOutcomeAnalysis from "../components/examResultComponents/tabTrialExam/LearningOutcomeAnalysis";
import TabsContainer from "../../guidance/components/organisms/TabsContainer.tsx";
import FilterGroup, {
  FilterDefinition,
} from "../../guidance/components/organisms/SearchFilter.tsx";
import { useNavigate } from "react-router-dom";
import ExamResultsTable from "../components/examResultComponents/tabTrialExam/ExamResultsTable";
import PerformanceChart from "../components/examResultComponents/tabTrialExam/PerformanceChart";
import CourseExam from "../components/examResultComponents/tabCourseExam";
import ResultsList from "../components/examResultComponents/TabResultsList";

const ExamsResult = () => {
  const navigate = useNavigate();

  const handleTabChange = (
    parentTabIndex: number,
    childTabIndex: number | null
  ) => {
    console.log(`Parent Tab: ${parentTabIndex}, Child Tab: ${childTabIndex}`);
  };

  const filters: FilterDefinition[] = [
    {
      key: "filter1",
      label: "Tarih Aralığı",
      type: "doubledate",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 1 changed:", value),
    },
    {
      key: "filter2",
      label: "Sınıf Seviyesi",
      type: "multiselect",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 2 changed:", value),
    },
    {
      key: "filter3",
      label: "Sınıf / Şube",
      type: "select",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 3 changed:", value),
    },
    {
      key: "filter4",
      label: "Öğrenci",
      type: "select",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 4 changed:", value),
    },
    {
      key: "filter5",
      label: "Sınav Türü",
      type: "select",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 5 changed:", value),
    },
    {
      key: "filter6",
      label: "Sınavlar",
      type: "multiselect",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 5 changed:", value),
    },
  ];

  const tabsConfig = [
    {
      label: "Deneme Sınav",
      content: (
        <div className="flex flex-col gap-4 container">
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <ExamResultsTable {...exampleExamResultsData} />
          <PerformanceChart {...exampleExamResultsData} />
          <LearningOutcomeAnalysis data={AnalysisData} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ders Sınav",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <CourseExam data={courseExamData} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Sonuc Listesi",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <ResultsList {...AnalysisListDataOption19} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div
      className="flex"
      style={{
        display: "inline-flex",
        padding: "23px 811px 0px 50px",
        alignItems: "center",
      }}
    >
      <TabsContainer tabs={tabsConfig} onTabChange={handleTabChange} />
    </div>
  );
};

export default ExamsResult;
