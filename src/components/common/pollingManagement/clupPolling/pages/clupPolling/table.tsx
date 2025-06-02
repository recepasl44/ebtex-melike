

import { useState, useMemo, useEffect } from 'react';



import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';


interface Row {
    id: number;
    club_name: string;    // Kulüp / Grup
    class_name: string;    // Sınıf / Şube
    student_name: string;    // Öğrenciler
    status: number;    // 0 Geldi – 1 Geç Geldi – 2 Gelmedi
}


export default function ClubPollingTable() {

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);


    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
    });


    const { groupsData } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData } = useUsedAreasList({ enabled: enabled.areas });


    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        club_name: clubName || undefined,
        enabled: true,
    });


    const baseRows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const club = a.name || '-';

            if (!a.students?.length) {

                return [{
                    id: a.id, club_name: club, class_name: cls,
                    student_name: '-', status: a.status ?? 0,
                }];
            }

            return a.students.map((s: any) => ({
                id: a.id,
                club_name: club,
                class_name: cls,
                student_name: `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                status: s.pivot?.status ?? 0,
            }));
        })
    ), [attendancesData]);
    const [rows, setRows] = useState<Row[]>(baseRows);

    useEffect(() => {
        setRows(baseRows);
    }, [baseRows]);


    function handleStatusClick(idx: number) {
        setRows(r => r.map((row, i) => i === idx
            ? { ...row, status: (row.status + 1) % 3 }
            : row));
    }

    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index',
            label: 'Sıra No',
            style: { width: 80, textAlign: 'center' },
            render: (_r: Row, _open?: ((row: Row) => void), idx?: number) => <>{(idx ?? 0) + 1}</>,
        },
        { key: 'club_name', label: 'Kulüp / Grup', render: r => r.club_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenciler', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 120, textAlign: 'center' },
            render: (row, _open, idx) => (
                <span
                    style={{ cursor: 'pointer' }}
                    className={
                        row.status === 0
                            ? 'text-success'
                            : row.status === 1
                                ? 'text-warning'
                                : 'text-danger'
                    }
                    onClick={() => idx !== undefined && handleStatusClick(idx)}
                >
                    {row.status === 0
                        ? 'Geldi'
                        : row.status === 1
                            ? 'Geç Geldi'
                            : 'Gelmedi'}
                </span>
            ),
        },
    ], []);


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },

        {
            key: 'club_name', label: 'Kulüp Adı', type: 'text',
            value: clubName, onChange: setClubName
        },

        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: (groupsData ?? []).map(g => ({ value: String(g.id), label: g.name }))
        },

        {
            key: 'area_id', label: 'Kulüp Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name }))
        },
    ], [dateRange, clubName, groupId, areaId, groupsData, usedAreasData]);


    return (
        <ReusableTable<Row>

            tableMode="single"

            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="club_polling_list"
        />
    );
}
