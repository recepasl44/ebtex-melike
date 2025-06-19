import React, { useState } from "react";
import TabsContainer from "../guidance/components/organisms/TabsContainer";
import Pageheader from "../../page-header/pageheader";

import TuitionFeesTab from "../personel/personelDetail/tabs/ders-ucreti/table";
import CouponTab from "../personel/personelDetail/tabs/kupon/table";
import CoachingTab from "../personel/personelDetail/tabs/kocluk/table";
import SpecialTab from "../personel/personelDetail/tabs/ozel-ders/table";

const LessonOctFeeIndex: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabs = [
    {
      label: "Ders Ücreti",
      content: <TuitionFeesTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ders – Soru Çözüm Ücretleri",
      content: <CouponTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Koçluk Ücreti",
      content: <CoachingTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Özel Ders",
      content: <SpecialTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div>
      <Pageheader title="Personel Yönetimi" currentpage="Ders & Ek Ücretler" />
      <TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default LessonOctFeeIndex;
