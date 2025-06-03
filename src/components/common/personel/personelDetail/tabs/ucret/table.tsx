import { useEffect, useState, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";

import { useDebtShow } from "../../../../../hooks/employee/salary/debt/useDebtShow";
import { useWeeklyLessonCountShow } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountShow";
import { useTuitionFeesShow } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesShow";
import { useCoachingShow } from "../../../../../hooks/employee/coaching/useShow";
import { usePrimlerShow } from "../../../../../hooks/employee/prim/usePrimlerShow";
import { useCouponPriceShow } from "../../../../../hooks/employee/coupon_price/useCouponPriceShow";
import { useSpecialTutorLessonShow } from "../../../../../hooks/employee/special_tutor_lesson/useSpecialTutorLessonShow";

interface PersonelUcretTabProps {
  personelId: number;
  enabled?: boolean;
}

export default function PersonelUcretTab({ personelId, enabled = true }: PersonelUcretTabProps) {
  const [loading, setLoading] = useState(true);

  const { debt, getDebt } = useDebtShow();
  const { weeklyLessonCount, getWeeklyLessonCount } = useWeeklyLessonCountShow();
  const { tuitionFees, getTuitionFees } = useTuitionFeesShow();
  const { coaching, getCoaching } = useCoachingShow();
  const { primlerDetail, getPrimler } = usePrimlerShow();
  const { couponPrice, getCouponPrice } = useCouponPriceShow();
  const { specialTutorLesson, getSpecialTutorLesson } = useSpecialTutorLessonShow();

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      setLoading(true);
      await Promise.all([
        getDebt(personelId),
        getWeeklyLessonCount(personelId),
        getTuitionFees(personelId),
        getCoaching(personelId),
        getPrimler(personelId),
        getCouponPrice(personelId),
        getSpecialTutorLesson(personelId),
      ]);
      setLoading(false);
    })();
  }, [enabled, personelId]);

  const tableData = useMemo(() => {
    const maas = debt?.aylik_ucret ?? "-";
    const haftalikDersSayisi = debt?.maas_sayisi ?? "-";

    const haftaKacGun = weeklyLessonCount?.hafta_kac_gun ?? 0;
    const gunlukUcret = weeklyLessonCount?.gunluk_ucret ?? 0;
    const aylikKazanc = haftaKacGun * Number(gunlukUcret) * 4;

    const dersUcreti = tuitionFees?.ders_ucreti ?? "0.00";
    const dersSayisi = tuitionFees?.ders_sayisi ?? "0";

    const koclukUcreti = coaching?.kisi_basi_ucreti ?? "-";
    const ogrenciSayisi = coaching?.ogrenci_sayisi ?? "-";
    const totalKocluk = parseFloat(String(coaching?.toplam_ucret) ?? "0");

    const prim = primlerDetail?.miktar ?? "-";
    const kupon = couponPrice?.satis_ucreti ?? "-";
    const totalOzelDers = parseFloat(specialTutorLesson?.gelir ?? "0");

    return [
      {
        maas,
        haftalikDersSayisi,
        haftaKacGun,
        gunlukUcret,
        aylikKazanc: aylikKazanc.toFixed(2),
        dersUcreti,
        dersSayisi,
        koclukUcreti,
        ogrenciSayisi,
        prim,
        kupon,
        nobet: "-",
        totalKocluk: totalKocluk.toFixed(2),
        totalOzelDers: totalOzelDers.toFixed(2),
      },
    ];
  }, [
    debt,
    weeklyLessonCount,
    tuitionFees,
    coaching,
    primlerDetail,
    couponPrice,
    specialTutorLesson,
  ]);

  const columns: ColumnDefinition<any>[] = [
    { key: "maas", label: "Maaş" },
    { key: "haftalikDersSayisi", label: "Haftalık Ders Sayısı" },
    { key: "haftaKacGun", label: "Hafta Kaç Gün" },
    { key: "gunlukUcret", label: "Günlük Ücret" },
    { key: "aylikKazanc", label: "Aylık Kazanç" },
    { key: "dersUcreti", label: "Ders Ücreti" },
    { key: "dersSayisi", label: "Ders Sayısı" },
    { key: "koclukUcreti", label: "Koçluk Ücreti" },
    { key: "ogrenciSayisi", label: "Öğrenci Sayısı" },
    { key: "prim", label: "Prim" },
    { key: "kupon", label: "Kupon" },
    { key: "nobet", label: "Nöbet" },
    { key: "totalKocluk", label: "Koçluk Toplam" },
    { key: "totalOzelDers", label: "Özel Ders Toplam" },
  ];

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <ReusableTable
      columns={columns}
      data={tableData}
      loading={loading}
      tableMode="single"
      showExportButtons={false}
      exportFileName="ucret-bilgileri"
    />
  );
}
