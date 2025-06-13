import { useState } from 'react';
import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';
import { useSeasonsList } from '../../hooks/season/useSeasonsList';
import { usePaymentMethodsList } from '../../hooks/paymentMethods/useList';
import { useOtherIncomeAdd } from '../../hooks/otherIncome/useOtherIncomeAdd';
import { OtherIncomeAddPayload } from '../../../types/otherIncome/add';
import AddCustomerModal from '../customers/AddCustomerModal';
import AddIncomeItemModal from '../incomeItems/AddIncomeItemModal';
import { Button } from 'react-bootstrap';

interface AddOtherIncomeModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AddOtherIncomeModal({ show, onClose }: AddOtherIncomeModalProps) {
  const { addNew, status, error } = useOtherIncomeAdd();
  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 999 });
  const { paymentMethodsData } = usePaymentMethodsList({ enabled: true });

  const [customers, setCustomers] = useState<{ id: number; name: string }[]>([]);
  const [incomeItems, setIncomeItems] = useState<{ id: number; name: string }[]>([]);

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showIncomeItemModal, setShowIncomeItemModal] = useState(false);

  const initialValues: OtherIncomeAddPayload = {
    season: '',
    date: '',
    customer_id: 0,
    income_item: '',
    payment_method: '',
    amount: 0,
    description: '',
    other_income_category_id: undefined,
  };

  const getFields = (): FieldDefinition[] => [
    {
      name: 'season',
      label: 'Sezon',
      type: 'select',
      options: seasonsData.map((s) => ({ label: s.name, value: s.name })),
      required: true,
    },
    { name: 'date', label: 'Tarih', type: 'date', required: true },
    {
      name: 'customer_id',
      label: 'Müşteri',
      required: true,
      renderForm: (formik) => (
        <div style={{ display: 'flex' }}>
          <select
            className="form-select"
            value={formik.values.customer_id}
            onChange={(e) => formik.setFieldValue('customer_id', Number(e.target.value))}
            style={{ flex: 1 }}
          >
            <option value="">Seçiniz</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <Button variant="outline-secondary" onClick={() => setShowCustomerModal(true)} style={{ marginLeft: 8 }}>
            <i className="ti ti-plus" />
          </Button>
        </div>
      ),
    },
    {
      name: 'income_item',
      label: 'Gelir Kalemi',
      required: true,
      renderForm: (formik) => (
        <div style={{ display: 'flex' }}>
          <select
            className="form-select"
            value={formik.values.income_item}
            onChange={(e) => formik.setFieldValue('income_item', e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">Seçiniz</option>
            {incomeItems.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <Button variant="outline-secondary" onClick={() => setShowIncomeItemModal(true)} style={{ marginLeft: 8 }}>
            <i className="ti ti-plus" />
          </Button>
        </div>
      ),
    },
    {
      name: 'payment_method',
      label: 'Ödeme Şekli',
      type: 'select',
      options: paymentMethodsData.map((pm) => ({ label: pm.name, value: pm.name })),
    },
    { name: 'amount', label: 'Tutar', type: 'currency', required: true },
    { name: 'description', label: 'Açıklama', type: 'textarea' },
  ];

  const handleSubmit = async (
    values: OtherIncomeAddPayload,
    helpers: FormikHelpers<OtherIncomeAddPayload>,
  ) => {
    await addNew(values);
    helpers.setSubmitting(false);
    onClose();
  };

  return (
    <>
      <ReusableModalForm<OtherIncomeAddPayload>
        show={show}
        title="Farklı Gelir Ekle"
        fields={getFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onClose={onClose}
        confirmButtonLabel="Kaydet"
        isLoading={status === 'LOADING'}
        error={error}
      />

      {showCustomerModal && (
        <AddCustomerModal
          show={showCustomerModal}
          onClose={() => setShowCustomerModal(false)}
          onAdd={(c) => setCustomers((prev) => [...prev, c])}
        />
      )}

      {showIncomeItemModal && (
        <AddIncomeItemModal
          show={showIncomeItemModal}
          onClose={() => setShowIncomeItemModal(false)}
          onAdd={(i) => setIncomeItems((prev) => [...prev, i])}
        />
      )}
    </>
  );
}
