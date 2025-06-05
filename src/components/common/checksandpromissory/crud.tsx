import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useInstrumentsAdd } from "../../hooks/instruments/useInstrumentsAdd";
import { useInstrumentsUpdate } from "../../hooks/instruments/useInstrumentsUpdate";
import { useInstrumentsShow } from "../../hooks/instruments/useInstrumentsShow";
import { FormikHelpers, FormikValues } from "formik";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSuppliersTable } from "../../hooks/suppliers/useSuppliersList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import InstrumentDocumentType from "../../../enums/instruments/documentType";
import InstrumentDocumentStatus from "../../../enums/instruments/documentStatus";

interface IInstrumentFormData extends FormikValues {
    branch_id: number;
    document_type: number;
    supplier_id: number;
    document_owner_name: string;
    document_status: string;
    amount: string;
    due_date: string;
    bank: string;
    check_no: string;
    transaction_no: string;
    season: string;
    instrument_no: string;
    owner_name: string;
    receive_document_type: string;
    receive_document_name: string;
    guarantors: string;
    school_no: number;
    bozdur_swap: boolean;
    image_base: string;
}

export default function ChecksAndPromissoryCrud() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const mode = id ? "update" : "add";

    const [initialValues, setInitialValues] = useState<IInstrumentFormData>({
        branch_id: 0,
        document_type: 1,
        supplier_id: 0,
        document_owner_name: "",
        document_status: "",
        amount: "",
        due_date: new Date().toISOString().split("T")[0],
        bank: "",
        check_no: "",
        transaction_no: "",
        season: "",
        instrument_no: "",
        owner_name: "",
        receive_document_type: "",
        receive_document_name: "",
        guarantors: "",
        school_no: 0,
        bozdur_swap: false,
        image_base: "",
    });

    const [supplierSearch, setSupplierSearch] = useState("");
    const { branchData } = useBranchTable({ enabled: true });
    const { suppliersData } = useSuppliersTable({ enabled: true, search: supplierSearch });
    const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 999 });

    const getFields = useCallback((): FieldDefinition[] => [
        {
            name: "branch_id",
            label: "Şube",
            type: "select",
            required: true,
            options: (branchData || []).map((b) => ({ value: b.id, label: b.name })),
        },
        {
            name: "document_type",
            label: "Tür",
            type: "select",
            required: true,
            options: [
                { value: InstrumentDocumentType.CHECK, label: "Çek" },
                { value: InstrumentDocumentType.PROMISSORY_NOTE, label: "Senet" },
            ],
        },
        {
            name: "supplier_id",
            label: "Tedarikçi",
            type: "autocomplete",
            required: true,
            options: (suppliersData || []).map((s) => ({ value: s.id, label: s.name })),
            onInputChange: (text) => setSupplierSearch(text),
        },
        { name: "document_owner_name", label: "Belge Sahibi", type: "text", required: true },
        {
            name: "document_status",
            label: "Durum",
            type: "select",
            options: [
                { value: InstrumentDocumentStatus.NEW, label: "Yeni" },
                { value: InstrumentDocumentStatus.SWAPPED, label: "Swap Edilmiş" },
                { value: InstrumentDocumentStatus.CASHED, label: "Bozdurulmuş" },
            ],
        },
        { name: "amount", label: "Tutar", type: "currency", required: true },
        { name: "due_date", label: "Vade", type: "date", required: true },
        { name: "bank", label: "Banka", type: "text" },
        { name: "check_no", label: "No", type: "text" },
        { name: "transaction_no", label: "İşlem No", type: "text" },
        {
            name: "season",
            label: "Dönem",
            type: "select",
            options: (seasonsData || []).map((s: any) => ({ value: s.name, label: s.name })),
        },
        { name: "instrument_no", label: "Enstrüman No", type: "text" },
        { name: "owner_name", label: "Senet Adı", type: "text" },
        { name: "receive_document_type", label: "Belge Türü", type: "text" },
        { name: "receive_document_name", label: "Belge Adı", type: "text" },
        { name: "guarantors", label: "Kefiller", type: "multiselect" },
        { name: "school_no", label: "Okul No", type: "text" },
        { name: "bozdur_swap", label: "Bozdur/Swap", type: "checkbox" },
        { name: "image_base", label: "Görüntü", type: "file" },
    ], [branchData, suppliersData, seasonsData]);

    const { addNewInstrument, status: addStatus, error: addError } = useInstrumentsAdd();
    const { updateExistingInstrument, status: updateStatus, error: updateError } = useInstrumentsUpdate();
    const { instrument: fetchedInstrument, status: showStatus, error: showError, getInstrument } = useInstrumentsShow();

    useEffect(() => {
        if (mode === "update" && id) {
            getInstrument(Number(id));
        }
    }, [mode, id, getInstrument]);

    useEffect(() => {
        if (mode === "update" && fetchedInstrument) {
            setInitialValues({
                branch_id: fetchedInstrument.branch_id,
                document_type: fetchedInstrument.document_type,
                supplier_id: 0,
                document_owner_name: fetchedInstrument.document_owner_name,
                document_status: fetchedInstrument.status || "",
                amount: fetchedInstrument.amount,
                due_date: fetchedInstrument.due_date,
                bank: fetchedInstrument.bank,
                check_no: fetchedInstrument.check_no,
                transaction_no: fetchedInstrument.transaction_no,
                season: fetchedInstrument.season,
                instrument_no: fetchedInstrument.instrument_no,
                owner_name: fetchedInstrument.owner_name,
                receive_document_type: fetchedInstrument.receive_document_type || "",
                receive_document_name: fetchedInstrument.receive_document_name || "",
                guarantors: fetchedInstrument.guarantors || "",
                school_no: fetchedInstrument.school_no || 0,
                bozdur_swap: Boolean(fetchedInstrument.bozdur_swap),
                image_base: "",
            });
        }
    }, [mode, fetchedInstrument]);

    const isLoading = (mode === "add" && addStatus === "LOADING") ||
        (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
    const combinedError = mode === "add" ? addError : updateError || showError;

    async function handleSubmit(values: IInstrumentFormData, _helpers: FormikHelpers<IInstrumentFormData>) {
        if (mode === "add") {
            await addNewInstrument(values as any);
        } else if (mode === "update" && id) {
            await updateExistingInstrument({ instrumentId: Number(id), payload: values });
        }
        navigate(-1);
    }

    return (
        <ReusableModalForm<IInstrumentFormData>
            show={true}
            title={mode === "add" ? "Çek/Senet Ekle" : "Çek/Senet Güncelle"}
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={combinedError || null}
            onClose={() => navigate(-1)}
            autoGoBackOnModalClose
        />
    );
}