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


export function generateFinanceOfficerData(data: any): CardDataItem[] {
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
          id: 2,
          title: "Taksit Takibi",
          values: [
            { label: "Ciro", value: `₺${data?.data?.[0]?.installment_truck?.total || "0"}` },
            { label: "Ödenen", value: `₺${data?.data?.[0]?.installment_truck?.payed || "0"}` },
            { label: "Geciken", value: `₺${data?.data?.[0]?.installment_truck?.delayed || "0"}` }
          ],
          iconClass: "ti ti-credit-card",
          backgroundColor: "primary1"
        },
        {
          id: 3,
          title: "Bugünkü Kasa Durumu",
          values: [
            { label: "Gelir", value: `₺${data?.data?.[0]?.today_account_status?.income?.cash || "0"}`, prefix: "Nakit" },
            { label: "Gider", value: `₺${data?.data?.[0]?.today_account_status?.expense?.cash || "0"}`, prefix: "Nakit" },
            { label: "Gelir", value: `₺${data?.data?.[0]?.today_account_status?.income?.bank || "0"}`, prefix: "Banka" },
            { label: "Gider", value: `₺${data?.data?.[0]?.today_account_status?.expense?.bank || "0"}`, prefix: "Banka" }
          ],
          iconClass: "ti ti-wallet",
          backgroundColor: "primary2"
        },
      ];
    }
