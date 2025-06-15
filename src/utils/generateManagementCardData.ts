export interface CardDataItem {
  id: number;
  title: string;
  values: {
    label: string;
    value: string;
    prefix?: string ;
  }[];
  change?: {
    label: string;
    value: string;
    color: string;
  };
  iconClass: string;
  backgroundColor: string;
}

    export function generateManagementCardData(data: any): CardDataItem[] {
      const item = Array.isArray(data?.data) ? data.data[0] : data?.data;
      return [
        {
          id: 1,
          title: "Kayıt Sayıları",
          values: [
            { label: "Hedef", value: String(item?.register_number?.target || "0") },
            { label: "Gerçekleşen", value: String(item?.register_number?.default || "0") }
          ],
          change: {
            label: "Değişim",
            value: item?.register_number?.rate || "0%",
            color: item?.register_number?.rate?.includes("-") ? "danger" : "success"
          },
          iconClass: "ti ti-users",
          backgroundColor: "primary"
        },
        {
          id: 2,
          title: "Genel Bilgiler",
          values: [
            { label: "Sınıf", value: `${item?.general_information?.class || "0"}` },
            { label: "Öğrenci", value: `${item?.general_information?.student || "0"}` },
            { label: "Öğretmen", value: `${item?.general_information?.teacher || "0"}` },
          ],
          iconClass: "bi bi-info-circle",
          backgroundColor: "primary1"
        },
        {
          id: 3,
          title: "Veli Görüşme Sayıları",
          values: [
            { label: "Geçen Hafta", value: `${item?.number_of_parent_meetings?.last_week || "0"}`},
            { label: "Bu Hafta", value: `${item?.number_of_parent_meetings?.this_week || "0"}`},
            { label: "Sezon", value: `${item?.number_of_parent_meetings?.seasson || "0"}`},
          ],
          iconClass: "ti ti-heart-handshake",
          backgroundColor: "primary2"
        },
        {
          id: 4,
          title: "Günlük Yoklama İzleme",
          values: [
            { label: "Derslik Sayısı", value: `${item?.daily_attendance_monitoring?.class || "0"}` },
            { label: "Allınan Yoklama", value: `${item?.daily_attendance_monitoring?.lesson_learned || "0"}` },
            { label: "Eksik Yoklama", value: `${item?.daily_attendance_monitoring?.lesson_not_learned || "0"}` }
        ],
        iconClass: "bi bi-list-check",
        backgroundColor: "primary3"
      }
      ];
    }
