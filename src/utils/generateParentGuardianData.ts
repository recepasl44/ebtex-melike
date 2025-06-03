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

    export function generateParentGuardianData(data: any): CardDataItem[] {
      return [
        {
          id: 1,
          title: "Sınıf Bilgileri",
          values: [
            { label: "Mevcut", value: String(data?.data?.[0]?.class_information?.available || "0") },
            { label: "Rehber", value: String(data?.data?.[0]?.class_information?.directory || "0") },
            { label: "Danışman", value: String(data?.data?.[0]?.class_information?.advisor || "0") }
          ],
          iconClass:"bi bi-laptop",
          backgroundColor: "primary"
        },
        {
          id: 2,
          title: "Rehberlik Mesajı",
          values: [
            { label: "Yaklaşan Görüşme", value: `${data?.data?.[0]?.directory_message?.upcoming_meeting || "0"}` },
            { label: "Son Mesaj", value: `${data?.data?.[0]?.directory_message?.last_target || "0"}` },
          ],
          iconClass: "bi bi-envelope",
          backgroundColor: "primary1"
        },
                   {
              id: 3,
              title: "Yapılan Ders Sayıları",
              values: data?.data?.[0]?.number_of_lessons_taught?.map((lesson: any) => ({
                label: lesson.name.charAt(0).toUpperCase() + lesson.name.slice(1), 
                value: String(lesson.total || "0")
              })) || [],
              iconClass: "bi bi-card-checklist",
              backgroundColor: "primary2"
            },
        {
          id: 4,
          title: "Hava Durumu",
          values: [
            { label: "Sıcaklık", value: `${data?.data?.[0]?.daily_attendance_monitoring?.class || "0"}` },
            { label: "Durum", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_learned || "0"}` },
            { label: "Rüzgar", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_not_learned || "0"}` },
            { label: "Nem Oranı", value: `${data?.data?.[0]?.daily_attendance_monitoring?.lesson_not_learned || "0"}` }
          ],
          iconClass:"bi bi-cloud-drizzle",
          backgroundColor: "primary3"
        }
      ];
    }
