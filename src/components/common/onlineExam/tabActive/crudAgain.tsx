import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { useProgramsTable } from "../../../hooks/program/useList";
import { useSourcesList } from "../../../hooks/sources/useList";
import { useQuizzesList } from "../../../hooks/quizzes/useList";
import { useQuizUpdate } from "../../../hooks/quizzes/useUpdate";
import { useQuizAdd } from "../../../hooks/quizzes/useAdd";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";

interface QuizRepeatValues extends FormikValues {
  id?: number;
  quiz_type_id: number | string;
  quiz_name: string;
  period_id: number | string;
  level_id: number | string;
  school_levels: number | string;
  quiz_no: string;
  preparation_date: string;
  result_publish_datetime: string;
  quiz_end_date: string;
  question_type_id: number | string;
  video_status: string;
  source_id: number | string;
  platform_id: number | string;
}

interface QuizRepeatModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  quizId?: number;
}

const QuizRepeatModal: React.FC<QuizRepeatModalProps> = ({
  show,
  onClose,
  onRefresh,
  quizId: propQuizId
}) => {
  // Get the ID from URL params if provided
  const { id: urlId } = useParams<{ id?: string }>();
  
  // Use the ID from props if provided, otherwise use the ID from URL
  const quizId = propQuizId || (urlId ? parseInt(urlId, 10) : undefined);

  // Initialize both hooks - for adding and updating quizzes
  const { updateExistingQuiz, error: updateError } = useQuizUpdate();
  const { addNewQuiz, error: addError } = useQuizAdd();

  // Determine loading state and error based on which operation is being performed
  const isUpdate = Boolean(quizId);
  const error = isUpdate ? updateError : addError;
  
  // Check if operation is in progress

  // Generate a unique exam code
  const generateExamCode = () => {
    const timestamp = new Date().getTime().toString().substring(0, 10);
    return `${timestamp}T`;
  };

  // Get program data for class levels
  const { programsData } = useProgramsTable({ enabled: true });
  const { sourcesData: examSources } = useSourcesList({ enabled: true });
  
  // Fetch quiz data to populate fields
  const { quizzesData } = useQuizzesList({
    enabled: true
  });

  const [initialValues, setInitialValues] = useState<QuizRepeatValues>({
    quiz_type_id: "",
    quiz_name: "",
    period_id: "",
    level_id: "",
    school_levels: "",
    quiz_no: generateExamCode(), // Set generated exam code as default
    preparation_date: format(new Date(), "yyyy-MM-dd"),
    result_publish_datetime: "",
    quiz_end_date: "",
    question_type_id: "",
    video_status: "Hazırlanacak", // Default value
    source_id: "",
    platform_id: ""
  });

  useEffect(() => {
    if (quizId && quizzesData) {
      const selectedQuiz = quizzesData.find(quiz => quiz.id === quizId);
      if (selectedQuiz) {
        setInitialValues({
          quiz_type_id: selectedQuiz.quiz_type_id || "",
          quiz_name: `${selectedQuiz.quiz_name || ""}-TEKRAR`,
          period_id: selectedQuiz.period_id || "",
          level_id: selectedQuiz.level_id || "",
          school_levels: selectedQuiz.level?.program_id || "",
          quiz_no: `${selectedQuiz.quiz_no || ""}-TEKRAR`,
          preparation_date: format(new Date(), "yyyy-MM-dd"),
          result_publish_datetime: selectedQuiz.result_publish_datetime || "",
          quiz_end_date: selectedQuiz.quiz_date || "",
          question_type_id: selectedQuiz.question_type_id || "",
          video_status: "Hazırlanacak",
          source_id: selectedQuiz.source_id || "",
          platform_id: selectedQuiz.platform?.id || ""
        });
      }
    }
  }, [quizId, quizzesData, programsData]);

  // Extract unique quiz types from the data
  const quizTypes = quizzesData
    ? Array.from(
        new Map(
          quizzesData
            .filter(quiz => quiz.quiz_type)
            .map(quiz => [quiz.quiz_type_id, { id: quiz.quiz_type_id, name: quiz.quiz_type?.name }])
        ).values()
      )
    : [];

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "quiz_type_id",
        label: "Sınav Türü",
        type: "select",
        options: quizTypes.map(type => ({
          label: type.name || "",
          value: type.id
        })),
      },
      {
        name: "quiz_name",
        label: "Deneme Sınavı Adı",
        type: "text",
      },
      {
        name: "period_id",
        label: "Dönemi",
        type: "select",
        options: [
          { label: "Hafta İçi", value: "1" },
          { label: "Hafta Sonu", value: "2" }
        ],
      },
      {
        name: "platform_id",
        label: "Okul",
        type: "select",
        options: quizzesData
          ? Array.from(
              new Map(
                quizzesData
                  .filter(quiz => quiz.platform)
                  .map(quiz => [
                    quiz.platform.id, 
                    { id: quiz.platform.id, name: quiz.platform.name }
                  ])
              ).values()
            ).map(platform => ({
              label: platform.name,
              value: platform.id
            }))
          : [],
      },
      {
        name: "school_levels",
        label: "Okul Seviyesi",
        type: "select",
        options: (programsData || []).map(program => ({
          label: program.name,
          value: program.id,
          key: program.id
        })),
      },
      {
        name: "quiz_no",
        label: "Sınav Kodu",
        type: "text",
        disabled: true,
      },
      {
        name: "preparation_date",
        label: "Hazırlama Tarihi",
        type: "date",
      },
      {
        name: "result_publish_datetime",
        label: "Yayınlanma Tarihi-Saati",
        type: "date",
      },
      {
        name: "quiz_end_date",
        label: "Bitiş Tarihi-Saati",
        type: "date",
      },
      {
        name: "question_type_id",
        label: "Soru Tipi",
        type: "select",
        options: [
          { label: "Deneme Sınavı", value: "1" }
        ],
      },
      {
        name: "video_status",
        label: "Soru Çözüm Video Durumu",
        type: "select",
        options: [
          { label: "Yüklü", value: "Yüklü" },
          { label: "Yüklenecek", value: "Yüklenecek" },
          { label: "Hazırlanacak", value: "Hazırlanacak" }
        ],
      },
      {
        name: "source_id",
        label: "Yayın Adı",
        type: "select",
        options: examSources
          ? examSources.map(source => ({
              label: source.name,
              value: source.id
            }))
          : [],
      }
    ];
  };

