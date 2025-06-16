import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import { Button } from 'react-bootstrap';
import Pageheader from '../../page-header/pageheader';

import { useAppointmentList } from '../../../hooks/appointment/useList';
import { useQuestionDelete } from '../../../hooks/questions/useDelete';

import { data } from '../../../../types/appoipments/list';

import { useAppointmentDelete } from '../../../hooks/appointment/deleteAppointment';
import appoipmentButtonHover from '../../../../assets/images/media/appoipment-buton-hover.svg'
import appoipmentButton from '../../../../assets/images/media/appoipment-buton.svg'



export default function QuestionLabeling() {
  const searchParams = new URLSearchParams(location.search);
  const studentIdFromUrl = searchParams.get("student_id");
  const navigate = useNavigate();


  const { removeAppointment } = useAppointmentDelete();



  useQuestionDelete();

  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);



  const {
    appointmentData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: _updatePage,
    setPageSize: _updateTablePageSize
  } = useAppointmentList({ enabled: true, page, pageSize, student_id: studentIdFromUrl ? Number(studentIdFromUrl) : undefined });
  // Filtre seçeneklerini oluşturma


  const columns: ColumnDefinition<data>[] = useMemo(
    () => [
      {
        key: 'season_id',
        label: 'Sezon',
        render: (row) => (row.season ? (row.season as any).name : row.season_id ?? '-')
      },
      {
        key: 'branches',
        label: 'Şube',
        render: (row) => row.branche?.name ?? '-'
      },
      {
        key: 'appointment_type',
        label: 'Görüşme Türü',
        render: (row) => {
          if (row.type_id === 1) return 'Yüzyüze';
          if (row.type_id === 2) return 'Uzaktan';
          return '-';
        }
      },
      {
        key: 'meeting_note',
        label: 'Görüşme Notu',
        render: (row) => row.meeting_note ?? '-'
      },
      {
        key: 'created_by',
        label: 'Kayıt Eden',
        render: (row) => (row.created_by ? String(row.created_by) : '-')
      },
      {
        key: 'meeting_by',
        label: 'Görüşme Yetkilisi',
        render: (row) => (row.meeting_by ? String(row.meeting_by) : '-')
      },
      {
        key: 'actions',
        label: 'İşlemler',
        render: (row, _openDeleteModal) => (
          <>
            <Button
              variant="info-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => navigate(`/appointmentscrud/${row.id}`)}
            >
              <i className="ti ti-pencil"></i>
            </Button>{' '}
            <Button
              variant=""
              size="sm"
              onClick={() =>
                navigate(`/studentmeetings?student_id=${row.student_id}`)
              }
            >
              <img
                src={appoipmentButton}
                alt="Seç"
                style={{ width: '28px', height: '28px', margin: '-10px' }}
                onMouseEnter={(e) => (e.currentTarget.src = appoipmentButtonHover)}
                onMouseLeave={(e) => (e.currentTarget.src = appoipmentButton)}
              />
            </Button>
          </>
        )
      }
    ],
    [navigate]
  );


  return (
    <div className="px-4">
      <Pageheader title="Ön Kayıt" currentpage="Öğrenci Randevuları" />
      <ReusableTable<data>
        columns={columns}
        data={appointmentData as data[]}
        loading={loading}
        showModal={false}
        showExportButtons={true}
        tableMode="single"
        error={error}
        onAdd={() => navigate(`/appointmentscrud/${studentIdFromUrl}`, { state: { detay: "add" } })}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="question_labeling"
        deleteMessage={(row) =>
          `${row.meeting_date ?? ''} tarihli randevuyu silmek istediğinize emin misiniz?`}
        deleteCancelButtonLabel="Vazgeç"
        deleteConfirmButtonLabel="Sil"
        onDeleteRow={(row) => {

          if (row.id !== undefined) {
            removeAppointment(row.id);
          }

        }}
      />
    </div>
  );
}
