import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import { Button } from 'react-bootstrap';
import Pageheader from '../../../page-header/pageheader';

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
  } = useAppointmentList({enabled: true, page, pageSize, student_id: studentIdFromUrl ? Number(studentIdFromUrl) : undefined });
  // Filtre seçeneklerini oluşturma
  

  const columns: ColumnDefinition<data>[] = useMemo(() => [
    {
      key: 'season',
      label: 'Sezon',
      render: (row) => (row.season as { name: string } | undefined)?.name ?? '-'
    },
    {
      key: 'branches',
      label: 'Şube',
      render: (row) => row.branche?.name ?? ''
    },
    {
      key: 'appointment_type',
      label: 'Görüşme Türü',
      render: (row) => {
        if (row.type_id === 1) return 'Yüzyüze'
        if (row.type_id === 2) return 'Uzaktan'
        return '-'
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
      render: (row) => (row.created_by ?? '-') as any
    },
    {
      key: 'meeting_by',
      label: 'Görüşme Yetkilisi',
      render: (row) => row.meeting_by ?? '-'
    },


    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <>


                          <Button
                            variant="info-light"
                            size="sm"
                            className="btn-icon rounded-pill"
                            onClick={() => navigate(`/appointmentscrud/${row.id}`)}
                          >
                            <i className="ti ti-pencil"></i>
                          </Button>
              
                          <Button
                            variant=""
                            size="sm"
                            onClick={() => navigate(`/studentmeetings?student_id=/${row.id}`)}
                          >
                            <img
                              src={appoipmentButton}
                              alt="Seç"
                              style={{
                                width: "28px",
                                height: "28px",
                                margin: "-10px",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.src = appoipmentButtonHover)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.src = appoipmentButton)
                              }
                            />
                          </Button>

        </>
      ),
    },
  ], [navigate]);


  return (
    <div className="px-4">
      <Pageheader
        title="Ön Kayıt"
        subtitle="Öğrenci Randevuları"
        currentpage="Öğrenci Randevuları"
        activepage="Öğrenci Randevuları"
      />
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
        onDeleteRow={(row) => {
          if (row.id !== undefined) {
            removeAppointment(row.id);
          }
        }}
        deleteMessage={(row) =>
          `${row.meeting_date || ''} tarihli randevuyu silmek istediğinizden emin misiniz?`
        }
        cancelButtonText="Vazgeç"
        confirmButtonText="Sil"
      />
    </div>
  );
}
