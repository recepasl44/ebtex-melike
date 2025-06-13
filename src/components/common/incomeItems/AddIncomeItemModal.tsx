import { FormikHelpers } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../ReusableModalForm';

interface IncomeItemFormValues {
  name: string;
}

interface AddIncomeItemModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (item: { id: number; name: string }) => void;
}

export default function AddIncomeItemModal({ show, onClose, onAdd }: AddIncomeItemModalProps) {
  const initialValues: IncomeItemFormValues = { name: '' };

  const fields: FieldDefinition[] = [
    { name: 'name', label: 'Gelir Kalemi Adı', type: 'text', required: true },
  ];

  const handleSubmit = (
    values: IncomeItemFormValues,
    helpers: FormikHelpers<IncomeItemFormValues>,
  ) => {
    onAdd({ id: Date.now(), name: values.name });
    helpers.setSubmitting(false);
    onClose();
  };

  return (
    <ReusableModalForm<IncomeItemFormValues>
      show={show}
      title="Gelir Kalemi Ekle"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onClose={onClose}
      confirmButtonLabel="Kaydet"
    />
  );
}
