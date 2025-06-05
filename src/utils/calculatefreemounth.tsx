// F:\xintra_react_ts\src\utils\calculateFreeMonths.ts

// Türkçe ay listesi, isterseniz locale'den de alabilirsiniz.
const turkishMonths = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  
  /**
   * İki tarih aralığı: start, end
   * Bu fonksiyon aralıktaki ayları dizi olarak döndürür
   */
  export function calculateFreeMonths(start: Date, end: Date): string[] {
    if (!(start instanceof Date) || !(end instanceof Date)) return [];
  
    const result: string[] = [];
    // sadece ay ve yıla odaklanalım (gün = 1)
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    const endDate = new Date(end.getFullYear(), end.getMonth(), 1);
  
    while (current <= endDate) {
      result.push(turkishMonths[current.getMonth()]);
      current.setMonth(current.getMonth() + 1);
    }
  
    return result;
  }
  