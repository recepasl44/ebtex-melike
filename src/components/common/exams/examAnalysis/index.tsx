import { useNavigate } from "react-router-dom";
import TabsContainer from "../../guidance/components/organisms/TabsContainer";
import {
  courseSuccessdata,
  examPerformanceData,
  IncomplateGainData,
  StatusReportdata,
} from "./dummyData";
import FilterGroup, {
  FilterDefinition,
} from "../../guidance/components/organisms/SearchFilter";
import TabcourseSuccess from "../components/examAnalysisComponents/TabcourseSuccess";
import TabGainPerformance from "../components/examAnalysisComponents/TabGainPerformance";
import StatusReport from "../components/examAnalysisComponents/TabStatusReport";
import ClassComparison from "../components/examAnalysisComponents/TabClassComparison";
import ExamPerformance from "../components/examAnalysisComponents/TabExamPerformance";
import BranchComparison from "../components/examAnalysisComponents/TabBranchComparison";
import IncomplateGain from "../components/examAnalysisComponents/TabIncompleteGain";

const ExamAnalysis = () => {
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
      type: "select",
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
      type: "select",
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      onChange: (value: string) => console.log("Filter 5 changed:", value),
    },
  ];

  const tabsConfig = [
    {
      label: "Ders Başarı",
      content: (
        <div className="mt-4">
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <TabcourseSuccess initialData={courseSuccessdata} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Kazanım Performansı",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <TabGainPerformance initialData={courseSuccessdata} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Sınıf Karşılaştırma",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <ClassComparison initialData={courseSuccessdata} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Durum Raporu",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <StatusReport initialData={StatusReportdata} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Sınav Performansı",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <ExamPerformance initialData={examPerformanceData} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Şube Karşılaştırma",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <BranchComparison initialData={examPerformanceData} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Eksik Kazanımlar",
      content: (
        <div>
          <FilterGroup
            filters={filters}
            navigate={navigate}
            columnsPerRow={4}
          />
          <IncomplateGain initialData={IncomplateGainData} />
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
        padding: "76px 192px 544px 2px",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TabsContainer tabs={tabsConfig} onTabChange={handleTabChange} />
    </div>
  );
};

export default ExamAnalysis;
