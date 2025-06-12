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


export function generateSupportStaffData(data: any): CardDataItem[] {
  return [
        {
          id: 2,
          title: "Genel Bilgiler",
          values: [
            { label: "Sınıf", value: `${data?.data?.[0]?.general_information?.class || "0"}` },
            { label: "Öğrenci", value: `${data?.data?.[0]?.general_information?.student || "0"}` },
            { label: "Öğretmen", value: `${data?.data?.[0]?.general_information?.teacher || "0"}` },
          ],
          iconClass: "bi bi-info-circle",
          backgroundColor: "primary"
        },
        {
          id: 3,
          title: "Servis Ulaşım Durumu",
          values: [
            { label: "Servis Aracı Sayısı", value: `${data?.data?.[0]?.service_transportation_status?.number_of_service_vehicles || "0"}`},
            { label: "Geç Gelen Araç Sayısı", value: `${data?.data?.[0]?.service_transportation_status?.number_of_late_arriving_vehicles || "0"}`},
            { label: "Sezon", value: `${data?.data?.[0]?.service_transportation_status?.service_student_capacity || "0"}`},
          ],
          iconClass: "ri-bus-2-line",
          backgroundColor: "primary1"
        },
        {
          id: 4,
          title: "Yemekhane Katılım Sayıları",
          values: [
            { label: "Derslik Sayısı", value: `${data?.data?.[0]?.number_of_cafeteria_attendance?.breakfast || "0"}` },
            { label: "Allınan Yoklama", value: `${data?.data?.[0]?.number_of_cafeteria_attendance?.lunch || "0"}` },
            { label: "Eksik Yoklama", value: `${data?.data?.[0]?.number_of_cafeteria_attendance?.snack || "0"}` }
          ],
          iconClass: "ti ti-tools-kitchen-2",
          backgroundColor: "primary2"
        },
             {
          id: 5,
          title: "Aktif Kullanılan Derslik Sayıları",
          values: [
            { label: "1. Kat", value: `${data?.data?.[0]?.number_of_classrooms?.[0]?.total || "0"}` },
            { label: "2. Kat", value: `${data?.data?.[0]?.number_of_classrooms?.[1]?.total || "0"}` },
            { label: "3. Kat", value: `${data?.data?.[0]?.number_of_classrooms?.[2]?.total || "0"}` }
          ],
          iconClass: "ti ti-chalkboard",
          backgroundColor: "primary3"
        },
      ];
    }
