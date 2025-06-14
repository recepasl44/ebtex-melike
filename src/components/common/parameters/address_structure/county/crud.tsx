import { FormikHelpers, FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDiscrictAdd } from '../../../../hooks/districts/useAdd';
import { useDiscrictUpdate } from '../../../../hooks/districts/useUpdate';
import { useDiscrictDetail } from '../../../../hooks/districts/useDetail';

/* ---------- Form Modeli ---------- */
interface CountyFormData extends FormikValues {
  name: string;
}

/* ---------- Opsiyonel Modal Props ---------- */
interface CountyModalProps {
  show?: boolean;
  onClose?: () => void;
}

const CountyModal: React.FC<CountyModalProps> = ({
  show = true,
  onClose,
}) => {
  /* Router */
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? 'update' : 'add';

  /* Form başlangıç değerleri */
  const [initialValues, setInitialValues] = useState<CountyFormData>({ name: '' });

  /* Alan tanımları */
  const fields: FieldDefinition[] = [
    { name: 'name', label: 'İlçe Adı', type: 'text', required: true },
  ];

  /* API – ADD */
  const { addNewDistrict, status: addStatus, error: addError } = useDiscrictAdd();

  /* API – UPDATE */
  const {
    updateDiscrictDetails: updateDistrict,
    status: updateStatus,
    error: updateError,
  } = useDiscrictUpdate();

  /* API – DETAIL */
  const {
    district,
    status: showStatus,
    error: showError,
    getDistrict,
  } = useDiscrictDetail();

  /* İlçeyi getir */
  useEffect(() => {
    if (mode === 'update' && id) getDistrict(Number(id));
  }, [mode, id, getDistrict]);

  /* İlçe geldiğinde formu doldur */
  useEffect(() => {
    if (mode === 'update' && district) {
      setInitialValues({ name: district.name });
    }
  }, [mode, district]);

  /* Yüklenme & Hata bilgisi */
  const isLoading =
    (mode === 'add' && addStatus === 'LOADING') ||
    (mode === 'update' && (updateStatus === 'LOADING' || showStatus === 'LOADING'));

  const combinedError =
    mode === 'add'
      ? addError
      : mode === 'update'
        ? updateError || showError
        : null;

  /* Kaydet */
  async function handleSubmit(
    values: CountyFormData,
    _helpers: FormikHelpers<CountyFormData>,
  ) {
    try {
      if (mode === 'add') {
        await addNewDistrict({ name: values.name, county_id: 0 }); // county_id zorunluysa ayarlayın
      } else if (mode === 'update' && id) {
        await updateDistrict(
          Number(id),
          {
            name: values.name,
            county_id: district?.county_id ?? 0, // gerekli olduğu için eklendi
          }
        );
      }
      navigate(`${import.meta.env.BASE_URL}parameters/county`);
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error('İlçe kaydedilirken hata:', err);
    }
  }

  /* Render */
  return (
    <ReusableModalForm<CountyFormData>
      show={show}
      title={mode === 'add' ? 'İlçe Ekle' : 'İlçe Güncelle'}
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError}
      onClose={
        onClose
          ? onClose
          : () => navigate(`${import.meta.env.BASE_URL}parameters/county`)
      }
      autoGoBackOnModalClose
    />
  );
};

export default CountyModal;