const handleSubmit = async (values: QuizRepeatValues) => {
  // Get the selected quiz to extract branche_id
  const selectedQuiz = quizzesData?.find(quiz => quiz.id === quizId);
  console.log("Selected Quiz:", selectedQuiz);
  console.log("Branche ID from selected quiz:", selectedQuiz?.branche_id);
  
  const quizData = {
    program_id: values.school_levels || null,
    question_type_id: Number(values.question_type_id),
    solution_status: values.video_status === "Hazırlanacak" ? 3 : 
                    values.video_status === "Yüklenecek" ? 1 : 
                    values.video_status === "Yüklü" ? 2 : null,
    publish_date: values.result_publish_datetime,
    quiz_end_date: values.quiz_end_date,
    branche_id: selectedQuiz?.branche_id || 1,
    quiz_no: values.quiz_no,
    short_name: null,
    name: values.quiz_name,
    quiz_date: values.result_publish_datetime,
    quiz_type_id: Number(values.quiz_type_id),
    quiz_category_id: 1,
    point_type_id: 1,
    level_id: Number(values.level_id) || 1,
    wrong_right: null,
    topic_achievement: null,
    is_print: null,
    source_id: Number(values.source_id),
    platform_id: Number(values.platform_id),
    period_id: Number(values.period_id),
    original_quiz_id: quizId || null
  };

  console.log("Quiz data:", quizData);
  
  let result;
  
  if (quizId) {
   
    const updatePayload = {
      quizId: quizId, 
      payload: quizData 
    };
    result = await updateExistingQuiz(updatePayload as any);
  } else {
    const addPayload = {
      payload: quizData 
    };
    result = await addNewQuiz(addPayload as any);
  }
  
  if (result) {
    onRefresh();
    onClose();
  }
};
  return (
    <ReusableModalForm<QuizRepeatValues>
      show={show}
      title={quizId ? "Sınavı Tekrarla" : "Sınavı Tekrarla"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={"UYGULA"}
      cancelButtonLabel="İptal"
      onClose={onClose}
      mode="double"
      error={error}
    />
  );
};

export default QuizRepeatModal;