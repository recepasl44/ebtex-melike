/* TeacherMatchModal.tsx – yalnızca ReusableTable içeren temiz sürüm */

import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { Button } from 'react-bootstrap';

import eslestirHover from '../../../../../../assets/images/media/eşleştir-hover.svg';
import eslestir from '../../../../../../assets/images/media/eşleştir.svg';

/* --- tipler --------------------------------------------------------- */
interface Row {
    id: number;
    teacher_name: string;
    branch: string;
    lesson_count: number;
}

interface Props {
    demandId: number;
    show: boolean;
    onClose: () => void;
}

/* -------------------------------------------------------------------- */
export default function TeacherMatchModal({ demandId, show, onClose }: Props) {
    /* Talebe uygun öğretmenler */
    const { attendanceTeachersData = [], loading, error } =
        useAttendanceTeachersTable({ enabled: show, demand_id: demandId });

    /* Satırlar */
    const rows: Row[] = useMemo(
        () =>
            attendanceTeachersData.map((t: any) => ({
                id: t.teacher_id,
                teacher_name: t.teacher?.name_surname || '-',
                branch: t.teacher?.branch || '-',
                lesson_count: t.match_hour ?? 0,
            })),
        [attendanceTeachersData],
    );

    /* Kolonlar */
    const columns: ColumnDefinition<Row>[] = useMemo(
        () => [
            { key: 'teacher_name', label: 'Adı Soyadı', render: r => r.teacher_name },
            { key: 'branch', label: 'Branş', render: r => r.branch },
            {
                key: 'lesson_count',
                label: 'Ders Saati',
                style: { width: 110, textAlign: 'center' },
                render: r => `${r.lesson_count} D.`,
            },
            {
                key: 'actions',
                label: 'İşlemler',
                style: { width: 90, textAlign: 'center' },
                /* Şimdilik yalnızca ikon gösteriyoruz */
                render: () => (
                    <Button variant="">
                        <img
                            src={eslestir}
                            alt="Eşleştir"
                            width={28}
                            height={28}
                            onMouseEnter={e => (e.currentTarget.src = eslestirHover)}
                            onMouseLeave={e => (e.currentTarget.src = eslestir)}
                        />
                    </Button>
                ),
            },
        ],
        [],
    );


    return (
        <ReusableTable<Row>
            pageTitle="Öğretmen Eşleştir"
            showModal={show}
            onCloseModal={onClose}
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            showExportButtons={false}
        />
    );
}
