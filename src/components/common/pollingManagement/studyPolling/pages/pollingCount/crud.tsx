
import { useEffect, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReusableTable, {
    ColumnDefinition,

} from '../../../../ReusableTable';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

interface Row {
    id: number;
    date_txt: string;
    time_txt: string;
    lesson_name: string;
    status_txt: string;      // Geldi / Geç Geldi / Gelmedi
    manager_txt: string;     // Geldi / İzinli / Raporlu / -
}

const STATUS_COLORS: Record<string, string> = {
    'Geldi': '#18c96e',
    'Geç Geldi': '#d49b0b',
    'Gelmedi': '#ff4d4f',
};

interface Props {
    show: boolean;
    attendanceId: number;
    onClose: () => void;
}

const StudyCountDetailModal: React.FC<Props> = ({
    show,
    attendanceId,
    onClose,
}) => {

    const {
        attendance: detail,
        status,
        error,
        getAttendance,
    } = useAttendanceDetail({ attendanceId, enabled: show });

    useEffect(() => {
        if (show && attendanceId) getAttendance(attendanceId);
    }, [show, attendanceId]);

    /* — API → satır dizisi — */
    const rows: Row[] = useMemo(() => {
        if (!detail?.lessons?.length) return [];

        return detail.lessons.map((l: any, i: number) => {
            /* ----- Durum mapping ----- */
            let statusTxt = '-';
            switch (l.status) {
                case 0: statusTxt = 'Geç Geldi'; break;
                case 1: statusTxt = 'Gelmedi'; break;
                case 2: statusTxt = 'Geldi'; break;
                default: statusTxt = '-';
            }

            /* ----- Yönetici durumu mapping ----- */
            let mgrTxt = '-';
            switch (l.manager_status) {
                case 1: mgrTxt = 'Geldi'; break;
                case 2: mgrTxt = 'İzinli'; break;
                case 3: mgrTxt = 'Raporlu'; break;
                default: mgrTxt = '-';
            }

            return {
                id: i,
                date_txt: l.date ?? '-',
                time_txt: l.start_hour && l.end_hour
                    ? `${l.start_hour} - ${l.end_hour}`
                    : '-',
                lesson_name: l.name || l.group_name || '-',
                status_txt: statusTxt,
                manager_txt: mgrTxt,
            };
        });
    }, [detail]);

    /* — Kolon tanımları — */
    const columns: ColumnDefinition<Row>[] = useMemo(() => ([
        { key: 'date_txt', label: 'Tarih', render: r => r.date_txt },
        { key: 'time_txt', label: 'Saat Aralığı', render: r => r.time_txt },
        { key: 'lesson_name', label: 'Ders / Grup Adı', render: r => r.lesson_name },
        {
            key: 'status_txt',
            label: 'Durum',
            render: r => (
                <span style={{ color: STATUS_COLORS[r.status_txt] || undefined }}>
                    {r.status_txt}
                </span>
            ),
        },
        {
            key: 'manager_txt',
            label: 'Yönetici Durumu',
            render: r => (
                <span style={{ color: STATUS_COLORS[r.manager_txt] || undefined }}>
                    {r.manager_txt}
                </span>
            ),
        },
    ]), []);

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            centered
            dialogClassName="modal-90w"
        >
        <Modal.Header closeButton>
            <Modal.Title>Yoklama Sayıları Detay</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
            <ReusableTable<Row>
                    tableMode="single"
                    columns={columns}
                    data={rows}
                    loading={status === 'LOADING'}
                    error={error}
                    showExportButtons={false}


                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Vazgeç
                </Button>
                <Button variant="outline-secondary" onClick={onClose}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudyCountDetailModal;
