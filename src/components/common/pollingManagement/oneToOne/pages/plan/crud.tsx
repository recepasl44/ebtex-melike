/* -------------------------------------------------------------------------- */
/* matchCrud.tsx – Birebir Yoklama › Öğretmen Eşleştir (Detay / CRUD)         */
/* -------------------------------------------------------------------------- */

import { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

/* API – talep detayı + yardımcı listeler */
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

/* ----------------------------------------------------------------------- */
interface SlotRow {
    id: number;
    day_name: string;   // Pazartesi …
    lesson_name: string;
    teacher_name: string;
    time_range: string;   // 10:00 - 10:30
    area_name: string;   // Çalışma Salonu
}

/* Modal props */
interface Props {
    show: boolean;
    onClose: () => void;
}

const TeacherMatchCrudModal: React.FC<Props> = ({ show, onClose }) => {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    /* --------- yardımcı listeler (öğretmen, ders, alan) ----------------- */
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: show });

    const { lessonsData = [] } = useLessonList({ enabled: show });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: show });

    /* --------- talep (attendance) detayı -------------------------------- */
    const {
        attendance: detail,
        status,
        error,
        getAttendance,
    } = useAttendanceDetail({ attendanceId: Number(id), enabled: !!id });

    useEffect(() => { if (show && id) getAttendance(Number(id)); }, [show, id]);

    /* --------- detail.sessions → tablo satırı --------------------------- */
    const rows: SlotRow[] = useMemo(() => {
        if (!detail?.sessions?.length) return [];

        return detail.sessions.map((s: any, idx: number) => ({
            id: idx,
            day_name: s.day_name || '-',
            lesson_name: lessonsData.find(l => l.id === s.lesson_id)?.name || detail.lesson?.name || '-',
            teacher_name: teachersData.find(t => t.teacher_id === s.teacher_id)
                ?.teacher?.name_surname || '-',
            time_range: `${s.start_hour} - ${s.end_hour}`,
            area_name: usedAreasData.find(a => a.id === s.used_area_id)?.name || '-',
        }));
    }, [detail, lessonsData, teachersData, usedAreasData]);

    /* --------- kolon tanımları ----------------------------------------- */
    const columns: ColumnDefinition<SlotRow>[] = [
        { key: 'day_name', label: 'Gün', render: r => r.day_name },
        { key: 'lesson_name', label: 'Ders', render: r => r.lesson_name },
        { key: 'teacher_name', label: 'Öğretmen', render: r => r.teacher_name },
        { key: 'time_range', label: 'Saat Aralıkları', render: r => r.time_range },
        { key: 'area_name', label: 'Çalışma Alanı', render: r => r.area_name },
        {
            key: 'actions',
            label: 'İşlemler',
            style: { width: 80, textAlign: 'center' },
            render: slot => (
                <button
                    type="button"
                    className="btn btn-link p-0"
                    /* ileri bir eşleştirme sayfasına gidecekse: */
                    onClick={() => nav(`${window.location.pathname}/match/${slot.id}`)}
                >
                    Eşleştir
                </button>
            ),
        },
    ];

    /* --------- öğretmen / ders üst bilgisi ------------------------------ */
    const studentName =
        detail?.student?.name_surname ||
        `${detail?.student?.first_name ?? ''} ${detail?.student?.last_name ?? ''}`.trim() || '-';

    const lessonName =
        lessonsData.find(l => l.id === detail?.lesson_id)?.name || detail?.lesson?.name || '-';

    /* --------- render --------------------------------------------------- */
    if (!show) return null;

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Öğretmen Eşleştir</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Üst bilgi ---------------------------------------------------- */}
                <table className="table table-bordered mb-3">
                    <tbody>
                        <tr>
                            <th style={{ width: 160 }}>Adı Soyadı</th>
                            <td>{studentName}</td>
                        </tr>
                        <tr>
                            <th>Ders Adı</th>
                            <td>{lessonName}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Slot listesi -------------------------------------------------- */}
                <ReusableTable<SlotRow>
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

export default TeacherMatchCrudModal;
