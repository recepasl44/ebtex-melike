/**
 * Para birimi formatla (TL)
 * @param amount Formatlanacak miktar (string veya number)
 * @param showCurrency Para birimi sembolü gösterilsin mi (default: true)
 * @returns Formatlanmış para birimi string
 */
export const formatCurrency = (
  amount: string | number | undefined | null,
  showCurrency: boolean = true
): string => {
  if (amount === undefined || amount === null || amount === "") return "0,00 ₺";

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) return "0,00 ₺";

  // Para birimi sembolünü değerin sonunda göstermek için style: 'decimal' kullanıp sonuna ₺ ekleyelim
  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    style: "decimal", // Para birimi sembolü olmadan sadece sayı formatı
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);

  // Para birimi sembolü istendiyse sonuna ekle
  return showCurrency ? `${formattedAmount} ₺` : formattedAmount;
};

/**
 * Tarih formatla
 * @param dateString Formatlanacak tarih string'i
 * @param showTime Saat gösterilsin mi (default: false)
 * @returns Formatlanmış tarih string
 */
export const formatDate = (
  dateString: string | Date | undefined | null,
  showTime: boolean = false
): string => {
  if (!dateString || dateString === "0000-00-00 00:00:00") return "-";

  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (showTime) {
      return new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }

    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Tarih formatlanırken hata:", error);
    return "-";
  }
};

/**
 * API için tarih formatla (yyyy-mm-dd formatına dönüştürür)
 * @param dateString Formatlanacak tarih string'i
 * @returns API için formatlanmış tarih string (yyyy-mm-dd)
 */
export const formatDateForApi = (
  dateString: string | Date | undefined | null
): string => {
  if (!dateString) return "";

  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    // ISO formatında tarihi al ve sadece tarih kısmını döndür (yyyy-mm-dd)
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("API için tarih formatlanırken hata:", error);
    return "";
  }
};

/**
 * Taksit durumunu metin olarak formatla
 * @param isPaid Ödeme durumu (0, 1, true, false, null)
 * @returns Formatlanmış durum metni
 */
export const formatInstallmentStatus = (
  isPaid: boolean | number | null | undefined
): string => {
  if (isPaid === 1 || isPaid === true) return "Ödendi";
  return "Ödenecek";
};

/**
 * Absolute değer al ve formatla (iade işlemleri için)
 * @param amount Formatlanacak miktar
 * @returns Mutlak değeri formatlanmış string
 */
export const formatAbsoluteAmount = (
  amount: string | number | undefined | null
): string => {
  if (amount === undefined || amount === null || amount === "") return "0,00 ₺";

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) return "0,00 ₺";

  return formatCurrency(Math.abs(numAmount));
};

/**
 * İki tarih arasındaki ay farkını hesaplar.
 * start = "2025-04-22", end = "2025-07-22" => 3 ay fark
 */
export function getMonthDifference(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Yıl/ay bazında fark
  let diff = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  diff += endDate.getMonth() - startDate.getMonth();

  // Gün farkına da bakmak isterseniz
  if (endDate.getDate() < startDate.getDate()) {
    diff -= 1;
  }
  return diff < 0 ? 0 : diff; // 0'dan küçükse 0 dönelim
}
