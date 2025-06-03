import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabsContainer from "../../guidance/components/organisms/TabsContainer";

import PersonelAboutTab from "./tabs/about/table";
import PersonelUcretTab from "./tabs/ucret/table";
import PersonelTazminatTab from "./tabs/tazminat/table";
import PersonelHaftaTab from "./tabs/haftalik-calisma/table";
import PersonelMaasBorcTab from "./tabs/maas-borc/table";
import PersonelMaasOdemeTab from "./tabs/maas-odeme/table";
import PersonelPrimTab from "./tabs/prim/table";
import PersonelKesintiTab from "./tabs/kesinti/table";
import PersonelIadeTab from "./tabs/iade/table";
import PersonelDailyTab from "./tabs/daily/table";
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

  const tabsConfig = [
    {
      label: "About",
      content: <PersonelAboutTab personel={personel} />,
    },
    {
      label: "Ders & Ek Ücretler",
      children: [
        {
          label: "Ders Ücreti",
          content: (
            <PersonelDersUcretTab
              personelId={pId}
              enabled={parentIndex === 1 && childIndex === 0}
            />
          ),
        },
        {
          label: "Kupon Ücreti",
          content: (
            <PersonelKuponTab
              personelId={pId}
              enabled={parentIndex === 1 && childIndex === 1}
            />
          ),
        },
        {
          label: "Özel Ders",
          content: (
            <PersonelOzelDersTab
              personelId={pId}
              enabled={parentIndex === 1 && childIndex === 2}
            />
          ),
        },
        {
          label: "Koçluk",
          content: (
            <PersonelKoclukTab
              personelId={pId}
              enabled={parentIndex === 1 && childIndex === 3}
            />
          ),
        },
      ],
    },
    {
      label: "Çalışma ve Hakediş",
      children: [
        {
          label: "Haftalık Ders Sayısı",
          content: (
            <PersonelHaftaTab
              personelId={pId}
              enabled={parentIndex === 2 && childIndex === 0}
            />
          ),
        },
        {
          label: "Ücret Bilgileri",
          content: (
            <PersonelUcretTab
              personelId={pId}
              enabled={parentIndex === 2 && childIndex === 1}
            />
          ),
        },
        {
          label: "Maaş Borç",
          content: (
            <PersonelMaasBorcTab
              personelId={pId}
              enabled={parentIndex === 2 && childIndex === 2}
            />
          ),
        },
        {
          label: "Maaş Ödeme",
          content: (
            <PersonelMaasOdemeTab
              personelId={pId}
              enabled={parentIndex === 2 && childIndex === 3}
            />
          ),
        },
        {
          label: "Günlük Ders/Soru",
          content: (
            <PersonelDailyTab
              personelId={pId}
              enabled={parentIndex === 2 && childIndex === 4}
            />
          ),
        },
      ],
    },
    {
      label: "Ekstra İşlemler",
      children: [
        {
          label: "Prim",
          content: (
            <PersonelPrimTab
              personelId={pId}
              enabled={parentIndex === 3 && childIndex === 0}
            />
          ),
        },
        {
          label: "Kesinti",
          content: (
            <PersonelKesintiTab
              personelId={pId}
              enabled={parentIndex === 3 && childIndex === 1}
            />
          ),
        },
        {
          label: "Tazminat",
          content: (
            <PersonelTazminatTab
              personelId={pId}
              enabled={parentIndex === 3 && childIndex === 2}
            />
          ),
        },
        {
          label: "İade",
          content: (
            <PersonelIadeTab
              personelId={pId}
              enabled={parentIndex === 3 && childIndex === 3}
            />
          ),
        },
      ],
    },
  ];

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
