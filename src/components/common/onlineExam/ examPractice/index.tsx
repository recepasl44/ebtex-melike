import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../../store';
import Header from './components/Header';
import Tabs from './components/Tabs';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import ExamTimer from './components/ExamTimer';
import ExamFinishModal from './components/ExamFinishModal';
import ExamStatusModal from './components/ExamStatusModal';
import QuestionReviewModal from './components/QuestionReviewModal';
import { Question } from './types';

// Gerçek API response - Tam entegrasyon için hazır veri yapısı
const examData = {
  // Gerçek API response - useQuizQuestionsTable'dan gelecek tam format
  data: [
    {
      id: 3,
      quiz_id: 2,
      quiz: {
        id: 2,
        quiz_no: "234234",
        quiz_name: "YKS Sınavı",
        platform: {
          id: 1,
          name: "Ebtek"
        }
      },
      question_id: 2,
      question: {
        id: 2,
        image_path: "https://cdn1.ntv.com.tr/gorsel/WqKwuwuHLEOksb4c5u3Sfg.jpg?width=1000&mode=both&scale=both&v=1270989216000",
        curriculums: [
          {
            lesson: {
              id: 1,
              name: "Türkçe"
            }
          }
        ]
      },
      question_number: 1
    }
  ],
  links: {
    first: "http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=2&page=1",
    last: "http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=2&page=3",
    prev: "http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=2&page=1",
    next: "http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=2&page=3"
  },
  meta: {
    current_page: 2,
    from: 2,
    last_page: 35,
    per_page: 1,
    to: 2,
    total: 35
  },
  lessons: [
    {
      id: 1,
      name: "Türkçe",
      questions: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        quiz_question_status: i < 10 ? "1" : "0", // İlk 10 soru cevaplanmış
        image_path: `https://cdn1.ntv.com.tr/gorsel/question-${i + 1}.jpg`
      }))
    },
    {
      id: 2,
      name: "Matematik",
      questions: Array.from({ length: 15 }, (_, i) => ({
        id: i + 21, // 21'den başlayarak 35'e kadar
        quiz_question_status: "0",
        image_path: `https://cdn1.ntv.com.tr/gorsel/question-${i + 21}.jpg`
      }))
    }
  ],
  quiz_status: [
    {
      lesson_name: "Türkçe",
      question_number: 20,
      response: 10,
      reminder: 10,
      start_time: "22:05:33",
      end_time: "22:15:55",
      quiz_time: "165dk",
      elapsed_time: "23 dk 43 sn",
      reminder_time: "42 dk 44 sn",
      average_time: "23 sn"
    },
    {
      lesson_name: "Matematik",
      question_number: 15,
      response: 0,
      reminder: 15,
      start_time: "22:15:55",
      end_time: "22:35:55",
      quiz_time: "120dk",
      elapsed_time: "0 dk 0 sn",
      reminder_time: "120 dk 0 sn",
      average_time: "30 sn"
    }
  ]
};

// Mock function - Gerçek API'yi simüle ediyor (useQuizQuestionsTable)
const useQuizQuestionsTableMock = (params: any) => {
  const { page, quiz_id } = params;
  
  // Gerçek API response formatında mock data
  const mockApiResponse = {
    data: [
      {
        id: page, // Her sayfa farklı bir quiz question id'si
        quiz_id: quiz_id || 2,
        question_id: page,
        question: {
          id: page,
          writer_id: 1,
          program_id: 2,
          level_id: 1,
          question_type_id: 1,
          question_category_id: 1,
          question_difficulty_id: 1,
          page_type_id: 1,
          page_position_id: 1,
          suitability_score: 10,
          relevance_id: 1,
          image_path: `https://cdn1.ntv.com.tr/gorsel/question-${page}.jpg`,
          curriculums: [
            {
              lesson: {
                name: page <= 20 ? "Türkçe" : "Matematik"
              }
            }
          ]
        },
        question_number: page,
        quiz: {
          quiz_name: "YKS Sınavı",
          quiz_no: "234234",
          platform: {
            name: "Ebtek"
          }
        }
      }
    ],
    links: {
      first: `http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=${quiz_id}&page=1`,
      last: `http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=${quiz_id}&page=35`,
      prev: page > 1 ? `http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=${quiz_id}&page=${page - 1}` : null,
      next: page < 35 ? `http://api.ebtex.com.tr/api/v1/quizquestions?paginate=1&quiz_id=${quiz_id}&page=${page + 1}` : null
    },
    meta: {
      current_page: page,
      from: page,
      last_page: 35, // 20 Türkçe + 15 Matematik = 35 toplam soru
      per_page: 1,
      to: page,
      total: 35
    }
  };

  return {
    data: mockApiResponse.data,
    links: mockApiResponse.links,
    meta: mockApiResponse.meta,
    loading: false,
    error: null
  };
};

