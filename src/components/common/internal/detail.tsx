import React, { useState, useMemo, useEffect } from "react";
import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";

import { useProgramsTable } from "../../hooks/program/useList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useCoursesTable } from "../../hooks/course/useList";
import { useSchoolTypesList } from "../../hooks/schoolTypes/useSchoolTypesList";
import { useClassroomList } from "../../hooks/classrooms/useList";

interface IReportFilters extends FormikValues {
    program_id: number;
    level_id: number;
    course_id: number;
    school_type_id: number;
    classroom_id: number;
    registration_from?: string;
    registration_to?: string;
}

interface StudentReportModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: (filters: IReportFilters) => void;
}


const StudentReportModal: React.FC<StudentReportModalProps> = ({
    show,
    onClose,
    onRefresh,
}) => {

    const [enabled, setEnabled] = useState({
        program: true,
        level: false,
        course: false,
        schoolType: false,
        classroom: false,
    });

    const [filters, setFilters] = useState<IReportFilters>({
        program_id: 0,
        level_id: 0,
        course_id: 0,
        school_type_id: 0,
        classroom_id: 0,
        registration_from: undefined,
        registration_to: undefined,
    });


    const { programsData } = useProgramsTable({ enabled: enabled.program });
    const programOptions = useMemo(
        () => programsData.map((p) => ({ value: p.id, label: p.name })),
        [programsData]
    );

    const { levelsData } = useLevelsTable({
        program_id: filters.program_id,
        enabled: enabled.level,
    });
    const levelOptions = useMemo(
        () => levelsData.map((l) => ({ value: l.id, label: l.name })),
        [levelsData]
    );

    const { coursesData } = useCoursesTable({
        program_id: filters.program_id,
        level_id: filters.level_id,
        enabled: enabled.course,
    });
    const courseOptions = useMemo(
        () => coursesData.map((c) => ({ value: c.id, label: c.name })),
        [coursesData]
    );

    const { schoolTypesData } = useSchoolTypesList({
        enabled: enabled.schoolType,
    });
    const schoolTypeOptions = useMemo(
        () => schoolTypesData.map((t) => ({ value: t.id, label: t.name })),
        [schoolTypesData]
    );

    const { classroomData } = useClassroomList({
        branchId: filters.school_type_id,
    });
    const classroomOptions = useMemo(
        () => classroomData.map((c) => ({ value: c.id, label: c.name })),
        [classroomData]
    );

    const getFields = (): FieldDefinition[] => [
        {
            name: "program_id",
            label: "Okul Seviyesi",
            type: "select",
            options: programOptions,
            required: true,
            onClick: () =>
                setEnabled((e) => ({
                    ...e,
                    program: true,
                    level: false,
                    course: false,
                    schoolType: false,
                    classroom: false,
                })),
            onChange: (val: number) => {
                const newFilters = {
                    ...filters,
                    program_id: val,
                    level_id: 0,
                    course_id: 0,
                    school_type_id: 0,
                    classroom_id: 0,
                };
                setFilters(newFilters);
                onRefresh(newFilters);
                setEnabled((e) => ({ ...e, level: true }));
            },
        },
        {
            name: "level_id",
            label: "Sınıf Seviyesi",
            type: "select",
            options: levelOptions,
            required: true,
            disabled: !enabled.level,
            onClick: () =>
                setEnabled((e) => ({
                    ...e,
                    course: false,
                    schoolType: false,
                    classroom: false,
                })),
            onChange: (val: number) => {
                const newFilters = {
                    ...filters,
                    level_id: val,
                    course_id: 0,
                    school_type_id: 0,
                    classroom_id: 0,
                };
                setFilters(newFilters);
                onRefresh(newFilters);
                setEnabled((e) => ({ ...e, course: true }));
            },
        },
        {
            name: "course_id",
            label: "Alan",
            type: "select",
            options: courseOptions,
            required: true,
            disabled: !enabled.course,
            onClick: () =>
                setEnabled((e) => ({
                    ...e,
                    schoolType: false,
                    classroom: false,
                })),
            onChange: (val: number) => {
                const newFilters = {
                    ...filters,
                    course_id: val,
                    school_type_id: 0,
                    classroom_id: 0,
                };
                setFilters(newFilters);
                onRefresh(newFilters);
                setEnabled((e) => ({ ...e, schoolType: true }));
            },
        },
        {
            name: "school_type_id",
            label: "Okul Türü",
            type: "select",
            options: schoolTypeOptions,
            required: true,
            disabled: !enabled.schoolType,
            onClick: () =>
                setEnabled((e) => ({
                    ...e,
                    classroom: false,
                })),
            onChange: (val: number) => {
                const newFilters = {
                    ...filters,
                    school_type_id: val,
                    classroom_id: 0,
                };
                setFilters(newFilters);
                onRefresh(newFilters);
                setEnabled((e) => ({ ...e, classroom: true }));
            },
        },
        {
            name: "classroom_id",
            label: "Sınıf",
            type: "select",
            options: classroomOptions,
            required: true,
            disabled: !enabled.classroom,
            onClick: () =>
                setEnabled((e) => ({
                    ...e,
                    classroom: true,
                })),
            onChange: (val: number) => {
                const newFilters = { ...filters, classroom_id: val };
                setFilters(newFilters);
                onRefresh(newFilters);
            },
        },
        {
            name: "registration_from",
            label: "Kayıt Tarihi Aralığı",
            type: "date",
        },
    ];

    interface IStudentReportRow {
        id: number;
        studentNo: string;
        studentName: string;
        programName: string; // Okul Seviyesi
        levelName: string;   // Sınıf Seviyesi
        courseName: string;  // Alan
        schoolTypeName: string;
        listPriceTotal: number;
        discountPrice: number;
        registrationDate: string;
        classroomName: string;
    }

    const columns = useMemo<ColumnDefinition<IStudentReportRow>[]>(() => [
        {
            key: "studentNo",
            label: "Okul No",
            render: (row) => row.studentNo || "-",
        },
        {
            key: "studentName",
            label: "Adı Soyadı",
            render: (row) => row.studentName || "-",
        },
        {
            key: "programName",
            label: "Okul Seviyesi",
            render: (row) => row.programName || "-",
        },
        {
            key: "levelName",
            label: "Sınıf Seviyesi",
            render: (row) => row.levelName || "-",
        },
        {
            key: "courseName",
            label: "Alan",
            render: (row) => row.courseName || "-",
        },
        {
            key: "schoolTypeName",
            label: "Okul Türü",
            render: (row) => row.schoolTypeName || "-",
        },
        {
            key: "listPriceTotal",
            label: "Liste Ücretler Toplamı",
            render: (row) => `${row.listPriceTotal || 0} ₺`,
        },
        {
            key: "discountPrice",
            label: "İndirimli Ücret",
            render: (row) => `${row.discountPrice || 0} ₺`,
        },
        {
            key: "registrationDate",
            label: "Kayıt Tarihi",
            render: (row) => row.registrationDate || "-",
        },
        {
            key: "classroomName",
            label: "Sınıf",
            render: (row) => row.classroomName || "-",
        },
    ], []);


    const [reportData, setReportData] = useState<IStudentReportRow[]>([]);

    useEffect(() => {
        if (!show) return;
        const dummy = [

            {
                id: 1,
                studentNo: "721",
                studentName: "Merve Nur Demo",
                programName: "Lise",
                levelName: "test",
                courseName: "Sayısal",
                schoolTypeName: "Özel",
                listPriceTotal: 1000,
                discountPrice: 0,
                registrationDate: "2025-01-01",
                classroomName: "12A",
            },
            {
                id: 2,
                studentNo: "1",
                studentName: "Rabia Eda Demo",
                programName: "Ortaokul",
                levelName: "7. Sınıf",
                courseName: "Fen",
                schoolTypeName: "Devlet",
                listPriceTotal: 800,
                discountPrice: 50,
                registrationDate: "2025-03-10",
                classroomName: "7C",
            },
            // vs...
        ];
        setReportData(dummy);
    }, [filters, show]);



    const initialValues = { ...filters };

    const handleSubmit = (
        values: IReportFilters,
        _h: FormikHelpers<IReportFilters>
    ) => {
        onRefresh(values);
        onClose();
    };

    return (
        <ReusableModalForm
            show={show}
            title="Öğrenci Raporu"
            fields={getFields()}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Uygula"
            cancelButtonLabel="Kapat"
            isLoading={false}
            error={null}
            autoGoBackOnModalClose
            onClose={onClose}
        >

            <div style={{ marginTop: "1rem" }}>
                <ReusableTable<IStudentReportRow>
                    columns={columns}
                    data={reportData}
                    loading={false}
                    tableMode="single"
                    showExportButtons={true}
                    exportFileName="student-report"
                    currentPage={1}
                    totalPages={1}
                    totalItems={reportData.length}
                    pageSize={reportData.length}
                    onPageChange={() => { }}
                    onPageSizeChange={() => { }}
                    onDeleteRow={() => { }}
                />
            </div>
        </ReusableModalForm>
    );
};

export default StudentReportModal;
