import { useState } from 'react';
import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';

interface CustomerFormValues {
  name: string;
  email?: string;
  phone?: string;
  iban?: string;
  city?: string;
  county?: string;
  district?: string;
  address?: string;
  customer_type: 'tuzel' | 'gercek';
  tax_number?: string;
  tax_office?: string;
  tc_no?: string;
}

interface AddCustomerModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (customer: { id: number; name: string }) => void;
}

export default function AddCustomerModal({ show, onClose, onAdd }: AddCustomerModalProps) {
  const initialValues: CustomerFormValues = {
    name: '',
    email: '',
    phone: '',
    iban: '',
    city: '',
    county: '',
    district: '',
    address: '',
    customer_type: 'gercek',
    tax_number: '',
    tax_office: '',
    tc_no: '',
  };

  const getFields = (values: CustomerFormValues): FieldDefinition[] => {
    const base: FieldDefinition[] = [
      { name: 'name', label: 'Firma/Kişi Adı', type: 'text', required: true },
      { name: 'email', label: 'E-Posta', type: 'email' },
      { name: 'phone', label: 'Telefon', type: 'phone' },
      { name: 'iban', label: 'IBAN', type: 'iban' },
      { name: 'city', label: 'İl', type: 'text' },
      { name: 'county', label: 'İlçe', type: 'text' },
      { name: 'district', label: 'Mahalle', type: 'text' },
      { name: 'address', label: 'Adres', type: 'textarea' },
      {
        name: 'customer_type',
        label: 'Müşteri Türü',
        type: 'select',
        options: [
          { label: 'Tüzel Kişi', value: 'tuzel' },
          { label: 'Gerçek Kişi', value: 'gercek' },
        ],
        required: true,
      },
    ];

    if (values.customer_type === 'tuzel') {
      base.push(
        { name: 'tax_number', label: 'Vergi No', type: 'text', required: true },
        { name: 'tax_office', label: 'Vergi Dairesi', type: 'text', required: true },
      );
    } else {
      base.push({ name: 'tc_no', label: 'T.C. Kimlik No', type: 'text', required: true });
    }

    return base;
  };

  const handleSubmit = (
    values: CustomerFormValues,
    helpers: FormikHelpers<CustomerFormValues>,
  ) => {
    onAdd({ id: Date.now(), name: values.name });
    helpers.setSubmitting(false);
    onClose();
  };

  return (
    <ReusableModalForm<CustomerFormValues>
      show={show}
      title="Müşteri Ekle"
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onClose={onClose}
      confirmButtonLabel="Kaydet"
    />
  );
}
