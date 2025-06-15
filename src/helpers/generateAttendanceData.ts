export interface AttendanceDataItem {
    id: number;
    src: string | any;
    states: string;
    now: number;
    data: string;
    color: string;
}

export interface DailyAttendanceStatus {
    teachers: string;
    personel: string;
    ana_okulu: string;
    ilkokul: string;
    ortaokul: string;
    fenlisesi: string;
    anadolulisesi: string;
    toplamlar: string;
}

export interface AttendanceStatus {
    [key: string]: string;
}

export const convertToAttendanceStatus = (
    data?: DailyAttendanceStatus
): AttendanceStatus => {
    if (!data) {
        return {} as AttendanceStatus;
    }
    return data as unknown as AttendanceStatus;
};

/**
 * Devam durumu verilerinden yüzde hesaplar
 * @param valueStr "41/43" formatında string
 * @returns Hesaplanan yüzde değeri (0-100)
 */
export const calculatePercentage = (valueStr: string): number => {
    const [present, total] = valueStr.split('/').map(num => parseInt(num.trim()));
    return Math.round((present / total) * 100) || 0; // NaN durumunda 0 döndür
};

/**
 * API'den gelen devam durumu verilerinden görüntülenecek veri dizisini oluşturur
 * @param attendanceStatus API'den gelen devam durumu verileri
 * @param images Görüntülenecek resimler için map
 * @returns Tabloda görüntülenecek veri dizisi
 */
export const generateAttendanceData = (
    attendanceStatus: AttendanceStatus | undefined,
    images: Record<string, any> // StaticImageData yerine any kullanıyoruz
): AttendanceDataItem[] => {
    // attendanceStatus boş olabilir, bu durumda varsayılan boş nesne kullanılır
    const status = attendanceStatus || ({} as AttendanceStatus);

    // Veri yapısı ve görüntüleme ayarları
    const dataMapping = [
        { key: "teachers", title: "Öğretmenler", image: "teacher", color: "primary" },
        { key: "personel", title: "Personeller", image: "staff", color: "primary1" },
        { key: "ana_okulu", title: "Anaokulu", image: "kindergarten", color: "primary2" },
        { key: "ilkokul", title: "İlkokul", image: "primary", color: "primary3" },
        { key: "ortaokul", title: "Ortaokul", image: "middle", color: "secondary" },
        { key: "anadolulisesi", title: "Anadolu Lisesi", image: "anatolian", color: "info" },
        { key: "fenlisesi", title: "Fen Lisesi", image: "science", color: "warning" },
        { key: "toplamlar", title: "Toplamlar", image: "total", color: "primary" },
    ];

    return dataMapping.map((item, index) => ({
        id: index + 1,
        src: images[item.image] || "https://via.placeholder.com/40",
        states: item.title,
        now: calculatePercentage(status[item.key] || "0/1"),
        data: status[item.key] || "0/1",
        color: item.color
    }));
};
