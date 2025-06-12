
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
    club_name: string;     // Kulüp / Grup
    class_name: string;    // Sınıf / Şube
    student_name: string;  // Adı Soyadı
    status: number;        // 0:Geldi  1:Geç  2:Gelmedi
    clicked: boolean;      // dropdown ilk kez açıldı mı?
}

const STATUS_TXT = ['Geldi', 'Geç Geldi', 'Gelmedi'];
const STATUS_CLR = ['text-success', 'text-warning', 'text-danger'];

export default function ClubPollingTable() {


    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');


    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    const [enabled, setEnabled] = useState({ groups: false, areas: false });


    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });


    const {
        attendancesData = [], loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        club_name: clubName || undefined,
        enabled: true,
    });


    const clubNameOptions = useMemo(() => {
        const set = new Set<string>();
        attendancesData.forEach((a: any) => { if (a.name) set.add(a.name); });
        return Array.from(set).map(n => ({ value: n, label: n }));
    }, [attendancesData]);


    const baseRows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const club = a.name || '-';

            if (!a.students?.length) {
                return [{
                    id: a.id, club_name: club, class_name: cls,
                    student_name: '-', status: a.status ?? 0, clicked: false,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                club_name: club,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                status: s.pivot?.status ?? 0,
                clicked: false,
            }));
        })
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);


    const handleStatusChange = (idx: number, value: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status: value, clicked: true } : row,
        ));


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => <div className="text-center">{idx !== undefined ? idx + 1 : ''}</div>,
        },
        { key: 'club_name', label: 'Kulüp / Grup', render: r => r.club_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 160, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clicked ? STATUS_CLR[row.status] : ''}`}
                        value={row.clicked ? row.status : ''}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        onChange={e => handleStatusChange(idx!, Number(e.target.value))}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} className={STATUS_CLR[0]}>{STATUS_TXT[0]}</option>
                        <option value={1} className={STATUS_CLR[1]}>{STATUS_TXT[1]}</option>
                        <option value={2} className={STATUS_CLR[2]}>{STATUS_TXT[2]}</option>
                    </select>
                );
            },
        },
    ], [rows]);


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'club_name', label: 'Kulüp Adı', type: 'select',
            value: clubName, onChange: setClubName,
            options: clubNameOptions,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Kulüp Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, clubName, groupId, areaId,
        clubNameOptions, groupsData, usedAreasData,
    ]);


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
            pageSize={paginate}
            onPageChange={setPage}
            onPageSizeChange={s => { setPaginate(s); setPage(1); }}
            exportFileName="club_polling_list"
        />
    );
}
