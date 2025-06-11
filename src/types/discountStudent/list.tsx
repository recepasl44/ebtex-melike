export interface DiscountStudentData {
    sube: string;              // Öğrencinin branch (şube) adı
    sozlesme_no: number;       // Enrollment id (sözleşme no)
    okul_no: string;           // Öğrencinin okul numarası
    ad: string;                // Öğrencinin adı
    soyad: string;             // Öğrencinin soyadı
    program: string;           // Öğrencinin programı
    devre: string;             // Sezon (devre) adı
    sinif: string;             // Öğrencinin sınıfı
    kullanici?: string;        // Kaydı oluşturan kullanıcı (opsiyonel)
    indirim_adi: string;       // Öğrenciye atanmış indirim isimleri (virgülle ayrılmış)
    enrollment_indirim: string; // Enrollment tablosundaki indirim bilgisi (ör. "10 (ind.)")
    toplam: number;            // Enrollment’in final_fee (toplam ücret)
}
  
  export interface DiscountStudentMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  }
  
  export interface ListDiscountStudentResponse {
    data: DiscountStudentData[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: DiscountStudentMeta;
  }
  