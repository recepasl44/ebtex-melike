import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabsContainer from "../../guidance/components/organisms/TabsContainer";

import PersonelTazminatTab from "./tabs/tazminat/table";
import PersonelHaftaTab from "./tabs/haftalik-calisma/table";
import PersonelMaasBorcTab from "./tabs/maas-borc/table";
import PersonelMaasOdemeTab from "./tabs/maas-odeme/table";
import PersonelPrimTab from "./tabs/prim/table";
import PersonelKesintiTab from "./tabs/kesinti/table";
import PersonelIadeTab from "./tabs/iade/table";
import PersonelDersUcretTab from "./tabs/ders-ucreti/table";
import PersonelKuponTab from "./tabs/kupon/table";
import PersonelOzelDersTab from "./tabs/ozel-ders/table";
import PersonelKoclukTab from "./tabs/kocluk/table";
import { usePersonelShow } from "../../../hooks/employee/personel/useDetail";

export default function PersonelDetail() {
  const { id } = useParams<{ id?: string }>();
  const pId = id ? Number(id) : 0;
  const { personel, getPersonel } = usePersonelShow();
  const [parentIndex, setParentIndex] = useState(0);
  const [childIndex, setChildIndex] = useState<number | null>(0);

  useEffect(() => {
    if (pId) getPersonel(pId);
  }, [pId, getPersonel]);

  if (!personel) {
    return <div className="p-5 text-center">Yükleniyor…</div>;
  }

  const tabs = [
    {
      label: "Ders & Ek Ücretler",
      children: [
        { label: "Ders Ücreti", Component: PersonelDersUcretTab },
        { label: "Ders – Soru Çözüm Ücretleri", Component: PersonelKuponTab },
        { label: "Koçluk Ücreti", Component: PersonelKoclukTab },
        { label: "Özel Ders", Component: PersonelOzelDersTab },
      ],
    },
    {
      label: "Çalışma ve Hakediş",
      children: [
        { label: "Sözleşme", Component: PersonelHaftaTab },
        { label: "Hakkedişler", Component: PersonelMaasBorcTab },
        { label: "Ödeme Kayıtları", Component: PersonelMaasOdemeTab },
      ],
    },
    {
      label: "Ekstra İşlemler",
      children: [
        { label: "Prim", Component: PersonelPrimTab },
        { label: "Kesinti", Component: PersonelKesintiTab },
        { label: "Tazminat", Component: PersonelTazminatTab },
        { label: "İade", Component: PersonelIadeTab },
      ],
    },
  ];

  const tabsConfig = tabs.map((tab, pIndex) => ({
    label: tab.label,
    children: tab.children.map((child, cIndex) => ({
      label: child.label,
      content: (
        <child.Component
          personelId={pId}
          enabled={parentIndex === pIndex && childIndex === cIndex}
        />
      ),
    })),
  }));

  return (
    <div className="flex" style={{ padding: "23px 50px 0" }}>
      <TabsContainer
      tabs={tabsConfig as any} // Temporary type assertion to bypass type check
      onTabChange={(p, c) => {
        setParentIndex(p);
        setChildIndex(c);
      }}
      />
    </div>
  );
}
