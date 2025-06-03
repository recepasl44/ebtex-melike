import TabsContainer from "../components/organisms/TabsContainer";
import AnnualPlanListFilter from "./Tab1/annual-plan-List-filter";
import HomeworkListFilter from "./Tab1/TabChild1/homework-process-list-filter";
import InterviewListFilter from "./Tab1/TabChild2";
import HomeworkNumbersFilter from "./Tab1/TabChild3";
import StatusNumbersFilter from "./Tab1/TabChild4";
import PositionmatikListFilter from "./Tab3/positionmatic-list-filter";
import PositionmatikTable from "./Tab2/Tabchild1234/PositionmatikTable";
import QuestionTimeFilter from "./Tab4";
import PlanCalendarFilter from "./Tab5";

const WorkSchedule = () => {
  const handleAnnualPlanChange = (data: { id: string; name: string }) => {
    console.log("Selected Annual Plan:", data);
  };

  const tabsConfig = [
    {
      label: "Yıllık Plan",
      content: (
        <div>
          <AnnualPlanListFilter annualPlanChange={handleAnnualPlanChange} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Periyodik Ödev",
      content: <></>,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
      children: [
        {
          label: "Ödev Süresi",
          content: (
            <div>
              <HomeworkListFilter HomeworkListChange={handleAnnualPlanChange} />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "Görüşme Listesi",
          content: (
            <div>
              <InterviewListFilter
                InterviewListChange={handleAnnualPlanChange}
              />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "Ödev Sayıları",
          content: (
            <div>
              <HomeworkNumbersFilter
                HomeworkNumbersChange={handleAnnualPlanChange}
              />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "Durum Sayıları",
          content: (
            <div>
              <StatusNumbersFilter
                StatusNumbersChange={handleAnnualPlanChange}
              />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
      ],
    },
    {
      label: "Konumatik",
      content: (
        <div>
          <PositionmatikListFilter
            PositionmatikChange={handleAnnualPlanChange}
          />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
      children: [
        {
          label: "1. Ödev",
          content: (
            <div>
              <PositionmatikTable />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "2. Ödev",
          content: (
            <div>
              <PositionmatikTable />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "3. Ödev",
          content: (
            <div>
              <PositionmatikTable />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
        {
          label: "4. Ödev",
          content: (
            <div>
              <PositionmatikTable />
            </div>
          ),
          activeBgColor: "#9E5CF7",
          activeTextColor: "#FFFFFF",
          passiveBgColor: "#9E5CF726",
          passiveTextColor: "#9E5CF7",
        },
      ],
    },
    {
      label: "Soru Saat",
      content: (
        <div>
          <QuestionTimeFilter QuestionTimeChange={handleAnnualPlanChange} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Plan Takvim",
      content: (
        <div>
          <PlanCalendarFilter PlanCalendarChange={handleAnnualPlanChange} />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div>
      <h5>Çalışma Takvimi</h5>
      <TabsContainer tabs={tabsConfig} />
    </div>
  );
};

export default WorkSchedule;
