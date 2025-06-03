

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Modal, Button } from 'react-bootstrap';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { AttendanceData } from '../../../../../../types/attendance/list';

interface Row {
    id: number;
    hour_range: string;
    program_name: string;
    status: 0 | 1 | 2;          // 0 = Geldi • 1 = Geç Geldi • 2 = Gelmedi
    executive_status: string;   // izinli | raporlu | görevli | …
}


const getProgramName = (item: any): string =>
    (item?.name as string | undefined) ?? '-';

export default function PollingListDetailTable() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();


    const {
        attendance,
        status: detailStatus,
        error,
    } = useAttendanceDetail({
        attendanceId: Number(id),
        enabled: Boolean(id),
    });


    const { attendancesData: programsData, loading: listLoading } =
        useAttendancesTable({
            enabled: Boolean(attendance),
            page: 1,
            pageSize: 999,
        });

    const loading = detailStatus === 'LOADING' || listLoading;


    const rows: Row[] = useMemo(() => {
        if (!attendance) return [];


        if (Array.isArray(attendance.lessons) && attendance.lessons.length) {
            return attendance.lessons.map((l: any) => ({
                id: l.id,
                hour_range: `${dayjs(l.start_time).format('HH:mm')} – ${dayjs(
                    l.end_time,
                ).format('HH:mm')}`,
                program_name:
                    getProgramName(programsData?.find(p => p.id === l.program_id)) ||
                    getProgramName(l.program) ||
                    '-',
                status: (l.status ?? 0) as 0 | 1 | 2,
                executive_status: l.executive_status ?? '-',
            }));
        }


        const a = attendance as AttendanceData & { executive_status?: string };

        return [
            {
                id: a.id,
                hour_range: a.start_time
                    ? dayjs(a.start_time, 'HH:mm:ss').format('HH:mm')
                    : '—',
                program_name:
                    getProgramName(programsData?.find(p => p.id === a.program_id)) ||
                    getProgramName(a.program) ||
                    a.name,
                status: 0,
                executive_status: a.executive_status ?? '-',
            },
        ];
    }, [attendance, programsData]);


    const columns: ColumnDefinition<Row>[] = useMemo(
        () => [
            { key: 'hour_range', label: 'Saat', render: r => r.hour_range },
            { key: 'program_name', label: 'Program Adı', render: r => r.program_name },
            {
                key: 'status',
                label: 'Durum',
                render: ({ status }) =>
                    status === 0 ? 'Geldi' : status === 1 ? 'Geç Geldi' : 'Gelmedi',
            },
            {
                key: 'executive_status',
                label: 'Yönetici Durumu',
                render: r => r.executive_status,
            },
        ],
        [],
    );


    function handleSave() {
        // TODO: save changes if needed
        navigate(-1);
    }

    return (
        <Modal show onHide={() => navigate(-1)} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Yoklama Listesi Detay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReusableTable<Row>
                    tableMode="single"
                    columns={columns}
                    data={rows}
                    showExportButtons={false}
                    exportFileName="Yoklama Listesi Detay Sayfası"
                    loading={loading}
                    error={error}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    Vazgeç
                </Button>
                <Button variant="outline-secondary" onClick={handleSave}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
