import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';
import { useOtherIncomeAdd } from '../../hooks/otherIncome/useOtherIncomeAdd';
import { useOtherIncomeUpdate } from '../../hooks/otherIncome/useOtherIncomeUpdate';
import { useOtherIncomeShow } from '../../hooks/otherIncome/useOtherIncomeShow';
import { useSeasonsList } from '../../hooks/season/useSeasonsList';
import { usePaymentMethodsList } from '../../hooks/paymentMethods/useList';
import { OtherIncomeAddPayload } from '../../../types/otherIncome/add';
import { OTHER_INCOME } from '../../../helpers/url_helper';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function OtherIncomeCrud({ show, onClose, onRefresh }: ModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const { addNew } = useOtherIncomeAdd();
  const { update } = useOtherIncomeUpdate();
  const { detail } = useOtherIncomeShow(Number(id));

  useEffect(() => {
    if (!show) navigate(OTHER_INCOME);
  }, [show, navigate]);

  const initialValues: OtherIncomeAddPayload = {
    season: detail?.season || '',
    date: detail?.date || '',
    customer_id: detail?.customer_id || 0,
    income_item: detail?.income_item || '',
    payment_method: detail?.payment_method || '',
    amount: Number(detail?.amount) || 0,
    description: detail?.description || '',
    other_income_category_id: detail?.category_id || undefined,
  };

  const fields: FieldDefinition[] = [
    { name: 'season', label: 'Sezon', type: 'text', required: true },
    { name: 'date', label: 'Tarih', type: 'date', required: true },
    { name: 'customer_id', label: 'Müşteri', type: 'number', required: true },
    { name: 'income_item', label: 'Gelir Kalemi', type: 'text', required: true },
    { name: 'payment_method', label: 'Ödeme Yöntemi', type: 'text', required: true },
    { name: 'amount', label: 'Tutar', type: 'currency', required: true },
    { name: 'description', label: 'Açıklama', type: 'text' },
    { name: 'other_income_category_id', label: 'Gelir Kategorisi', type: 'number' },
  ];

  const handleSubmit = async (
    values: OtherIncomeAddPayload,
    { setSubmitting }: FormikHelpers<OtherIncomeAddPayload>
  ) => {
    if (isEditMode && id) {
      await update({ id: Number(id), payload: values });
    } else {
      await addNew(values);
    }
    setSubmitting(false);
    onRefresh();
    onClose();
    navigate(OTHER_INCOME);
  };

  return (
    <ReusableModalForm
      show={show}
      onClose={() => {
        onClose();
        navigate(OTHER_INCOME);
      }}
      initialValues={initialValues}
      title={isEditMode ? 'Farklı Gelir Düzenle' : 'Farklı Gelir Ekle'}
      confirmButtonLabel={isEditMode ? 'Güncelle' : 'Kaydet'}
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
}

// ---------------------------------------------
// Payment Modal Component
// ---------------------------------------------

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit?: (values: OtherIncomePaymentValues) => void;
}

interface OtherIncomePaymentValues {
  season_id: number | null;
  date: string;
  income_item: string;
  amount: string;
  payment_method_id: number | null;
  description?: string;
}

export function OtherIncomePaymentModal({
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

