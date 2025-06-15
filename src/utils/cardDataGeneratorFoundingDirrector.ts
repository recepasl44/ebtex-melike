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

    export function generateFoundingDirectorCardData(data: any): CardDataItem[] {
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
            color: item?.register_number?.rate?.includes("-") ? "" : "success"
          },
          iconClass: "ti ti-users",
          backgroundColor: "primary"
        },
        {
          id: 2,
          title: "Taksit Takibi",
          values: [
            { label: "Ciro", value: `₺${item?.installment_truck?.total || "0"}` },
            { label: "Ödenen", value: `₺${item?.installment_truck?.payed || "0"}` },
            { label: "Geciken", value: `₺${item?.installment_truck?.delayed || "0"}` }
          ],
          iconClass: "ti ti-credit-card",
          backgroundColor: "primary1"
        },
        {
          id: 3,
          title: "Bugünkü Kasa Durumu",
          values: [
            { label: "Gelir", value: `₺${item?.today_account_status?.income?.cash || "0"}`, prefix: "Nakit" },
            { label: "Gider", value: `₺${item?.today_account_status?.expense?.cash || "0"}`, prefix: "Nakit" },
            { label: "Gelir", value: `₺${item?.today_account_status?.income?.bank || "0"}`, prefix: "Banka" },
            { label: "Gider", value: `₺${item?.today_account_status?.expense?.bank || "0"}`, prefix: "Banka" }
          ],
          iconClass: "ti ti-wallet",
          backgroundColor: "primary2"
        },
        {
          id: 4,
          title: "Finansal Durum",
          values: [
            { label: "Varlıklar", value: `₺${item?.finance_status?.entity || "0"}` },
            { label: "Borçlar", value: `₺${item?.finance_status?.debt || "0"}` },
            { label: "Net", value: `₺${item?.finance_status?.net || "0"}` }
          ],
          iconClass: "ti ti-chart-line",
          backgroundColor: "primary3"
        }
      ];
    }
