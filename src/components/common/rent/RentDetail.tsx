import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useRentShow } from "../../hooks/rent/useRentShow";
import { RentInstallment, RentPayment } from "../../../types/rent/detail";

const RentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { rent, getRent } = useRentShow();

  useEffect(() => {
    if (id) {
      getRent(Number(id));
    }
  }, [id, getRent]);

  const installmentColumns: ColumnDefinition<RentInstallment>[] = useMemo(
    () => [
      { key: "installment_no", label: "Sıra No" },
      { key: "due_date", label: "Tarih" },
      { key: "amount", label: "Miktar" },
      { key: "remaining_amount", label: "Kalan" },
    ],
    []
  );

  const paymentColumns: ColumnDefinition<RentPayment>[] = useMemo(
    () => [
      { key: "payment_no", label: "Sıra No" },
      { key: "payment_date", label: "Tarih" },
      { key: "amount", label: "Miktar" },
    ],
    []
  );

  const payments = useMemo(() => {
    if (!rent) return [] as RentPayment[];
    return rent.installments.flatMap((i) => (i.payments ?? []).map((p) => ({ ...p })));
  }, [rent]);

  const totalPaid = useMemo(() => {
    if (!rent) return 0;
    return rent.installments.reduce(
      (sum, inst) => sum + (Number(inst.amount) - Number(inst.remaining_amount)),
      0
    );
  }, [rent]);

  const remaining = useMemo(() => {
    if (!rent) return 0;
    return Number(rent.total_rent) - totalPaid;
  }, [rent, totalPaid]);

  if (!rent) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mt-3">
      <h4>Kira Ödemeleri</h4>
      <p>Kira Toplamı: {rent.total_rent}</p>
      <p>Ödenen: {totalPaid}</p>
      <p>Kalan: {remaining}</p>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header as="h5">Taksitler</Card.Header>
            <Card.Body className="p-3">
              <ReusableTable<RentInstallment>
                columns={installmentColumns}
                data={rent.installments}
              />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header as="h5">Ödemeler</Card.Header>
            <Card.Body className="p-3">
              <ReusableTable<RentPayment>
                columns={paymentColumns}
                data={payments}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentDetailPage;
