import { useState } from "react";
import TabsContainer from "../../guidance/components/organisms/TabsContainer";
import PersonelTuitionFeeCrud from "../tabs/ders-ucreti/crud";
import PersonelCouponCrud from "../tabs/kupon/crud";
import PersonelCoachingCrud from "../tabs/kocluk/crud";
import PersonelSpecialCrud from "../tabs/ozel-ders/crud";

const LessonOctFeePage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: "Ders Ücreti",
      content: <PersonelTuitionFeeCrud />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ders – Soru Çözüm Ücretleri",
      content: <PersonelCouponCrud />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Koçluk Ücreti",
      content: <PersonelCoachingCrud />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Özel Ders",
      content: <PersonelSpecialCrud />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div>
      <TabsContainer tabs={tabsConfig} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default LessonOctFeePage;
