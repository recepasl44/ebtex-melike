import { useState, useEffect } from "react";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useInstrumentsShow } from "../../hooks/instruments/useInstrumentsShow";
import { useInstrumentsUpdate } from "../../hooks/instruments/useInstrumentsUpdate";

interface CashModalProps {
    instrumentId: number | null;
    onClose: () => void;
}

export default function CashInstrumentModal({ instrumentId, onClose }: CashModalProps) {
    const { instrument, getInstrument } = useInstrumentsShow();
    const { updateExistingInstrument, status, error } = useInstrumentsUpdate();

    const [initialValues, setInitialValues] = useState<{ transaction_no: string }>({ transaction_no: "" });

    useEffect(() => {
        if (instrumentId) getInstrument(instrumentId);
    }, [instrumentId, getInstrument]);

    useEffect(() => {
        if (instrument) setInitialValues({ transaction_no: instrument.transaction_no || "" });
    }, [instrument]);

    const getFields = (): FieldDefinition[] => [
        { name: "transaction_no", label: "İşlem No", type: "text" },
    ];

    const handleSubmit = async (values: { transaction_no: string }) => {
        if (!instrumentId) return;
        await updateExistingInstrument({
            instrumentId,
            payload: { transaction_no: values.transaction_no, bozdur_swap: true, document_status: "bozdurulmuş" },
        });
        onClose();
    };

    return (
             <div className="container-fluid mt-3">

        <ReusableModalForm<{ transaction_no: string }>
            show={instrumentId !== null}
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="Vazgeç"
            isLoading={status === "LOADING"}
            error={error}
            onClose={onClose}
            autoGoBackOnModalClose
        />
            </div>
    );
}
