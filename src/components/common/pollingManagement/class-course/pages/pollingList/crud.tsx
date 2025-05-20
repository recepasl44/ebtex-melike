/* src/components/common/pollingManagement/class-course/pages/pollingList/crud.tsx */
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';

/* ----- satır tipi ---------------------------------------------------- */
interface Row {
    id: number;
    hour_range: string;
    program_name: string;     // attendances->name
    status: 0 | 1 | 2;        // 0 = Geldi • 1 = Geç Geldi • 2 = Gelmedi
    executive_status: string; // raporlu | görevli | izinli | …
}

export default function PollingListDetailTable() {
    const { id } = useParams<{ id?: string }>();

    /* tekil yoklama detayı */
    const { attendance, status, error } = useAttendanceDetail({
        attendanceId: Number(id),
        enabled: !!id,
    });

    /* program listesi (attendance.name alanını içerir) */
    const { attendancesData: programsData } = useAttendancesTable({
        enabled: !!attendance,      // yalnızca detail geldiyse çek
        page: 1,
        pageSize: 999,               // hepsini getir – filtreleme backend’de yoksa
    });

    /* detail → Row[] ----------------------------------------------------- */
    const rows: Row[] = useMemo(() => {
        if (!attendance?.lessons?.length) return [];

        return attendance.lessons.map((l: any) => ({
            id: l.id,
            hour_range: `${dayjs(l.start_time).format('HH:mm')} – ${dayjs(l.end_time).format('HH:mm')}`,
            program_name:
                programsData?.find(p => p.id === l.program_id)?.name
                ?? l.program_name
                ?? '-',
            status: (l.status ?? 0) as 0 | 1 | 2,
            executive_status: l.executive_status ?? '-',
        }));
    }, [attendance, programsData]);

    /* kolonlar ----------------------------------------------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(
        () => [
            { key: 'hour_range', label: 'Saat', render: r => r.hour_range },
            { key: 'program_name', label: 'Program Adı', render: r => r.program_name },
            {
                key: 'status',
                label: 'Durum',
                render: ({ status }) =>
                    status === 0 ? 'Geldi'
                        : status === 1 ? 'Geç Geldi'
                            : 'Gelmedi',
            },
            { key: 'executive_status', label: 'Yönetici Durumu', render: r => r.executive_status },
        ],
        [],
    );

    /* render ------------------------------------------------------------- */
    return (
        <ReusableTable<Row>
            columns={columns}
            data={rows}
            tableMode="single"
            showModal
            showExportButtons={false}
            exportFileName="polling_list_detail"
            loading={status === 'LOADING'}
            error={error}
        />
    );
}
