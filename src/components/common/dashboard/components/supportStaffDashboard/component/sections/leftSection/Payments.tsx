import { Card, Col } from "react-bootstrap"
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component"
import { Supplier } from "../../../../../type"
interface SupplierPayment {
  supplierPayments:Supplier[]
}
const Payments :React.FC<SupplierPayment> = ({ supplierPayments }) => {
  return (
    <Col>
          {/* Ödemeler Tablosu */}
        <Card className="custom-card mt-4">
          <Card.Header className="justify-content-between">
            <Card.Title>Ödemeler</Card.Title>
          </Card.Header>
          <Card.Body className="p-3">
            <div className="table-responsive">
              <SpkTablescomponent
                tableClass="text-wrap"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Kişi / Firma" },
                  { title: "Vade" },
                  { title: "Ödeme Şekli" },
                  { title: "Tutar" },
                  { title: "Durum" },
                ]}
              >
                {supplierPayments.map((supplier :any, index:any) => (
                  <tr key={`supplier-${index}`}>
                    <td
                      className="text-truncate"
                      style={{ maxWidth: "100px" }}
                    >
                      {supplier.name}
                    </td>
                    <td className="text-nowrap">{supplier.expiry}</td>
                    <td className="text-nowrap">
                      {supplier.payment_method === "bank"
                        ? "Banka"
                        : supplier.payment_method}
                    </td>
                    <td className="text-nowrap">₺{supplier.total}</td>
                    <td className="text-nowrap">
                      <span
                        className={`text-nowrap text-${
                          supplier.status === "ödendi"
                            ? "success"
                            : supplier.status === "ödenmedi"
                            ? "danger"
                            : "primary"
                        }`}
                      >
                        {supplier.status.charAt(0).toUpperCase() +
                          supplier.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </SpkTablescomponent>
            </div>
          </Card.Body>
        </Card>
    </Col>
  )
}

export default Payments
