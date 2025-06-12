import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import { Button } from 'react-bootstrap';

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
      key: 'branches',
      label: 'Şube',
      render: (row) => row.branche?.name ?? ''
    },
    {
      key: 'appointment_time',
      label: 'Randevu Zamanı',
      render: (row) => row.meeting_date ?? ''
    },
   
   

    {
      key: 'appointment_type',
      label: 'Tür',
      render: (row) => {
        if (row.type_id === 1) return 'Yüzyüze'
        if (row.type_id === 2) return 'Uzaktan'
        return '-'
      }
    },

    {
      key: 'identification_no',
      label: 'TC Kimlik No',

      render: (row) => row.student?.identification_no ?? ''
    },

    {
      key: 'first_name',
      label: 'Adı Soyadı',

      render: (row) => (row.student?.first_name ?? '-') + ' ' + (row.student?.last_name ?? '')
    },
   
    {
      key: 'level',
      label: 'Sınıf Seviyesi',
      render: (row) => (row.student?.level as { name: string } | undefined)?.name ?? '-'
    },
    {
      key: 'parent_id',
      label: 'Veli Adı',
      render: (row) => row.student?.parent?.full_name ?? '-'
    },
    {
      key: 'meeting_note',
      label: 'Görüşme Durumu',
      render: (row: data) => row.meeting_by ?? '-'
    },


    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <>


<Button
                            variant="warning-light"
                            size="sm"
                            className="btn-icon rounded-pill"
                            onClick={() => navigate(`/appointmentscrud/${row.id}`)}
                          >
                            <i className="ti ti-message"></i>
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
    <div>
        
      <h4>Görüşme Listesi</h4>
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
      />
    </div>
  );
}
