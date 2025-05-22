

import { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

interface Row {
    id: number;
    date_txt: string;
    time_txt: string;
    lesson_name: string;
    status_txt: string;
    manager_txt: string;
}


interface Props {
    show: boolean;
    attendanceId: number;
    onClose: () => void;
}

const StudyCountDetailModal: React.FC<Props> = ({ show, attendanceId, onClose }) => {

    const {
        attendance: detail,
        status,
        error,
        getAttendance,
    } = useAttendanceDetail({ attendanceId, enabled: show });

    useEffect(() => { if (show && attendanceId) getAttendance(attendanceId); },
        [show, attendanceId]);

    const rows: Row[] = useMemo(() => {
        if (!detail?.lessons?.length) return [];

        return detail.lessons.map((l: any, i: number) => ({
            id: i,
            date_txt: l.date ? l.date : '-',
            time_txt: l.hour ? `${l.start_hour} - ${l.end_hour}` : '-',
            lesson_name: l.name || l.group_name || '-',
            status_txt: l.status ? (l.status === 1 ? 'Geldi' : 'Gelmedi') : '-',
            manager_txt: l.manager_status
                ? (l.manager_status === 1 ? 'Geldi' : 'Gelmedi')
                : '-',
        }));
    }, [detail]);

    /* kolon tanımları ---------------------------------------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date_txt', label: 'Tarih', render: r => r.date_txt },
        { key: 'time_txt', label: 'Saat Aralığı', render: r => r.time_txt },
        { key: 'lesson_name', label: 'Ders / Grup Adı', render: r => r.lesson_name },
        {
            key: 'status_txt', label: 'Durum',
            render: r => (
                <span style={{ color: r.status_txt === 'Geldi' ? '#18c96e' : '#ff4d4f' }}>
                    {r.status_txt}
                </span>
            )
        },
        {
            key: 'manager_txt', label: 'Yönetici Durumu',
            render: r => (
                <span style={{ color: r.manager_txt === 'Geldi' ? '#18c96e' : '#ff4d4f' }}>
                    {r.manager_txt}
                </span>
            )
        },
    ], []);


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

            <Modal.Body>
                <ReusableTable<Row>
                    tableMode="single"
                    columns={columns}
                    data={rows}
                    loading={status === 'LOADING'}
                    error={error}
                    showExportButtons={false}
                    showModal
                />
            </Modal.Body>
        </Modal>
    );
};

export default StudyCountDetailModal;
