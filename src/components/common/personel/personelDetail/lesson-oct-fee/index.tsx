import { useState } from "react";
import { useParams } from "react-router-dom";
import TabsContainer from "./component/organisms/TabsContainer";
import TuitionFeesTab from "../tabs/ders-ucreti/table";
import CouponTab from "../tabs/kupon/table";
import CoachingTab from "../tabs/kocluk/table";
import SpecialTab from "../tabs/ozel-ders/table";
import Pageheader from "../../../../page-header/pageheader";

const LessonOctFeeIndex: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const personelId = id ? Number(id) : 0;
    const [activeIdx, setActiveIdx] = useState(0);

    const tabsConfig = [
        {
            label: "Ders Ücreti",
            content: (
                <TuitionFeesTab personelId={personelId} enabled={activeIdx === 0} />
            ),
            activeBgColor: "#5C67F7",
            activeTextColor: "#FFFFFF",
            passiveBgColor: "#5C67F726",
            passiveTextColor: "#5C67F7",
        },
        {
            label: "Ders – Soru Çözüm Ücretleri",
            content: (
                <CouponTab personelId={personelId} enabled={activeIdx === 1} />
            ),
            activeBgColor: "#5C67F7",
            activeTextColor: "#FFFFFF",
            passiveBgColor: "#5C67F726",
            passiveTextColor: "#5C67F7",
        },
        {
            label: "Koçluk Ücreti",
            content: (
                <CoachingTab personelId={personelId} enabled={activeIdx === 2} />
            ),
            activeBgColor: "#5C67F7",
            activeTextColor: "#FFFFFF",
            passiveBgColor: "#5C67F726",
            passiveTextColor: "#5C67F7",
        },
        {
            label: "Özel Ders",
            content: (
                <SpecialTab personelId={personelId} enabled={activeIdx === 3} />
            ),
            activeBgColor: "#5C67F7",
            activeTextColor: "#FFFFFF",
            passiveBgColor: "#5C67F726",
            passiveTextColor: "#5C67F7",
        },
    ];

    return (
        <div>
            <Pageheader title="Personel Yönetimi" currentpage="Ders & Ek Ücretler" />
            <TabsContainer tabs={tabsConfig} onTabChange={(idx) => setActiveIdx(idx)} />
        </div>
    );
};

export default LessonOctFeeIndex;
