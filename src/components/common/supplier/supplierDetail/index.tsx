import { useEffect, useState } from "react"
import { Modal, Button, Nav, Tab } from "react-bootstrap"
import { useParams } from "react-router-dom"
import SupplierOverviewTab from "./tabs/supplierSummery"
import SupplierInvoiceTab from "./tabs/invoice/table"
import SupplierDebtTab from "./tabs/debts/table"
import SupplierRefundTab from "./tabs/refunds/table"
import SupplierPaymentTab from "./tabs/payments/table"
import SupplierNotesTab from "./tabs/notes/table"



import { useSupplierShow } from "../../../hooks/suppliers/useSuppliersShow"

interface ISupplierDetailModalProps {
  show: boolean
  supplier: {
    id: number
    name: string
  }
  onClose: () => void
}

export default function SupplierDetailModal({
  show,
  supplier,
  onClose,
}: ISupplierDetailModalProps) {
  const [activeKey, setActiveKey] = useState<string>("overview")
  const { id } = useParams<{ id?: string }>()
  const { supplier: fetchedSupplier, getSupplier } = useSupplierShow()

  useEffect(() => {
    if (id) {
      getSupplier(String(id))
    }
  }, [id, getSupplier])

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>{supplier?.name || fetchedSupplier?.name}</b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tab.Container
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k!)}
        >
          <Nav
            variant="tabs"
            className="mb-3 justify-content-start nav nav-style-2 nav-item nav-link.active"
          >
            <Nav.Item>
              <Nav.Link eventKey="overview">Özet</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="invoice">Fatura</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="debt">Borçlar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="refund">İadeler</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment">Ödemeler</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="notes">Notlar</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="overview">
              <SupplierOverviewTab supplierId={Number(id)} />
            </Tab.Pane>
   
            <Tab.Pane eventKey="invoice">
              <SupplierInvoiceTab
                supplierId={Number(id)}
                enabled={activeKey === "invoice"}
              />
               </Tab.Pane>
               <Tab.Pane eventKey="debt">
               <SupplierDebtTab
                supplierId={Number(id)}
                enabled={activeKey === "debt"}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="refund">
               <SupplierRefundTab
                supplierId={Number(id)}
                enabled={activeKey === "refund"}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="payment">
               <SupplierPaymentTab
                supplierId={Number(id)}
                enabled={activeKey === "payment"}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="notes">
               <SupplierNotesTab
                supplierId={Number(id)}
                enabled={activeKey === "notes"}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
