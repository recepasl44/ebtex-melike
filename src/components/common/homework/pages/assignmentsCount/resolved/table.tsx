import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../../components/organisms/SearchFilters';
import { useAssignmentStudentsList } from '../../../../../hooks/assignmentStudents/useList';
import { AssignmentStudentData as AssignmentRow } from '../../../../../../types/assignmentStudents/list';


import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useListStudents } from '../../../../../hooks/student/useList';



export default function CompletedHomeworkCount() {

    const navigate = useNavigate();

    //#region  State tanımlamalarnı yapıp sayfa ilk yüklendiğinde tüm filtreleri pasife çekiyorum.
    const [dateRange] = useState({
        startDate: "",
        endDate: "",
    });
    const [levelId, setLevelId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [studentName, setStudent] = useState('');
    const [studentId, setStudentId] = useState('');
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const [enabled, setEnabled] = useState({// sayfa ilk yüklendiğinde tüm filtreler pasf olcak.)
        level: false,
        branch: false,
        lesson: false,
        student: false,
    });

    const { levelsData = [] } = useLevelsTable({
        enabled: enabled.level,
        page: 1,
        pageSize: 100,
    });

    const { classroomData: classroomList = [] } = useClassroomList({
        enabled: enabled.branch && !!levelId,
        level_id: Number(levelId) || undefined,
        page: 1,
        pageSize: 100,
        branchId: 0
    });

    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: Number(levelId) || undefined,
        page: 1,
        pageSize: 100,
    });
    const { data: studentOptions = [] } = useListStudents({
        enabled: enabled.student && !!studentName,
        first_name: studentName,
        page: 1,
        pageSize: 100,
    });
    //#endregion

    //#region Filtrelerin son halini saklayan bir filterState nesnesi oluşturdum, bağımlılıkları değişmedi sürece tekrardan hesaplanmasın eski değeri kullanılsız diye useMemo ile optimize ettim.
    const listParams = useMemo(
        () => ({
            enabled: true,
            page,
            pageSize,
            level_id: levelId ? Number(levelId) : undefined,
            classroom_id: branchId ? Number(branchId) : undefined,
            lesson_id: lessonId ? Number(lessonId) : undefined,
            student_id: studentId ? Number(studentId) : undefined,
        }), [page, pageSize, levelId, branchId, lessonId, studentId],
    );
    //#endregion

    const {
        assignmentStudentsData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAssignmentStudentsList(listParams);


    //#region Filtre alanları tanımlanıp optimize ediliyor.
    const filters: FilterDefinition[] = useMemo(
        () => [

            {
                key: 'level',
                label: 'Sınıf Seviyesi',
                type: 'select',
                value: levelId,
                onClick: () => setEnabled(prev => ({ ...prev, level: true })),
                onChange: val => {
                    setLevelId(val);
                    setBranchId(''); setLessonId('');
                },
                options: levelsData.map(l => ({ label: l.name, value: String(l.id) })),
            },
            {
                key: 'branch',
                label: 'Sınıf / Şube',
                type: 'select',
                value: branchId,
                onClick: () => setEnabled(prev => ({ ...prev, branch: true })),
                onChange: setBranchId,
                options: classroomList.map(c => ({ label: c.name, value: String(c.id) })),
            },
            {
                key: 'student',
                label: 'Öğrenci',
                type: 'autocomplete',
                value: studentName,
                onClick: () => setEnabled(prev => ({ ...prev, student: true })),
                onChange: val => {
                    setStudent(val);
                    const f = studentOptions.find((o: { label: string; }) => o.label.toLowerCase() === val.toLowerCase());
                    setStudentId(f ? String(f.value) : '');
                },
                options: studentOptions.map((o: { label: any; value: any; }) => ({ label: o.label, value: String(o.value) })),
            },
            {
                key: 'lesson',
                label: 'Dersler',
                type: 'select',
                value: lessonId,
                onClick: () => setEnabled(prev => ({ ...prev, lesson: true })),
                onChange: val => { setLessonId(val); },
                options: lessonsData.map(l => ({ label: l.name, value: String(l.id) })),
            },


        ], [levelId, branchId, lessonId, dateRange,
        levelsData, classroomList, lessonsData, enabled,
    ],
    );
    //#endregion

    const columns: ColumnDefinition<AssignmentRow>[] = useMemo(() => [
        {
            key: 'assignment.class_section',
            label: 'Sınıf / Şube',
            render: r => r.assignment?.class_section ?? '-',
        },
        {
            key: 'lessons',
            label: 'Dersler',
            render: (row) => row.assignment.lessons,

        },
        {
            key: 'homework_title',
            label: 'Ödev Başlığı',
            render: (row) => row.assignment.title ?? '',
        },
        {
            key: 'completed',
            label: 'Yapıldı',

        },
        {
            key: 'notCompleted',
            label: 'Yapılmadı',

        }, {
            key: 'incomplete',
            label: 'Eksik',

        }, {
            key: 'notSubmitted',
            label: 'Gelmedi',

        }, {
            key: 'notHandled',
            label: 'Edilmedi',

        },

    ], [navigate]);


    return (
        <div>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />
            <ReusableTable<AssignmentRow>
                columns={columns}
                data={assignmentStudentsData}
                loading={loading}
                showModal={false}
                showExportButtons={true}
                tableMode="single"
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                }}
                exportFileName="student_assignment_list"
            />
        </div>

    )
}