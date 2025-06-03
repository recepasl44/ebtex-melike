export interface CardDataItem {
  id: number;
  title: string;
  values: {
    label: string;
    value: string;
    prefix?: string;
  }[];
  change?: {
    label: string;
    value: string;
    color: string;
  };
  iconClass: string;
  backgroundColor: string;
}


export function generateStudendAfraidData(data: any): CardDataItem[] {
  return [
        {
          id: 1,
          title: "Kayıt Sayıları",
          values: [
            { label: "Hedef", value: String(data?.data?.[0]?.register_number?.target || "0") },
            { label: "Gerçekleşen", value: String(data?.data?.[0]?.register_number?.default || "0") }
          ],
          change: {
            label: "Değişim",
            value: data?.data?.[0]?.register_number?.rate || "0%",
            color: data?.data?.[0]?.register_number?.rate?.includes("-") ? "danger" : "success"
          },
          iconClass: "ti ti-users",
          backgroundColor: "primary"
        },
        {
          id: 2,
          title: "Genel Bilgiler",
          values: [
            { label: "Sınıf", value: `${data?.data?.[0]?.general_information?.class || "0"}` },
            { label: "Öğrenci", value: `${data?.data?.[0]?.general_information?.student || "0"}` },
            { label: "Öğretmen", value: `${data?.data?.[0]?.general_information?.teacher || "0"}` },
          ],
          iconClass: "bi bi-info-circle",
          backgroundColor: "primary1"
        },
        {
          id: 3,
          title: "Veli Görüşme Sayıları",
          values: [
            { label: "Geçen Hafta", value: `${data?.data?.[0]?.number_of_parent_meetings?.last_week || "0"}`},
            { label: "Bu Hafta", value: `${data?.data?.[0]?.number_of_parent_meetings?.this_week || "0"}`},
            { label: "Sezon", value: `${data?.data?.[0]?.number_of_parent_meetings?.seasson || "0"}`},
          ],
          iconClass: "bi bi-hand-thumbs-up",
          backgroundColor: "primary2"
        },
        {
          id: 4,
          title: "Günlük Yoklama İzleme",
          values: [
            { label: "Derslik Sayısı", value: `${data?.data?.[0]?.daily_attendance_monitoring?.class || "0"}` },
            { label: "Allınan Yoklama", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_learned || "0"}` },
            { label: "Eksik Yoklama", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_not_learned || "0"}` }
          ],
          iconClass: "bi bi-list-check",
          backgroundColor: "primary3"
        }
      ];
    }
