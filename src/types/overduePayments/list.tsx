export interface OverduePayment {
  season: string | null;
  sube: string;
  soz_no: number;
  adi: string;
  soyadi: string;
  program: string | null;
  devre: string | null;
  sinif: string | null;
  vade: string; // YYYY-MM-DD
  vade_gap: number;
  odeme_tipi: string; // örneğin: "Nakit"
  borc: string; // sayısal değerler string olarak dönebiliyor (örn. "1000.00")
  taksit_sayisi: number;
  percent_of_total: number;
  okul_no?: string | null;
  tc_kimlik_no?: string | null;
  veli_adi_soyadi?: string | null;
  veli_tel?: string | null;
  enson_gorusme?: string | null;
  soz_verme_tarihi?: string | null;
}
  
  export interface ListOverduePaymentsResponse {
    current_page: number;
    total: number;
    per_page: number;
    total_overdue_amount: string;
    data: OverduePayment[];
  }
  