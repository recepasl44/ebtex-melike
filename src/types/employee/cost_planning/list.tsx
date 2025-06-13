import CostPlanningListStatus from "../../../enums/employee/cost_planning/list";

export interface PersonelCostPlanning {
  id: number;
  okul_seviyesi: string;
  brans_gorev: string;
  personel_sayisi: number;
  sozlesme_turu: string;
  maas: number;
  haftalik_is_gunu: number;
  gunluk_ucret: number;
  ders_ucreti: number;
  aylik_ders_sayisi: number;
  ay_sayisi: number;
  toplam_maas: number;
  ssk_primi: number;
  tazminat: number;
  genel_toplam: number;
}

export interface CostPlanningListResponse {
  data: PersonelCostPlanning[];
}

export interface CostPlanningListState {
  data: PersonelCostPlanning[] | null;
  status: CostPlanningListStatus;
  error: string | null;
}

export interface CostPlanningListArgs {
  enabled?: boolean;
  [key: string]: any;
}
