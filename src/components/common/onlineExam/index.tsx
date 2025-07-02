import TabsContainer from "../guidance/components/organisms/TabsContainer";
import ListFilter from "./tabActive";
import ExamControl from "./tabExamControl";

const OnlineExam = () => {
  const tabsConfig = [
    {
      label: "Aktif",
      content: (
        <>
          <ListFilter view="all" />
        </>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Yaklaşan",
      content: (
        <>
          <ListFilter view="soon" showButton={false} />
        </>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Sınav Kontrol",
      content: <>
      <ExamControl />
      </>,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div>
      <TabsContainer tabs={tabsConfig} />
    </div>
  );
};

export default OnlineExam;