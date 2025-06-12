export interface ContractInfo {
  okulSeviyesi: string;
  meslek: string;
  adSoyad: string;
  sozlesmeTuru: string;
  haftalikIsGunu: number;
  haftalikDersSayisi: number;
  aySayisi: number;
  maas: number;
  dersUcreti: number;
  soruCozumUcreti: number;
  gunlukUcret: number;
  ozelDersUcreti: number;
  koclukUcreti: number;
}


export interface AccrualInfo {
  okulSeviyesi: string;
  meslek: string;
  adSoyad: string;
  sozlesmeTuru: string;
  haftalikIsGunu: number;
  maas: number;
  dersUcreti: number;
  soruCozumUcreti: number;
  soruCozumSayisi: number;
  gunBazliUcret: number;
  ozelDersUcreti: number;
  koclukUcreti: number;
  prim: number;
  farkliUcret: number;
  ay: string;
  donem: string;
}


export interface PaymentInfo {
  okulSeviyesi: string;
  meslek: string;
  adSoyad: string;
  sozlesmeTuru: string;
  toplamUcret: number;
  ay: string;
  donem: string;
}

