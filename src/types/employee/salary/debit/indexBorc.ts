export interface MaasBorc {
    id: number;
    personel_id: number;
    aylik_ucret: string;
    odeme_sekli: 'Nakit' | 'Banka';
    maas_sayisi: number;
    baslangic_tarihi: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface MaasBorcListArgs {
    personel_id: number;
  }
  