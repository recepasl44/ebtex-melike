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


export function generateServiceManagerData(data: any): CardDataItem[] {
  return [
        {
          id: 2,
          title: "Toplam Servis Araçları",
          values: [
            { label: "Toplam Araç", value: `${data?.data?.[0]?.total_service_vehicles?.total_vehicles || "0"}`},
            { label: "Servis Araç", value: `${data?.data?.[0]?.total_service_vehicles?.active_vehicle || "0"}`},
            { label: "Bakımda", value: `${data?.data?.[0]?.total_service_vehicles?.in_care || "0"}`},
          ],
          iconClass: "ri-bus-2-line",
          backgroundColor: "primary"
        },
        {
          id: 3,
          title: "Servis Kapasite Kullanımı",
          values: [
            { label: "Toplam Kapasite", value: `${data?.data?.[0]?.service_capacity_utilization?.total_capacity || "0"}`},
            { label: "Taşınan", value: `${data?.data?.[0]?.service_capacity_utilization?.carried || "0"}`},
            { label: "Boş Kapasite", value: `${data?.data?.[0]?.service_capacity_utilization?.free_capacity || "0"}`},
          ],
          iconClass: "ti ti-battery-4",
          backgroundColor: "primary1"
        },
        {
          id: 4,
          title: "Bakım Yenileme Hatırlatma",
          values: [
            { label: "Bakım Bekleyen Araç", value: `${data?.data?.[0]?.maintenance_and_renewal_reminders?.vehicle_Waiting_for_maintenance || "0"}` },
            { label: "Muayene Tarihi Yaklaşan Araç", value: `${data?.data?.[0]?.maintenance_and_renewal_reminders?.vehicle_with_an_upcoming_inspection_date || "0"}` },
            { label: "Sigorta Yenileme Yaklaşan Araç", value: `${data?.data?.[0]?.maintenance_and_renewal_reminders?.insurance_renewal_upcoming_Vehicle || "0"}` }
          ],
          iconClass: "bi bi-bell",
          backgroundColor: "primary2"
        },
     {
  id: 5,
  title: "Kasa Özeti",
  values: [
    { label: "Son Muayene", value: `₺${data?.data?.[0]?.vehicle_maintenance_and_renewal?.final_examination || "0"}` },
    { label: "Bakım Tarihi", value: `₺${data?.data?.[0]?.vehicle_maintenance_and_renewal?.maintenance_date || "0"}` },
    { label: "Sigorta Yenileme", value: `₺${data?.data?.[0]?.vehicle_maintenance_and_renewal?.Insurance_renewal || "0"}` }
  ],
  iconClass: "ti ti-chart-line",
  backgroundColor: "primary3"
}
      ];
    }
