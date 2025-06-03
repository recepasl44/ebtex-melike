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


export function generatePDRData(data: any): CardDataItem[] {
  return [
    {
      id: 1,
      title: "Ders ve Sınıf Bilgileri",
      values: [
        { label: "Sınıf Sayısı", value: String(data?.data?.[0]?.course_and_class_information?.class || "0") },
        { label: "Haftalık Ders Sayısı", value: String(data?.data?.[0]?.course_and_class_information?.weekly_lesson || "0") },
        { label: "Öğrenci Sayısı", value: String(data?.data?.[0]?.course_and_class_information?.student || "0") }
      ],
      iconClass: "ti ti-chalkboard",
      backgroundColor: "primary"
    },
    {
      id: 2,
      title: "Rehberlik Sayıları",
      values: [
        { label: "Rehberlik", value: `${data?.data?.[0]?.consultancy_information?.class || "0"}` },
        { label: "Öğrenci", value: `${data?.data?.[0]?.consultancy_information?.student || "0"}` },
        { label: "Görüşme", value: `${data?.data?.[0]?.consultancy_information?.meet || "0"}` },
      ],
      iconClass: "ti ti-heart-handshake",
      backgroundColor: "primary1"
    },
    {
      id: 3,
      title: "Veli Görüşme Sayıları",
      values: [
        { 
          label: "Son Hafta",
          value: `${data?.data?.[0]?.number_of_parent_meetings.last_week || "0"}`
        },
          { 
          label: "Son Hafta",
          value: `${data?.data?.[0]?.number_of_parent_meetings.this_week || "0"}`
        },
        { 
          label: "Sezon", 
          value: `${data?.data?.[0]?.number_of_parent_meetings.seasson || "0"}`
        },
      ],
      iconClass: "ti ti-message",
      backgroundColor: "primary2"
    },
    {
      id: 4,
      title: "Günlük Yoklama İzleme",
      values: [
        { label: "Allınan", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_learned || "0"}` },
        { label: "Eksik", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_not_learned || "0"}` }
      ],
      iconClass: "bi bi-list-check",
      backgroundColor: "primary3"
    }
  ];
}