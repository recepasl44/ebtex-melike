export interface FinanceNote {
  sube: string;
  okul_no?: string | null;
  tc_kimlik_no?: string | null;
  adi: string;
  soyadi: string;
  sinif_seviyesi?: string | null;
  sinif_sube?: string | null;
  tarih: string;
  note: string;
  soz_verme_tarihi?: string | null;
  kullanici: string;
}

export interface ListFinanceNotesResponse {
  current_page: number;
  total: number;
  per_page: number;
  data: FinanceNote[];
}
