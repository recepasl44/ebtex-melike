import { DashboardResponseType } from "../components/common/dashboard/type";

export function generateChartSeries(data: DashboardResponseType): any[] {
  const item = Array.isArray(data?.data) ? data.data[0] : data?.data;
  if (!item?.monthly_installment_status) {
    return [
      { name: 'Ödenen', type: "column", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: 'Ödenmesi Gereken', type: "line", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
    ];
  }

  const installmentStatus = item.monthly_installment_status;
  
  return [
    {
      name: 'Ödenen',
      type: "column",
      data: [
        Number(installmentStatus?.january?.paid || 0),
        Number(installmentStatus.february?.paid || 0),
        Number(installmentStatus.march?.paid || 0),
        Number(installmentStatus.april?.paid || 0),
        Number(installmentStatus.may?.paid || 0),
        Number(installmentStatus.june?.paid || 0),
        Number(installmentStatus.july?.paid || 0),
        Number(installmentStatus.august?.paid || 0),
        Number(installmentStatus.september?.paid || 0),
        Number(installmentStatus.octaber?.paid || 0),
        Number(installmentStatus.novamber?.paid || 0),
        Number(installmentStatus.december?.paid || 0)
      ]
    },
    {
      name: 'Ödenmesi Gereken',
      type: "line",
      data: [
        Number(installmentStatus.january?.un_paid || 0),
        Number(installmentStatus.february?.un_paid || 0),
        Number(installmentStatus.march?.un_paid || 0),
        Number(installmentStatus.april?.un_paid || 0),
        Number(installmentStatus.may?.un_paid || 0),
        Number(installmentStatus.june?.un_paid || 0),
        Number(installmentStatus.july?.un_paid || 0),
        Number(installmentStatus.august?.un_paid || 0),
        Number(installmentStatus.september?.un_paid || 0),
        Number(installmentStatus.octaber?.un_paid || 0),
        Number(installmentStatus.novamber?.un_paid || 0),
        Number(installmentStatus.december?.un_paid || 0)
      ]
    }
  ];
}