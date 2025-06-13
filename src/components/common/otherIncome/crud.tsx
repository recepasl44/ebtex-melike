import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';
import { useOtherIncomeAdd } from '../../hooks/otherIncome/useOtherIncomeAdd';
import { useOtherIncomeUpdate } from '../../hooks/otherIncome/useOtherIncomeUpdate';
import { useOtherIncomeShow } from '../../hooks/otherIncome/useOtherIncomeShow';
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
    { name: 'season', label: 'Season', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'customer_id', label: 'Customer', type: 'number', required: true },
    { name: 'income_item', label: 'Item', type: 'text', required: true },
    { name: 'payment_method', label: 'Method', type: 'text', required: true },
    { name: 'amount', label: 'Amount', type: 'currency', required: true },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'other_income_category_id', label: 'Category', type: 'number' },
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
