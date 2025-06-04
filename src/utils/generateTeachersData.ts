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

// Add this interface for the course distribution items
interface CourseDistributionItem {
  name: string;
  consultancy: number;
}

export function generateTeachersData(data: any): CardDataItem[] {
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
      title: "Danışmanlık Bilgileri",
      values: [
        { label: "Sınıf", value: `${data?.data?.[0]?.consultancy_information?.class || "0"}` },
        { label: "Öğrenci", value: `${data?.data?.[0]?.consultancy_information?.student || "0"}` },
        { label: "Görüşme", value: `${data?.data?.[0]?.consultancy_information?.meet || "0"}` },
      ],
      iconClass: "ti ti-user-exclamation",
      backgroundColor: "primary1"
    },
    {
      id: 3,
      title: "Ders Dağılımı",
      values: [
        { 
          label: "9. Sınıf", 
          value: `${data?.data?.[0]?.course_distribution?.find((item: CourseDistributionItem) => item.name === "9.sınıf")?.consultancy || "0"}` 
        },
        { 
          label: "10. Sınıf", 
          value: `${data?.data?.[0]?.course_distribution?.find((item: CourseDistributionItem) => item.name === "10.sınıf")?.consultancy || "0"}` 
        },
        { 
          label: "11. Sınıf", 
          value: `${data?.data?.[0]?.course_distribution?.find((item: CourseDistributionItem) => item.name === "11.sınıf")?.consultancy || "0"}`
        },
      ],
      iconClass: "ti ti-chart-pie",
      backgroundColor: "primary2"
    },
    {
      id: 4,
      title: "Yoklama Sayıları",
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