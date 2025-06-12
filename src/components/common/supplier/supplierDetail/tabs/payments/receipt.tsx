import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupplierPaymentsDetail } from "../../../../../hooks/supplierPayments/useDetail";
import { useSupplierShow } from "../../../../../hooks/suppliers/useSuppliersShow";

export default function SupplierPaymentReceipt() {
  const { supplierId, paymentId } = useParams<{ supplierId?: string; paymentId?: string }>();
  const navigate = useNavigate();
  const { supplierPayment, getSupplierPayment } = useSupplierPaymentsDetail();
  const { supplier, getSupplier } = useSupplierShow();

  useEffect(() => {
    if (supplierId && paymentId) {
      getSupplierPayment({ supplierId: Number(supplierId), supplierPaymentId: Number(paymentId) });
      getSupplier(supplierId);
    }
  }, [supplierId, paymentId, getSupplierPayment, getSupplier]);

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between mb-3">
        <h4>\u00d6deme Makbuzu</h4>
        <button className="btn btn-primary" onClick={() => window.print()}>Yazd\u0131r</button>
      </div>
      <hr />
      {supplierPayment ? (
        <div>
          <p><strong>Makbuz No:</strong> {supplierPayment.id}</p>
          <p><strong>Tedarik\u00e7i:</strong> {supplier?.name || supplierId}</p>
          <p><strong>Tarih:</strong> {supplierPayment.payment_date}</p>
          <p><strong>\u00d6deme \u015eekli:</strong> {supplierPayment.payment_method?.name ?? "-"}</p>
          <p><strong>Tutar:</strong> {Number(supplierPayment.amount).toLocaleString()} \u20ba</p>
          {supplierPayment.description && (
            <p><strong>A\u00e7\u0131klama:</strong> {supplierPayment.description}</p>
          )}
        </div>
      ) : (
        <p>Y\u00fckleniyor...</p>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Geri D\u00f6n</button>
    </div>
  );
}
