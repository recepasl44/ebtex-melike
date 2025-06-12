import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../../utils/formatters";

interface InstallmentsTableProps {
  student: any;
  enrollment: any;
  onPayment?: (installmentId: number) => void;
}

// Taksit statüsü render fonksiyonu - bileşen dışında tanımlanarak gereksiz re-render önlendi
const renderInstallmentStatus = (row: any) => {
  return row.is_paid === 1 ? (
    <span className="badge bg-success">Ödendi</span>
  ) : (
    <span className="badge bg-warning">Ödenecek</span>
  );
};

export default function InstallmentsTable({
  student,
  enrollment,
  onPayment,
}: InstallmentsTableProps) {
  const navigate = useNavigate();

  // Taksit verilerini tabloya uygun formata dönüştürme
  const installments = useMemo(() => {
    if (!enrollment?.installments) return [];

    return enrollment.installments.map((installment: any) => ({
      ...installment,
      enrollment_id: enrollment.id,
      service_id: enrollment.service_id,
      student_id: student.id,
    }));
  }, [enrollment, student]);

  // Taksit öde butonuna tıklandığında
  const handlePaymentClick = (installment: any) => {
    if (onPayment) {
      onPayment(installment.id);
    } else {
      navigate(`/studentinstallmentcrud/${installment.id}`, {
        state: {
          installmentId: installment.id,
          enrollmentId: installment.enrollment_id,
          studentId: installment.student_id,
        },
      });
    }
  };

  // İşlem butonu render fonksiyonu - actions için optimize edildi
  const renderActionButton = (row: any) => {
    if (row.is_paid !== 1) {
      return (
        <Button
          size="sm"
          variant="primary"
          onClick={() => handlePaymentClick(row)}
        >
          Taksit Öde
        </Button>
      );
    }
    return null;
  };

  // Tablo kolonları - useMemo ile optimize edildi
  const columns: ColumnDefinition<any>[] = useMemo(() => {
    return [
      {
        key: "due_date",
        label: "Taksit Tarihi",
        render: (row: any) => formatDate(row.due_date),
      },
      {
        key: "amount",
        label: "Tutar",
        render: (row) => formatCurrency(row.amount),
      },
      {
        key: "status",
        label: "Durum",
        render: renderInstallmentStatus,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: renderActionButton,
      },
    ];
  }, []);

  // Matematik hesaplamaları
  const calculations = useMemo(() => {
    // forEach yerine reduce kullanarak tek geçişte hesaplama
    return installments.reduce(
      (calc: any, installment: any) => {
        const amount = parseFloat(installment.amount) || 0;
        calc.total += amount;

        if (installment.is_paid === 1) {
          calc.paidTotal += amount;
          calc.paidCount++;
        } else {
          calc.remainingTotal += amount;
          calc.unpaidCount++;
        }

        return calc;
      },
      {
        total: 0,
        paidTotal: 0,
        remainingTotal: 0,
        paidCount: 0,
        unpaidCount: 0,
      }
    );
  }, [installments]);

  return (
    <div>
      <ReusableTable
        columns={columns}
        data={installments}
        totalItems={installments.length}
      />

      {/* Matematik hesapları özet bölümü */}
      <div className="mt-3 p-2 bg-light rounded">
        <Row>
          <Col md={6}>
            <div className="mb-2">
              <span className="text-muted">Taksit Sayısı:</span>{" "}
              {installments.length}
              <span className="ms-2 text-success">
                ({calculations.paidCount} Ödenmiş)
              </span>
              <span className="ms-2 text-warning">
                ({calculations.unpaidCount} Ödenecek)
              </span>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <div className="mb-2 fw-bold">
              <span className="text-success">
                Ödenen: {formatCurrency(calculations.paidTotal)}
              </span>
              <span className="ms-3 text-warning">
                Kalan: {formatCurrency(calculations.remainingTotal)}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
