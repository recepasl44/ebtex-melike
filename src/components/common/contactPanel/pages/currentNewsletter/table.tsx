import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, { ColumnDefinition } from '../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { FormikValues } from 'formik';
import { useBulletinsList } from '../../../hooks/bulletin/useBulletinsList';
import { useGroupsTable } from '../../../hooks/group/useList';
import { useBulletinDelete } from '../../../hooks/bulletin/useDelete';
import { useBulletinAdd } from '../../../hooks/bulletin/useAdd';
import { useBulletinUpdate } from '../../../hooks/bulletin/useUpdate';
import type { data as Bulletin } from '../../../../types/bulletins/list';

const ROOT = `${import.meta.env.BASE_URL}contact-panel/current-newsletter`;

export default function CurrentNewsletterTable() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const [groupId, setGroupId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(10);
  const [enabled, setEnabled] = useState({ groups: false });
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Bulletin | null>(null);

  const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
  const { deleteExistingBulletin } = useBulletinDelete();

  const { bulletinsData = [], loading, error, totalPages, totalItems } = useBulletinsList({
    page,
    pageSize: paginate,
    start_date: dateRange.startDate || undefined,
    end_date: dateRange.endDate || undefined,
    group_id: +groupId || undefined,
    category_id: +categoryId || undefined,
    status: status || undefined,
    enabled: true,
  });

  const categoryOptions = [
    { value: '1', label: 'Genel' },
    { value: '2', label: 'Duyuru' },
  ];

  const columns: ColumnDefinition<Bulletin>[] = useMemo(
    () => [
      { key: 'title', label: 'Başlık', render: (b) => b.title },
      {
        key: 'dateRange',
        label: 'Yayın Tarihleri',
        render: (b) => `${b.start_date} - ${b.end_date}`,
      },
      {
        key: 'category',
        label: 'Kategori',
        render: (b) =>
          categoryOptions.find((c) => c.value === String(b.category_id))?.label ||
          String(b.category_id),
      },
      {
        key: 'sender',
        label: 'Gönderen',
        render: (b) => (b as any).createdby?.name_surname || '-',
      },
      {
        key: 'target',
        label: 'Hedef Kitle',
        render: (b) => (b as any).group?.name || '-',
      },
      {
        key: 'status',
        label: 'Durum',
        render: (b) => (b.status === 1 ? 'Yayında' : 'Taslak'),
      },
      {
        key: 'actions',
        label: 'İşlemler',
        render: (row) => (
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                setSelected(row);
                setShowForm(true);
              }}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              onClick={() => deleteExistingBulletin(row.id)}
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
            >
              <i className="ti ti-trash" />
            </button>
          </div>
        ),
      },
    ],
    [navigate, deleteExistingBulletin]
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'dateRange',
        label: 'Tarih Aralığı',
        type: 'doubledate',
        value: dateRange,
        onChange: (v) => setDateRange(v ?? { startDate: '', endDate: '' }),
      },
      {
        key: 'group_id',
        label: 'Hedef Kitle',
        type: 'select',
        value: groupId,
        onClick: () => setEnabled((e) => ({ ...e, groups: true })),
        onChange: setGroupId,
        options: groupsData.map((g) => ({ value: String(g.id), label: g.name })),
      },
      {
        key: 'category_id',
        label: 'Kategori',
        type: 'select',
        value: categoryId,
        onChange: setCategoryId,
        options: categoryOptions,
      },
      {
        key: 'status',
        label: 'Yayın Durumu',
        type: 'select',
        value: status,
        onChange: setStatus,
        options: [
          { value: '1', label: 'Yayında' },
          { value: '0', label: 'Taslak' },
        ],
      },
    ],
    [dateRange, groupId, categoryId, status, groupsData]
  );

  return (
    <>
      <FilterGroup filters={filters} columnsPerRow={4} navigate={navigate} />
      <ReusableTable<Bulletin>
        tableMode="single"
        columns={columns}
        data={bulletinsData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPaginate(s);
          setPage(1);
        }}
        exportFileName="current_newsletter"
        showExportButtons
        onAdd={() => {
          setSelected(null);
          setShowForm(true);
        }}
      />
      {showForm && (
        <BulletinFormModal
          show={showForm}
          onClose={() => setShowForm(false)}
          initialValues={selected || undefined}
        />
      )}
    </>
  );
}

interface FormData extends FormikValues {
  title: string;
  content: string;
  category_id: string;
  start_date: string;
  end_date: string;
  group_id: string;
  status: string;
}

function BulletinFormModal({
  show,
  onClose,
  initialValues,
}: {
  show: boolean;
  onClose: () => void;
  initialValues?: Bulletin;
}) {
  const mode = initialValues ? 'update' : 'add';
  const { addNewBulletin, status: addStatus, error: addError } = useBulletinAdd();
  const { updateExistingBulletin, status: updStatus, error: updError } =
    useBulletinUpdate();

  const defaults: FormData = {
    title: '',
    content: '',
    category_id: '',
    start_date: '',
    end_date: '',
    group_id: '',
    status: '1',
    ...(initialValues && {
      title: initialValues.title,
      content: initialValues.content,
      category_id: String(initialValues.category_id),
      start_date: initialValues.start_date,
      end_date: initialValues.end_date,
      group_id: String(initialValues.group_id),
      status: String(initialValues.status),
    }),
  };

  const fields: FieldDefinition[] = [
    { name: 'title', label: 'Başlık', type: 'text', required: true },
    { name: 'content', label: 'İçerik', type: 'textarea', required: true },
    {
      name: 'category_id',
      label: 'Kategori',
      type: 'select',
      options: [
        { value: '1', label: 'Genel' },
        { value: '2', label: 'Duyuru' },
      ],
    },
    { name: 'start_date', label: 'Başlangıç Tarihi', type: 'date', required: true },
    { name: 'end_date', label: 'Bitiş Tarihi', type: 'date', required: true },
    { name: 'group_id', label: 'Hedef Kitle', type: 'text' },
    {
      name: 'status',
      label: 'Yayın Durumu',
      type: 'select',
      options: [
        { value: '1', label: 'Yayında' },
        { value: '0', label: 'Taslak' },
      ],
    },
  ];

  const loading =
    (mode === 'add' && addStatus === 'LOADING') ||
    (mode === 'update' && updStatus === 'LOADING');
  const error = mode === 'add' ? addError : updError;

  const handleSubmit = async (values: FormData) => {
    if (mode === 'add') {
      await addNewBulletin({ ...(values as any) });
    } else if (initialValues) {
      await updateExistingBulletin({
        bulletinId: initialValues.id,
        payload: { ...(values as any) },
      });
    }
    onClose();
  };

  return (
    <ReusableModalForm<FormData>
      show={show}
      title={mode === 'add' ? 'Bülten Ekle' : 'Bülten Güncelle'}
      fields={fields}
      initialValues={defaults}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || undefined}
      onClose={onClose}
    />
  );
}
