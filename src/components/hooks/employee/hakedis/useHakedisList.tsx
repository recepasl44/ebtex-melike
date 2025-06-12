import { useEffect, useState } from "react";
import axiosInstance from "../../../../services/axiosClient";
import { PERSONEL_HAKEDIS_BASE } from "../../../../helpers/url_helper";

export interface HakedisPersonel {
  sube: string;
  brans: string;
  ad_soyad: string;
  haftalik_gun: number;
  ay_sayisi: number;
  maas: number;
  ders_ucreti: number;
  ders_sayisi: number;
  soru_cozum_ucreti: number;
  egitim_ucreti: number;
  kupon_ucreti: number;
  farkli_ucret: number;
  toplam: number;
  odeme_yontemi: string;
  odeme_miktari: string;
  odenen_toplam: string;
  kalan: string;
}

export function useHakedisList(enabled = true) {
  const [data, setData] = useState<HakedisPersonel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await axiosInstance.get(PERSONEL_HAKEDIS_BASE);
        const list: HakedisPersonel[] = resp.data?.personeller || [];
        setData(list);
      } catch (err: any) {
        setError(err.response?.data?.message || "Fetch hakedis list failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [enabled]);

  return { data, loading, error };
}
