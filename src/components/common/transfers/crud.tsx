import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";

import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { ITransferForm } from "../../../types/transfers/add";
import { useTransferAdd } from "../../hooks/transfers/useAdd";
import { useTransferShow } from "../../hooks/transfers/useShow";
import { useTransferUpdate } from "../../hooks/transfers/useUpdate";

interface TransferModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

function getFields(values: ITransferForm): FieldDefinition[] {
  const baseFields: FieldDefinition[] = [
    {
      name: "transaction_type",
      label: "İşlem Türü",
      type: "select",
      required: true,
      options: [
        { label: "Şube İçi Bankadan Nakite", value: "sube_ici_bankadan_nakite" },
        {
          label: "Şube İçi Nakitkasadan Bankaya",
          value: "sube_ici_nakitsasadan_bankaya",
        },
        {
          label: "Şube İçi Kredi Kartından Bankaya",
          value: "sube_ici_kredikartindan_bankaya",
        },
        {
          label: "Şube İçi Bankadan Bankaya",
          value: "sube_ici_bankadan_bankaya",
        },
        { label: "Şubeler Arası Nakit", value: "subeler_arasi_nakit" },
        {
          label: "Şubeler Arası Bankadan Bankaya",
          value: "subeler_arasi_bankadan_bankaya",
        },
        {
          label: "Şubeler Arası Nakitkasadan Bankaya",
          value: "subeler_arasi_nakitsasadan_bankaya",
        },
        {
          label: "Şubeler Arası Bankadan Nakitkasaya",
          value: "subeler_arasi_bankadan_nakitkasaya",
        },
        { label: "Şubeler Arası Çek", value: "subeler_arasi_cek" },
        { label: "Şubeler Arası Senet", value: "subeler_arasi_senet" },
      ],
    },
  ];

  let conditionalFields: FieldDefinition[] = [];
  const type = values.transaction_type;

  if (
    type === "sube_ici_bankadan_nakite" ||
    type === "sube_ici_nakitsasadan_bankaya" ||
    type === "sube_ici_kredikartindan_bankaya"
  ) {
    conditionalFields = [
      {
        name: "sender_branch_id",
        label: "Şube",
        type: "number",
        required: true,
      },
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "bank_account",
        label: "Banka Hesabı",
        type: "text",
        required: true,
      },
      { name: "description", label: "Açıklama", type: "text" },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "sube_ici_bankadan_bankaya") {
    conditionalFields = [
      {
        name: "sender_branch_id",
        label: "Şube",
        type: "number",
        required: true,
      },
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "bank_account",
        label: "Gönderen Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "receiver_bank_account",
        label: "Alıcı Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_nakit") {
    conditionalFields = [
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_bankadan_bankaya") {
    conditionalFields = [
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "sender_bank_account",
        label: "Gönderen Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "receiver_bank_account",
        label: "Alıcı Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_nakitsasadan_bankaya") {
    conditionalFields = [
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_bankadan_nakitkasaya") {
    conditionalFields = [
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "sender_bank_account",
        label: "Gönderen Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "receiver_bank_account",
        label: "Alıcı Banka Hesabı",
        type: "text",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_cek") {
    conditionalFields = [
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "sender_instrument_id",
        label: "Gönderen Çek ID",
        type: "number",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "receiver_instrument_id",
        label: "Alıcı Çek ID",
        type: "number",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else if (type === "subeler_arasi_senet") {
    conditionalFields = [
      {
        name: "description",
        label: "Açıklama",
        type: "text",
        required: true,
      },
      {
        name: "sender_branch_id",
        label: "Gönderen Şube",
        type: "number",
        required: true,
      },
      {
        name: "sender_instrument_id",
        label: "Gönderen Senet ID",
        type: "number",
        required: true,
      },
      {
        name: "receiver_branch_id",
        label: "Alıcı Şube",
        type: "number",
        required: true,
      },
      {
        name: "receiver_instrument_id",
        label: "Alıcı Senet ID",
        type: "number",
        required: true,
      },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  } else {
    // Default fallback if none of the above match
    conditionalFields = [
      {
        name: "sender_branch_id",
        label: "Gönderen Şube ID",
        type: "number",
        required: true,
      },
      { name: "amount", label: "Tutar", type: "currency", required: true },
      {
        name: "bank_account",
        label: "Banka Hesabı",
        type: "text",
        required: true,
      },
      { name: "description", label: "Açıklama", type: "text" },
      {
        name: "seassion_id",
        label: "Seans ID",
        type: "number",
        required: true,
      },
    ];
  }

  return [...baseFields, ...conditionalFields];
}

const TransferModal: React.FC<TransferModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = (location.state as any)?.mode ?? (id ? "update" : "add");

  // Initial form values
  const [initialValues, setInitialValues] = useState<ITransferForm>({
    transaction_type: "",
    sender_branch_id: 0,
    receiver_branch_id: 0,
    amount: 0,
    bank_account: "",
    description: "",
    seassion_id: 0,
  });

  // Hooks for add, update, show
  const { addNewTransfer } = useTransferAdd();
  const {
    updateExistingTransfer,
    status: updateStatus,
    error: updateError,
  } = useTransferUpdate();
  const {
    transfer: fetchedTransfer,
    status: showStatus,
    error: showError,
    getTransfer,
  } = useTransferShow();

  useEffect(() => {
    if ((mode === "update" || mode === "detail") && id) {
      getTransfer(Number(id));
    }
  }, [mode, id, getTransfer]);

  useEffect(() => {
    if (mode === "update" && fetchedTransfer) {
      setInitialValues({
        transaction_type: fetchedTransfer.transaction_type || "",
        sender_branch_id: fetchedTransfer.sender_branch_id || 0,
        receiver_branch_id: fetchedTransfer.receiver_branch_id || 0,
        amount: Number(fetchedTransfer.amount) || 0,
        bank_account: fetchedTransfer.bank_account || "",
        description: fetchedTransfer.description || "",
        seassion_id: fetchedTransfer.seassion_id || 0,
      });
    }
  }, [mode, fetchedTransfer]);

  const isLoading =
    mode === "update"
      ? updateStatus === "LOADING" || showStatus === "LOADING"
      : mode === "detail"
        ? showStatus === "LOADING"
        : false;

  const combinedError =
    mode === "update"
      ? updateError || showError
      : mode === "detail"
        ? showError
        : null;

  async function handleSubmit(
    values: ITransferForm,
    helpers: FormikHelpers<ITransferForm>
  ) {
    try {
      if (mode === "add") {
        await addNewTransfer(values);
      } else if (mode === "update" && id) {
        await updateExistingTransfer({
          transferId: Number(id),
          payload: {
            ...values,
            name: values.description || "Transfer",
          },
        });
      }
      onRefresh();
      onClose();
    } catch (error) {
      // You can handle or log error details here if needed
      console.error("Error adding/updating transfer:", error);
    } finally {
      helpers.setSubmitting(false);
    }
  }

  if (mode === "detail") {
    const columns: ColumnDefinition<any>[] = [
      { key: "branch", label: "Şube" },
      { key: "transaction_type", label: "İşlem Türü" },
      { key: "received_amount", label: "Alınan" },
      { key: "given_amount", label: "Verilen" },
      { key: "bank_name", label: "Banka Hesap Adı" },
      { key: "created_at", label: "Tarih" },
      { key: "description", label: "Açıklama" },
    ];

    const data = fetchedTransfer
      ? [
          {
            branch:
              (fetchedTransfer as any).branch_name ||
              fetchedTransfer.sender_branch_id ||
              "-",
            transaction_type: fetchedTransfer.transaction_type,
            received_amount: (fetchedTransfer as any).received_amount
              ? `₺${Number((fetchedTransfer as any).received_amount).toLocaleString()}`
              : "-",
            given_amount: (fetchedTransfer as any).given_amount
              ? `₺${Number((fetchedTransfer as any).given_amount).toLocaleString()}`
              : "-",
            bank_name:
              (fetchedTransfer as any).bank_name || fetchedTransfer.bank_account,
            created_at: new Date(fetchedTransfer.created_at).toLocaleDateString(),
            description: fetchedTransfer.description,
          },
        ]
      : [];

    return (
      <ReusableTable
        showModal={show}
        onCloseModal={() => navigate(-1)}
        modalTitle="Transfer Detayı"
        columns={columns}
        data={data}
        tableMode="single"
        loading={isLoading}
        error={combinedError as any}
        showExportButtons={false}
      />
    );
  }

  return (
    <ReusableModalForm<ITransferForm>
      show={show}
      title={mode === "add" ? "Transfer Ekle" : "Transfer Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={onClose}
      autoGoBackOnModalClose
    />
  );
};

export default TransferModal;
