import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";

interface DiscountDetailRow {
  price: number;
  general_discount: number;
  seasonal_discount: number;
  total_discount: number;
  discount_percent: number;
  registration_price: number;
}

export default function DiscountStudentDetail() {
  const { sozlesme_no } = useParams<{ sozlesme_no: string }>();
  const navigate = useNavigate();

  const columns: ColumnDefinition<DiscountDetailRow>[] = useMemo(
    () => [
      {
        key: "price",
        label: "Liste Fiyatı",
        render: (row) => `₺${row.price.toLocaleString()}`,
      },
      {
        key: "seasonal_discount",
        label: "Dönemsel İndirim",
        render: (row) => `₺${row.seasonal_discount.toLocaleString()}`,
      },
      {
        key: "general_discount",
        label: "Genel İndirim",
        render: (row) => `₺${row.general_discount.toLocaleString()}`,
      },
      {
        key: "total_discount",
        label: "Toplam İndirim",
        render: (row) => `₺${row.total_discount.toLocaleString()}`,
      },
      {
        key: "discount_percent",
        label: "İndirim Yüzdesi",
        render: (row) => `${row.discount_percent}%`,
      },
      {
        key: "registration_price",
        label: "Kayıt Fiyatı",
        render: (row) => `₺${row.registration_price.toLocaleString()}`,
      },
    ],
    []
  );

  // TODO: Fetch detail data using sozlesme_no
  const data: DiscountDetailRow[] = useMemo(
    () => [
      {
        price: 0,
        general_discount: 0,
        seasonal_discount: 0,
        total_discount: 0,
        discount_percent: 0,
        registration_price: 0,
      },
    ],
    []
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<DiscountDetailRow>
        pageTitle={`Sözleşme #${sozlesme_no}`}
        columns={columns}
        data={data}
        tableMode="single"
        showModal={true}
        onCloseModal={() => navigate(-1)}
        exportFileName="discount-student-detail"
        modalTitle="İndirim Detayı"
        button={() => window.print()}
        buttonText="Yazdır"
      />
    </div>
  );
}