import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';
import { useSeasonsList } from '../../hooks/season/useSeasonsList';
import { usePaymentMethodsList } from '../../hooks/paymentMethods/useList';

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit?: (values: OtherIncomePaymentValues) => void;
}

export interface OtherIncomePaymentValues {
  season_id: number | null;
  date: string;
  income_item: string;
  amount: string;
  payment_method_id: number | null;
  description?: string;
}

export default function GetPaidModal({
  show,
  onClose,
  onSubmit,
}: PaymentModalProps) {
  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 999 });
  const { paymentMethodsData } = usePaymentMethodsList({ enabled: true });

  const seasonOptions = seasonsData.map((s) => ({ label: s.name, value: s.id }));
  const paymentOptions = paymentMethodsData.map((pm) => ({ label: pm.name, value: pm.id }));

  const initialValues: OtherIncomePaymentValues = {
    season_id: null,
    date: '',
    income_item: '',
    amount: '',
    payment_method_id: null,
    description: '',
  };

  const fields: FieldDefinition[] = [
    { name: 'season_id', label: 'Sezon', type: 'select', options: seasonOptions },
    { name: 'date', label: 'Tarih', type: 'date', required: true },
    { name: 'income_item', label: 'Gelir Kalemi', type: 'text', required: true },
    { name: 'amount', label: 'Tutar', type: 'currency', required: true },
    {
      name: 'payment_method_id',
      label: 'Ödeme Şekli',
      type: 'select',
      options: paymentOptions,
    },
    { name: 'description', label: 'Açıklama', type: 'textarea' },
  ];

  const handleSubmit = (
    values: OtherIncomePaymentValues,
    helpers: FormikHelpers<OtherIncomePaymentValues>
  ) => {
    onSubmit?.(values);
    helpers.setSubmitting(false);
    onClose();
  };

  return (
    <ReusableModalForm<OtherIncomePaymentValues>
      show={show}
      onClose={onClose}
      title="Ödeme Al"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}

