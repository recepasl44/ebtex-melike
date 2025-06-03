export interface CardDataItem {
  id: number;
  title: string;
  values: {
    label: string;
    value: string;
  }[];
  iconClass: string;
  backgroundColor: string;
}

export interface ExpenseSummaryData {
  salary?: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
  prim?: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
  tazminat?: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
  kayit_iade?: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
}

function fmt(value?: string) {
  return value ?? "0";
}

export function generateExpenseCardData(
  rangeData: ExpenseSummaryData | null,
  totalData: ExpenseSummaryData | null
): CardDataItem[] {
  return [
    {
      id: 1,
      title: "Maaş",
      values: [
        { label: "Verecek", value: fmt(rangeData?.salary?.verecek) },
        { label: "Ödenen", value: fmt(rangeData?.salary?.odenen) },
        { label: "Kalan", value: fmt(rangeData?.salary?.kalan) },
        { label: "Toplam Verecek", value: fmt(totalData?.salary?.verecek) },
        { label: "Toplam Ödenen", value: fmt(totalData?.salary?.odenen) },
        { label: "Toplam Kalan", value: fmt(totalData?.salary?.kalan) },
      ],
      iconClass: "ti ti-wallet",
      backgroundColor: "primary",
    },
    {
      id: 2,
      title: "Prim",
      values: [
        { label: "Verecek", value: fmt(rangeData?.prim?.verecek) },
        { label: "Ödenen", value: fmt(rangeData?.prim?.odenen) },
        { label: "Kalan", value: fmt(rangeData?.prim?.kalan) },
        { label: "Toplam Verecek", value: fmt(totalData?.prim?.verecek) },
        { label: "Toplam Ödenen", value: fmt(totalData?.prim?.odenen) },
        { label: "Toplam Kalan", value: fmt(totalData?.prim?.kalan) },
      ],
      iconClass: "ti ti-briefcase",
      backgroundColor: "primary1",
    },
    {
      id: 3,
      title: "Tazminat",
      values: [
        { label: "Verecek", value: fmt(rangeData?.tazminat?.verecek) },
        { label: "Ödenen", value: fmt(rangeData?.tazminat?.odenen) },
        { label: "Kalan", value: fmt(rangeData?.tazminat?.kalan) },
        { label: "Toplam Verecek", value: fmt(totalData?.tazminat?.verecek) },
        { label: "Toplam Ödenen", value: fmt(totalData?.tazminat?.odenen) },
        { label: "Toplam Kalan", value: fmt(totalData?.tazminat?.kalan) },
      ],
      iconClass: "ti ti-activity",
      backgroundColor: "primary2",
    },
    {
      id: 4,
      title: "Kayıt İade",
      values: [
        { label: "Verecek", value: fmt(rangeData?.kayit_iade?.verecek) },
        { label: "Ödenen", value: fmt(rangeData?.kayit_iade?.odenen) },
        { label: "Kalan", value: fmt(rangeData?.kayit_iade?.kalan) },
        { label: "Toplam Verecek", value: fmt(totalData?.kayit_iade?.verecek) },
        { label: "Toplam Ödenen", value: fmt(totalData?.kayit_iade?.odenen) },
        { label: "Toplam Kalan", value: fmt(totalData?.kayit_iade?.kalan) },
      ],
      iconClass: "ti ti-cash",
      backgroundColor: "primary3",
    },
  ];
}
