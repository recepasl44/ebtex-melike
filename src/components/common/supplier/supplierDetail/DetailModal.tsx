import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TabsContainer from "../../guidance/components/organisms/TabsContainer";
import SupplierOverviewTab from "./tabs/supplierSummery";
import SupplierInvoiceTab from "./tabs/invoice/table";
import SupplierDebtTab from "./tabs/debts/table";
import SupplierRefundTab from "./tabs/refunds/table";
import SupplierPaymentTab from "./tabs/payments/table";
import SupplierNotesTab from "./tabs/notes/table";
import { useSupplierShow } from "../../../hooks/suppliers/useSuppliersShow";

interface SupplierDetailModalProps {
  show: boolean;
  supplierId?: number;
  onClose: () => void;
}

export default function SupplierDetailModal({
  show,
  supplierId,
  onClose,
}: SupplierDetailModalProps) {
  const { id } = useParams<{ id?: string }>();
  const { supplier: fetchedSupplier, getSupplier } = useSupplierShow();
  const [activeTab, setActiveTab] = useState<number>(0);

  const finalId = id || (supplierId ? String(supplierId) : undefined);

  useEffect(() => {
    if (finalId) {
      getSupplier(finalId);
    }
  }, [finalId, getSupplier]);

  const numericId = finalId ? Number(finalId) : 0;

  const tabsConfig = [
    {
      label: "Finansal Özet",
      content: <SupplierOverviewTab supplierId={numericId} />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Fatura",
      content: (
        <SupplierInvoiceTab supplierId={numericId} enabled={activeTab === 1} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Borçlar",
      content: <SupplierDebtTab supplierId={numericId} enabled={activeTab === 2} />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "İadeler",
      content: (
        <SupplierRefundTab supplierId={numericId} enabled={activeTab === 3} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ödemeler",
      content: (
        <SupplierPaymentTab supplierId={numericId} enabled={activeTab === 4} />
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Notlar",
      content: <SupplierNotesTab supplierId={numericId} enabled={activeTab === 5} />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{fetchedSupplier?.name || ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabsContainer
          tabs={tabsConfig}
          onTabChange={(pIndex) => setActiveTab(pIndex)}
        />
      </Modal.Body>
    </Modal>
  );
}
