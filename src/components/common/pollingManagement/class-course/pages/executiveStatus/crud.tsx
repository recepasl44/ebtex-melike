
import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useNavigate } from 'react-router-dom';

interface Row {
    id: number;
    student_no: string;
    student_name: string;
    status: number;          // 0 Geldi • 1 Geç Geldi • 2 Gelmedi
    executive_status: string; // raporlu | görevli | izinli | …
}

export default function ExecutiveStatusCrud() {
    const navigate = useNavigate();

    const { attendancesData, loading, error } =
        useAttendancesTable({ page: 1, pageSize: 10, enabled: true });


    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            student_no:
                a.students?.[0]?.student_no ??
                a.students?.[0]?.register_no ??
                '-',
            student_name:
                a.students?.[0]
                    ? `${a.students[0].first_name} ${a.students[0].last_name}`
                    : '-',
            status: a.status,
            executive_status: a.executive_status ?? '-',
        }))
    ), [attendancesData]);


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index',
            label: 'Sıra No',
            style: { width: '8%' },
            render: (_row: Row, _?: any, idx?: number) => idx! + 1,
        },
        { key: 'student_no', label: 'Numara', render: r => r.student_no },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            render: ({ status }) =>
                status === 0 ? 'Geldi'
                    : status === 1 ? 'Geç Geldi'
                        : 'Gelmedi',
        },
        { key: 'executive_status', label: 'Yönetici Durumu', render: r => r.executive_status },
    ], []);


    return (
        <ReusableTable<Row>
            columns={columns}
            tableMode="single"
            data={rows}
            loading={loading}
            error={error}
            showExportButtons={false}
            onCloseModal={() => navigate(-1)}
            showModal={true}
            exportFileName="Yönetici Öğrenci Durumu İşleme"
        />
    );
}
