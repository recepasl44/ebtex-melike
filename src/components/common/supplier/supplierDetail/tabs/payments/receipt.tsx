import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  useSupplierPaymentsDetail,
} from "../../../../../hooks/supplierPayments/useDetail";
import { useSupplierShow } from "../../../../../hooks/suppliers/useSuppliersShow";

export default function SupplierPaymentReceipt() {
  const { supplierId, paymentId } = useParams<{ supplierId?: string; paymentId?: string }>();
  const navigate = useNavigate();

  const { supplierPayment, getSupplierPayment } = useSupplierPaymentsDetail();
  interface Supplier {
    name?: string;
    // Add other supplier properties as needed
  }

  interface SupplierShowHook {
    supplier: Supplier | null;
    getSupplier: (id: string) => void;
  }

  const { supplier, getSupplier }: SupplierShowHook = useSupplierShow(supplierId || "");

  /* Makbuz & tedarikçi verilerini getir */
  useEffect(() => {
    if (supplierId && paymentId) {
      getSupplierPayment({
        supplierId: Number(supplierId),
        supplierPaymentId: Number(paymentId),
      });
      getSupplier(supplierId);
    }
  }, [supplierId, paymentId, getSupplierPayment, getSupplier]);

  return (
    <Modal show centered onHide={() => navigate(-1)}>
      <Modal.Header closeButton>
        <Modal.Title>Ödeme Makbuzu</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {supplierPayment ? (
          <>
            <p><strong>Makbuz No:</strong> {supplierPayment.id}</p>
            <p><strong>Tedarikçi:</strong> {supplier?.name || supplierId}</p>
            <p><strong>Tarih:</strong> {supplierPayment.payment_date}</p>
            <p><strong>Ödeme Şekli:</strong> {supplierPayment.payment_method?.name ?? "-"}</p>
            <p><strong>Tutar:</strong> {Number(supplierPayment.amount).toLocaleString("tr-TR")} ₺</p>

            {supplierPayment.description && (
              <p><strong>Açıklama:</strong> {supplierPayment.description}</p>
            )}
          </>
        ) : (
          <p>Yükleniyor...</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => window.print()}>
          Yazdır
        </Button>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
