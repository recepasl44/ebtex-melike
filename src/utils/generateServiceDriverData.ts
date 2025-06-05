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


export function generateServiceDriverData(data: any): CardDataItem[] {
  return [
        {
          id: 2,
          title: "Servis Ulaşım Durumu",
          values: [
            { label: "Servis Aracı Sayısı", value: `${data?.data?.[0]?.service_transportation_status?.number_of_service_vehicles || "0"}`},
            { label: "Geç Gelen Araç Sayısı", value: `${data?.data?.[0]?.service_transportation_status?.number_of_late_arriving_vehicles || "0"}`},
            { label: "Öğrenci Kapasitesi", value: `${data?.data?.[0]?.service_transportation_status?.service_student_capacity || "0"}`},
          ],
          iconClass: "ri-bus-2-line",
          backgroundColor: "primary"
        },
        {
          id: 3,
          title: "Servis Araç Öğrenci Sayıları",
          values: [
            { label: "Servis Aracı Plakası", value: `${data?.data?.[0]?.service_vehicle_student_numbers?.service_vehicle_plate || "0"}`},
            { label: "Toplam Kapasite", value: `${data?.data?.[0]?.service_vehicle_student_numbers?.total_capacity || "0"}`},
            { label: "Taşınan Öğrenci Sayısı", value: `${data?.data?.[0]?.service_vehicle_student_numbers?.total_student || "0"}`},
          ],
          iconClass: "ti ti-users",
          backgroundColor: "primary1"
        },
        {
          id: 4,
          title: "Servis Güzergah Durumu",
          values: [
            { label: "Bugünkü Rota", value: `${data?.data?.[0]?.service_route_status?.today_route || "0"}` },
            { label: "Durak Sayısı", value: `${data?.data?.[0]?.service_route_status?.number_of_stops || "0"}` },
            { label: "Varış Süresi", value: `${data?.data?.[0]?.service_route_status?.arrival_time || "0"}` }
          ],
          iconClass: "las la-map-pin",
          backgroundColor: "primary2"
        },
     {
  id: 5,
  title: "Araç Bakım Yenileme",
  values: [
    { label: "Son Muayene", value: `${data?.data?.[0]?.vehicle_maintenance_and_renewal?.final_examination || "0"}` },
    { label: "Bakım Tarihi", value: `${data?.data?.[0]?.vehicle_maintenance_and_renewal?.maintenance_date || "0"}` },
    { label: "Sigorta Yenileme", value: `${data?.data?.[0]?.vehicle_maintenance_and_renewal?.Insurance_renewal || "0"}` }
  ],
  iconClass: "las la-wrench",
  backgroundColor: "primary3"
}
      ];
    }
