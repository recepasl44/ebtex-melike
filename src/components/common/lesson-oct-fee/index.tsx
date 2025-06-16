import TabsContainer from "../guidance/components/organisms/TabsContainer";
import TuitionFeesTab from "../personel/personelDetail/tabs/ders-ucreti/table";
import CouponTab from "../personel/personelDetail/tabs/kupon/table";
import CoachingTab from "../personel/personelDetail/tabs/kocluk/table";
import SpecialTab from "../personel/personelDetail/tabs/ozel-ders/table";

export default function LessonOctFeeIndex() {
  const tabsConfig = [
    { label: "Ders Ücreti", content: <TuitionFeesTab /> },
    { label: "Ders – Soru Çözüm Ücretleri", content: <CouponTab personelId={0} enabled={true} /> },
    { label: "Koçluk Ücreti", content: <CoachingTab personelId={0} enabled={true} /> },
    { label: "Özel Ders", content: <SpecialTab personelId={0} enabled={true} /> },
  ];

  return (
    <div className="flex" style={{ padding: "23px 50px 0" }}>
      <TabsContainer tabs={tabsConfig as any} />
    </div>
  );
}
