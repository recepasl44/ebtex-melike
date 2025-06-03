import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../ReusableTable';
import FilterGroup from '../../components/organisms/SearchFilters';

import { useAssignmentStudentsList } from '../../../../hooks/assignmentStudents/useList';
import { AssignmentStudentData as AssignmentRow } from '../../../../../types/assignmentStudents/list';

import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useListStudents } from '../../../../hooks/student/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../hooks/units/useList';

export default function AssignmentsCheckTable() {
    const navigate = useNavigate();


    const [levelId, setLevelId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [unitId, setUnitId] = useState('');
    const [studentName, setStudent] = useState('');
    const [studentId, setStudentId] = useState('');
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignStatus, setAssignStatus] = useState('');

    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const [enabled, setEnabled] = useState({
        level: false,
        branch: false,
        lesson: false,
        unit: false,
        student: false,
    });

    const { levelsData = [] } = useLevelsTable({ enabled: enabled.level });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.branch && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: +levelId || undefined,
    });
    const { unitsData = [] } = useUnitsTable({
        enabled: enabled.unit && !!lessonId,
        lesson_id: +lessonId || undefined,
    });
    const { data: studentOptions = [] } = useListStudents({
        enabled: enabled.student && !!studentName,
        first_name: studentName,
    });


    const listParams = useMemo(() => ({
        enabled: true,
        page, pageSize,
        level_id: levelId ? +levelId : undefined,
        classroom_id: branchId ? +branchId : undefined,
        student_id: studentId ? +studentId : undefined,
        lesson_id: lessonId ? +lessonId : undefined,
        unit_id: unitId ? +unitId : undefined,
        title: assignmentTitle || undefined,
        status: assignStatus || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
    }), [
        page, pageSize,
        levelId, branchId, lessonId, unitId,
        studentId, assignmentTitle, assignStatus,
        dateRange,
    ]);

    const {
        assignmentStudentsData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAssignmentStudentsList(listParams);


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'level', label: 'Sınıf Seviyesi', type: 'select',
            value: levelId,
            onClick: () => setEnabled(p => ({ ...p, level: true })),
            onChange: val => { setLevelId(val); setBranchId(''); setLessonId(''); setUnitId(''); },
            options: levelsData.map(l => ({ label: l.name, value: String(l.id) })),
        },
        {
            key: 'branch', label: 'Sınıf / Şube', type: 'select',
            value: branchId,
            onClick: () => setEnabled(p => ({ ...p, branch: true })),
            onChange: setBranchId,
            options: classroomData.map(c => ({ label: c.name, value: String(c.id) })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'autocomplete',
            value: studentName,
            onClick: () => setEnabled(p => ({ ...p, student: true })),
            onChange: val => {
                setStudent(val);
                const f = studentOptions.find(o => o.label.toLowerCase() === val.toLowerCase());
                setStudentId(f ? String(f.value) : '');
            },
            options: studentOptions.map(o => ({ label: o.label, value: String(o.value) })),
        },
        {
            key: 'lesson', label: 'Dersler', type: 'select',
            value: lessonId,
            onClick: () => setEnabled(p => ({ ...p, lesson: true })),
            onChange: val => { setLessonId(val); setUnitId(''); },
            options: lessonsData.map(l => ({ label: l.name, value: String(l.id) })),
        },
        {
            key: 'unit', label: 'Ünite / Konu', type: 'select',
            value: unitId,
            onClick: () => setEnabled(p => ({ ...p, unit: true })),
            onChange: setUnitId,
            options: unitsData.map(u => ({ label: u.name, value: String(u.id) })),
        },
        {
            key: 'assignmentTitle', label: 'Ödev Başlığı', type: 'text',
            value: assignmentTitle,
            onChange: setAssignmentTitle,
        },
        {
            key: 'assignStatus', label: 'Ödev Durumu', type: 'select',
            value: assignStatus, onChange: setAssignStatus,
            options: [
                { label: 'Yapıldı', value: '0' },
                { label: 'Yapılmadı', value: '1' },
                { label: 'Eksik', value: '2' },
                { label: 'Gelmedi', value: '3' },
            ],
        },
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: val => {
                if (val?.startDate && val?.endDate) setDateRange(val);
                else setDateRange({ startDate: '', endDate: '' });
            },
        },
    ], [
        levelId, branchId, lessonId, unitId,
        studentName, assignmentTitle, assignStatus, dateRange,
        levelsData, classroomData, lessonsData, unitsData, studentOptions,
    ]);

    const columns: ColumnDefinition<AssignmentRow>[] = useMemo(() => [
        {
            key: 'lessons',
            label: 'Dersler',
            render: row => row.assignment.lessons,
        },
        {
            key: 'unit',
            label: 'Ünite',
            render: row => row.assignment.unit_topic ?? '',
        },
        {
            key: 'student',
            label: 'Öğrenci',
            render: row => `${row.student.first_name} ${row.student.last_name}`,
        },
        {
            key: 'homework_title',
            label: 'Ödev Başlığı',
            render: row => row.assignment.title ?? '',
        },
        {
            key: 'end_date',
            label: 'Bitiş Tarihi',
            render: row => row.assignment.end_date ?? '-',
        },
        {
            key: 'assignment_status',
            label: 'Durum',
            render: row => {
                if (row.status === 0) return 'Eksik';
                if (row.status === 1) return 'Aktif';
                if (row.status === 2) return 'Verildi';
                return '-';
            },
        },
        {
            key: 'actions',
            label: 'İşlemler',
            render: row => (
                <>
                    <button
                        onClick={() => navigate(`/assignmentsCheck/crud/${row.id}`)}
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    >
                        <i className="ti ti-pencil" />
                    </button>

                    <button
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => { /* silme işlemi buraya */ }}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </>
            ),
        },
    ], [navigate]);


    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={navigate}
            />

            <ReusableTable<AssignmentRow>
                columns={columns}
                data={assignmentStudentsData}
                loading={loading}
                error={error}
                showModal={false}
                showExportButtons
                tableMode="single"
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(1); }}
                exportFileName="student_assignment_list"
            />
        </>
    );
}