const ExamPractice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quizId = id ?? null;
  
  // URL'den gelen parametreleri al
  const urlParams = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);
  
  // Dark mode desteği
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  
  const [selectedSubject, setSelectedSubject] = useState<string>('Türkçe');
  const [tab, setTab] = useState<string>(''); // Hiçbir tab başlangıçta aktif değil
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [ans, setAns] = useState<Record<number, string>>({});
  const [savedQuestions, setSavedQuestions] = useState<Record<number, boolean>>({}); // Kaydet butonuna basılan sorular
  const [page, setPage] = useState<number>(1);
  const [finishModalOpen, setFinishModalOpen] = useState<boolean>(false);
  const [examStatusModalOpen, setExamStatusModalOpen] = useState<boolean>(false);
  const [soruInceleModalOpen, setSoruInceleModalOpen] = useState<boolean>(false);
  const PAGE_SIZE = 1; // Her sayfada bir soru (API pagination yapısı)
  
  // Mevcut dersleri examData'dan al
  const availableSubjects = useMemo(() => 
    examData.lessons.map(lesson => lesson.name), []
  );
  
  // API'den gerçek veri çekmek için kullanılacak - şu an examData'yı kullanıyoruz
  const {
    data: currentApiQuestion,
    meta,
    loading
  } = useQuizQuestionsTableMock({
    quiz_id: quizId,
    page,
    pageSize: PAGE_SIZE,
    enabled: Boolean(quizId),
  });

  // Production'da bu şekilde kullanılacak:
  // import { useQuizQuestionsTable } from '../../../hooks/quizquestions/useList';
  // const { data: apiData, meta, loading } = useQuizQuestionsTable({
  //   quiz_id: quizId,
  //   page,
  //   pageSize: PAGE_SIZE,
  //   enabled: Boolean(quizId),
  // });

  // API'den gelen mevcut soru veya examData'dan varsayılan soru
  const currentQuestion = useMemo(() => {
    // Production'da API'den gelecek
    if (currentApiQuestion?.[0]) {
      return currentApiQuestion[0];
    }
    // Şu an examData'dan örnek soru
    return examData.data[0] || null;
  }, [currentApiQuestion]);
  const questionId = useMemo(() => currentQuestion?.question_id ?? null, [currentQuestion]);
  
  // Mevcut sorunun resim yolu
  const imagePath = useMemo(() => 
    currentQuestion?.question?.image_path || null,
  [currentQuestion]);

  // API'den gelen quiz bilgilerini al (dinamik header için)
  const quizInfo = useMemo(() => {
    if (currentQuestion?.quiz) {
      return {
        quizName: currentQuestion.quiz.quiz_name || "YKS Sınavı",
        platformName: currentQuestion.quiz.platform?.name || "Ebtek"
      };
    }
    return {
      quizName: "YKS Sınavı",
      platformName: "Ebtek"
    };
  }, [currentQuestion]);
  
  // Sidebar için tüm soruları oluştur (examData'dan)
  const allQuestions = useMemo((): Question[] => {
    const selectedLesson = examData.lessons.find(lesson => lesson.name === selectedSubject);
    if (!selectedLesson) return [];
    
    return selectedLesson.questions.map(question => ({
      id: question.id,
      subject: selectedLesson.name,
      imageUrl: question.image_path,
      status: question.quiz_question_status
    }));
  }, [selectedSubject]);

  const handleTabChange = useCallback((newTab: string) => {
    if (newTab === 'Sonlandır') {
      setFinishModalOpen(true);
      setTab(newTab); // Tab state'ini güncelle
    } else if (newTab === 'Sınav Durum') {
      setExamStatusModalOpen(true);
      setTab(newTab); // Tab state'ini güncelle
    } else if (newTab === 'Soru İncele') {
      setSoruInceleModalOpen(true); // Modal'ı aç
      setTab(newTab); // Tab state'ini güncelle
    } else if (newTab === 'Soru Değiştir') {
      // Quiz verilerinden parametreleri çıkar ve soru değiştir sayfasına git
      const params = new URLSearchParams();
      
      // URL'den gelen parametreleri ekle
      Object.entries(urlParams).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      // Lesson bilgisini al
      const lesson = currentQuestion?.question?.curriculums?.[0]?.lesson;
      if (lesson && 'id' in lesson) {
        params.append('lesson_id', String(lesson.id));
      }
      
      if (currentQuestion?.quiz_id) {
        params.append('quiz_id', String(currentQuestion.quiz_id));
      }
      
      navigate(`/online-exam/question-change?${params.toString()}`);
    } else {
      setTab(newTab);
    }
  }, [urlParams, navigate, currentQuestion]);

  const handleFinishExam = useCallback(() => {
    // Sınavı sonlandırma işlemleri
    setFinishModalOpen(false);
    // Burada API'ye sonlandırma isteği gönderilecek
    // Başarı mesajı modal içinde gösterilecek
  }, []);

  const handleSubjectChange = useCallback((subject: string) => {
    setSelectedSubject(subject);
    // Ders değiştiğinde sayfa numarasını o dersin ilk sorusuna ayarla
    const selectedLesson = examData.lessons.find(lesson => lesson.name === subject);
    if (selectedLesson && selectedLesson.questions.length > 0) {
      const firstQuestionPage = selectedLesson.questions[0].id;
      setPage(firstQuestionPage);
    }
  }, []);

   const select = useCallback((label: string) => {
    if (!questionId) return;
    setAns(prev => {
      // Eğer aynı şık tekrar seçilirse, seçimi kaldır
      if (prev[questionId] === label) {
        const { [questionId]: removed, ...rest } = prev;
        return rest;
      }
      // Farklı şık seçilirse, güncelle
      return { ...prev, [questionId]: label };
    });
  }, [questionId]);

  // Kaydet butonu fonksiyonu
  const handleSave = useCallback(() => {
    if (!questionId) return;
    
    const currentState = savedQuestions[questionId] || false;
    const newState = !currentState;
    
    setSavedQuestions(prev => ({
      ...prev,
      [questionId]: newState
    }));
  }, [questionId, savedQuestions]);

  // Toplam soru sayısı (meta'dan veya examData'dan)
  const totalQuestions = useMemo(() => {
    if (meta?.total) return meta.total;
    return examData.lessons.reduce((total, lesson) => total + lesson.questions.length, 0);
  }, [meta]);

  const next = useCallback(() => {
    if (page < totalQuestions) {
      setPage(prev => prev + 1);
    }
  }, [page, totalQuestions]);

  const back = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const sidebarWidth = sidebarOpen ? '324px' : '70px';
  
  // Sidebar'da hangi soruların cevaplanmış olduğunu hesapla
  const answeredQuestions = useMemo(() => {
    const answered: Record<number, boolean> = {};
    
    // examData'dan gelen initial status'ları al
    examData.lessons.forEach(lesson => {
      lesson.questions.forEach((question, index) => {
        if (question.quiz_question_status === "1") {
          answered[index] = true;
        }
      });
    });
    
    // Kullanıcının verdiği cevapları da ekle
    Object.keys(ans).forEach(key => {
      const questionId = parseInt(key);
      const questionIndex = allQuestions.findIndex(q => q.id === questionId);
      if (questionIndex !== -1) {
        answered[questionIndex] = true;
      }
    });
    
    return answered;
  }, [ans, allQuestions]);

  // Sidebar'dan soru seçimi - sorunun ID'sine göre sayfa belirleme
  const handleQuestionJump = useCallback((questionIndex: number) => {
    const selectedQuestion = allQuestions[questionIndex];
    if (selectedQuestion) {
      setPage(selectedQuestion.id); // Sorunun ID'si = sayfa numarası
    }
  }, [allQuestions]);

  // Modal'dan soru seçimi - modal kapanmaz, sadece görsel güncellenir
  const handleModalQuestionSelect = useCallback((questionIndex: number) => {
    const selectedQuestion = allQuestions[questionIndex];
    if (selectedQuestion) {
      setPage(selectedQuestion.id);
      // setSoruInceleModalOpen(false); // Bu satırı kaldırdık - modal kapanmasın
    }
  }, [allQuestions]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '84vh', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
    }}>
      <Box sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: isDarkMode ? '#2d2d2d' : '#fff',
        borderBottom: isDarkMode ? '1px solid #404040' : 'none'
      }}>
        <Header 
          examTitle="YKS Sınavı"
          logoUrl="/ebtex-logo.png"
          quizName={quizInfo.quizName}
          platformName={quizInfo.platformName}
        />
        <Box sx={{ 
          px: 3, 
          py: 1, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff'
        }}>
          <Tabs
            active={tab}
            onChange={handleTabChange}
            tabs={['Sınav Durum', 'Soru İncele', 'Sonlandır', 'Soru Değiştir']}
            subjects={availableSubjects}
            selectedSubject={selectedSubject}
            onSelectSubject={handleSubjectChange}
            timer={
              <ExamTimer
                quizStatus={examData.quiz_status}
                selectedSubject={selectedSubject}
                perQuestion={90}
                totalTime={'30:00'}
              />
            }
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ 
          width: `calc(100% - ${sidebarWidth})`, 
          transition: 'width 0.3s', 
          position: 'relative',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
        }}>
          {/* Sadece soru görüntüleme alanı */}
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 2,
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
          }}>
              {loading ? (
                <CircularProgress />
              ) : imagePath ? (
                <Box 
                  component="img"
                  src={imagePath}
                  alt={`Soru ${page}`}
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              ) : (
                <Typography 
                  variant="body1"
                  sx={{ color: isDarkMode ? '#E5E7EB' : '#000' }}
                >
                  Bu soru için görüntü bulunamadı.
                </Typography>            )}
          </Box>

          {/* BottomBar - her zaman görünür */}
            <Box sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '100%', 
              zIndex: 10, 
              background: isDarkMode ? '#2d2d2d' : '#fff', 
              boxShadow: isDarkMode ? '0 -1px 3px rgba(255,255,255,0.1)' : '0 -1px 3px rgba(0,0,0,0.1)'
            }}>
              <BottomBar
                onBack={back}
                onNext={next}
                onSelect={select}
                onSave={handleSave}
                selected={questionId && ans[questionId] ? ans[questionId] : undefined}
                options={['A', 'B', 'C', 'D', 'E']}
                isSaved={questionId ? savedQuestions[questionId] || false : false}
                hasAnswer={questionId ? !!ans[questionId] : false}
                isDarkMode={isDarkMode}
              />
            </Box>
        </Box>

        <Box sx={{ width: sidebarWidth, transition: 'width 0.3s' }}>
          <Sidebar
            questions={allQuestions}
            current={allQuestions.findIndex(q => q.id === page)} // Mevcut sayfa numarasına karşılık gelen soru index'i
            answered={answeredQuestions}
            onJump={handleQuestionJump}
            open={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            answers={ans}
            options={['A', 'B', 'C', 'D', 'E']}
          />
        </Box>
      </Box>

      {/* Sınav Sonlandırma Modal'ı */}
      <ExamFinishModal
        open={finishModalOpen}
        onClose={() => {
          setFinishModalOpen(false);
          setTab(''); // Modal kapandığında hiçbir tab aktif değil
        }}
        onConfirm={handleFinishExam}
        quizStatus={examData.quiz_status}
        selectedSubject={selectedSubject}
      />

      {/* Sınav Durum Modal'ı */}
      <ExamStatusModal
        open={examStatusModalOpen}
        onClose={() => {
          setExamStatusModalOpen(false);
          setTab(''); // Modal kapandığında hiçbir tab aktif değil
        }}
        quizStatus={examData.quiz_status}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
      />

      {/* Soru İncele Modal'ı */}
      <QuestionReviewModal
        open={soruInceleModalOpen}
        onClose={() => {
          setSoruInceleModalOpen(false);
          setTab(''); // Modal kapandığında hiçbir tab aktif değil
        }}
        questions={allQuestions}
        currentQuestionIndex={allQuestions.findIndex(q => q.id === page)}
        onQuestionSelect={handleModalQuestionSelect}
        currentQuestionImage={imagePath || undefined}
        answers={ans}
        savedQuestions={savedQuestions}
        selectedSubject={selectedSubject}
        subjects={examData.lessons.map(lesson => lesson.name)}
        onSubjectChange={handleSubjectChange}
      />
    </Box>
  );
};

export default ExamPractice;