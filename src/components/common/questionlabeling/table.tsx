import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../../../components/common/ReusableTable";
import { Button } from "react-bootstrap";
import { useProgramsTable } from "../../hooks/program/useList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useLessonList } from "../../hooks/lessons/useList";
import { useUnitsTable } from "../../hooks/units/useList";
import { useChaptersTable } from "../../hooks/chapters/useList";
import { useQuestionTypesTable } from "../../hooks/questiontypes/useList";
import { useQuestionDifficultsTable } from "../../hooks/questiondifficults/useList";
import { useExamRelevancesTable } from "../../hooks/examrelevances/useList";
import { useQuestionsList } from "../../hooks/questions/useList";
import { useQuestionDelete } from "../../hooks/questions/useDelete";

import { Question } from "../../../types/questions/list";
import { useUpdateQueryParamsFromFilters } from "../../hooks/utilshooks/useUpdateQueryParamsFromFilters";

type QueryParams = {
  [x: string]: any;
  page: number;
  Program: number;
  Level: number;
  Lesson: number;
  Units: number;
  Chapters: number;
  QuestionTypes: number;
  pageSize: number;
  QuestionDifficults: number;
  ExamRelevances: number;
};

export default function QuestionLabeling() {
  const navigate = useNavigate();
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [lesson, setLesson] = useState("");
  const [units, setUnits] = useState("");
  const [chapters, setChapters] = useState("");
  const [questionTypes, setQuestionTypes] = useState("");
  const [questionDifficults, setQuestionDifficults] = useState("");
  const [examRelevances, setExamRelevances] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    program: false,
    level: false,
    lesson: false,
    units: false,
    chapters: false,
    questionTypes: false,
    questionDifficults: false,
    examRelevances: false,
  });

  useQuestionDelete();

  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { programsData: programData } = useProgramsTable({
    enabled: filtersEnabled.program,
  });

  const { levelsData } = useLevelsTable({
    enabled: filtersEnabled.level,
  });

  const { lessonsData } = useLessonList({
    enabled: filtersEnabled.lesson,
    page: 1,
    pageSize: 100,
  });

  const { unitsData } = useUnitsTable({
    enabled: filtersEnabled.units,
    page: 1,
    pageSize: 100,
  });

  const { chaptersData } = useChaptersTable({
    enabled: filtersEnabled.chapters,
    page: 1,
    pageSize: 100,
  });

  const { questionTypesData } = useQuestionTypesTable({
    enabled: filtersEnabled.questionTypes,
    page: 1,
    pageSize: 100,
  });

  const { questionDifficultsData } = useQuestionDifficultsTable({
    enabled: filtersEnabled.questionDifficults,
    page: 1,
    pageSize: 100,
  });

  const { examRelevancesData } = useExamRelevancesTable({
    enabled: filtersEnabled.examRelevances,
    page: 1,
    pageSize: 100,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFiltersEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));

    if (key === "program") {
      setProgram(value);
    }
    if (key === "level") {
      setLevel(value);
    }
    if (key === "lesson") {
      setLesson(value);
    }
    if (key === "units") {
      setUnits(value);
    }
    if (key === "chapters") {
      setChapters(value);
    }
    if (key === "questionTypes") {
      setQuestionTypes(value);
    }
    if (key === "questionDifficults") {
      setQuestionDifficults(value);
    }
    if (key === "examRelevances") {
      setExamRelevances(value);
    }
  };

  // `filtersState` güncelleniyor ve URL parametrelerini yönetiyoruz
  const filtersState = useMemo(
    () => ({
      Program: Number(program) || 0,
      Level: Number(level) || 0,
      Lesson: Number(lesson) || 0,
      Units: Number(units) || 0,
      Chapters: Number(chapters) || 0,
      QuestionTypes: Number(questionTypes) || 0,
      QuestionDifficults: Number(questionDifficults) || 0,
      ExamRelevances: Number(examRelevances) || 0,
      page: 1,
      pageSize,
      enabled: true, // `questions API` her zaman `enabled: true` olacak
    }),
    [
      program,
      level,
      lesson,
      units,
      chapters,
      questionTypes,
      questionDifficults,
      examRelevances,
      pageSize,
    ]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("Program", String(params.Program));
    query.set("Level", String(params.Level));
    query.set("Lesson", String(params.Lesson));
    query.set("Units", String(params.Units));
    query.set("Chapters", String(params.Chapters));
    query.set("QuestionTypes", String(params.QuestionTypes));
    query.set("QuestionDifficults", String(params.QuestionDifficults));
    query.set("ExamRelevances", String(params.ExamRelevances));
    query.set("pageSize", String(params.pageSize));
    query.set("enabled", String(params.enabled));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filtersState, updateQueryParams);

  // Filtrelerin seçeneklerini (options) oluşturuyoruz
  const filters = useMemo(() => {
    const basicFilters = [
      {
        key: "program",
        label: "Program",
        value: program,
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, program: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("program", val); // Program seçildiğinde filter değiştiriliyor
        },
        options: (programData || []).map((p: any) => ({
          value: String(p.id),
          label: p.name,
          key: p.id,
        })),
      },
      {
        key: "level",
        label: "Level",
        value: level,
        onChange: (val: string) => handleFilterChange("level", val),
        dependencyKey: "program",
        options: (levelsData || []).map((l: any) => ({
          value: String(l.id),
          label: l.name,
        })),
      },
      {
        key: "lesson",
        label: "Lesson",
        value: lesson,
        onChange: (val: string) => handleFilterChange("lesson", val),
        dependencyKey: "level",
        options: (lessonsData || []).map((l: any) => ({
          value: String(l.id),
          label: l.name,
        })),
      },
      {
        key: "units",
        label: "Units",
        value: units,
        onChange: (val: string) => handleFilterChange("units", val),
        options: (unitsData || []).map((u: any) => ({
          value: String(u.id),
          label: u.name,
        })),
      },
      {
        key: "chapters",
        label: "Chapters",
        value: chapters,
        onChange: (val: string) => handleFilterChange("chapters", val),
        options: (chaptersData || []).map((c: any) => ({
          value: String(c.id),
          label: c.name,
        })),
      },
      {
        key: "questionTypes",
        label: "Question Types",
        value: questionTypes,
        onChange: (val: string) => handleFilterChange("questionTypes", val),
        options: (questionTypesData || []).map((q: any) => ({
          value: String(q.id),
          label: q.name,
        })),
      },
      {
        key: "questionDifficults",
        label: "Difficulty Levels",
        value: questionDifficults,
        onChange: (val: string) =>
          handleFilterChange("questionDifficults", val),
        options: (questionDifficultsData || []).map((qd: any) => ({
          value: String(qd.id),
          label: qd.name,
        })),
      },
      {
        key: "examRelevances",
        label: "Exam Relevances",
        value: examRelevances,
        onChange: (val: string) => handleFilterChange("examRelevances", val),
        options: (examRelevancesData || []).map((er: any) => ({
          value: String(er.id),
          label: er.name,
        })),
      },
    ];
    return basicFilters;
  }, [
    program,
    level,
    lesson,
    units,
    chapters,
    questionTypes,
    questionDifficults,
    examRelevances,
    programData,
    levelsData,
    lessonsData,
    unitsData,
    chaptersData,
    questionTypesData,
    questionDifficultsData,
    examRelevancesData,
  ]);

  const questionParams = useMemo(
    () => ({
      enabled: true,
      paginate: pageSize,
      page,
      program_id: Number(program) || 0,
      per_page: pageSize,
    }),
    [pageSize, page, program]
  );

  const {
    questionsData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useQuestionsList(questionParams);

  const columns: ColumnDefinition<Question>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Course Name",
      },
      {
        key: "level",
        label: "Level",
        render: (row) => (row.level ? row.level.name : ""),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row, openDeleteModal) => (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/coursescrud/${row.id}`)}
            >
              Details
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="ms-1"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div>
      <h4>Question Labeling</h4>
      <ReusableTable<Question>
        columns={columns}
        data={questionsData}
        loading={loading}
        showModal={false}
        showExportButtons={true}
        tableMode="single"
        error={error}
        filters={filters}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          setPage(newPage);
          updatePage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          updateTablePageSize(newSize);
          setPage(1);
          updatePage(1);
        }}
        exportFileName="question_labeling"
      />
    </div>
  );
}
