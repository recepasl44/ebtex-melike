import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import SupplierOverviewTab from "./tabs/supplierSummery.tsx"
import SupplierInvoiceTab from "./tabs/invoice/table.tsx"
import SupplierDebtTab from "./tabs/debts/table.tsx"
import SupplierRefundTab from "./tabs/refunds/table.tsx"
import SupplierPaymentTab from "./tabs/payments/table.tsx"
import SupplierNotesTab from "./tabs/notes/table.tsx"
import TabsContainer from "../../guidance/components/organisms/TabsContainer.tsx"



import { useSupplierShow } from "../../../hooks/suppliers/useSuppliersShow.tsx"

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
  const [activeTab, setActiveTab] = useState<number>(0)
  const { id } = useParams<{ id?: string }>()
  const { supplier: fetchedSupplier, getSupplier } = useSupplierShow()

  useEffect(() => {
    if (id) {
      getSupplier(String(id))
    }
  }, [id, getSupplier])
const tabsConfig = [
    {
      label: "Özet",
      content: <SupplierOverviewTab supplierId={Number(id)} />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Fatura",
      content: (
        <SupplierInvoiceTab
          supplierId={Number(id)}
          enabled={activeTab === 1}
        />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Borçlar",
      content: (
        <SupplierDebtTab supplierId={Number(id)} enabled={activeTab === 2} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "İadeler",
      content: (
        <SupplierRefundTab supplierId={Number(id)} enabled={activeTab === 3} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ödemeler",
      content: (
        <SupplierPaymentTab supplierId={Number(id)} enabled={activeTab === 4} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Notlar",
      content: (
        <SupplierNotesTab supplierId={Number(id)} enabled={activeTab === 5} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
  ]

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>{supplier?.name || fetchedSupplier?.name}</b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
            <TabsContainer
          tabs={tabsConfig}
          onTabChange={(parentIndex) => setActiveTab(parentIndex)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
