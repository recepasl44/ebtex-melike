import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface QuestionReviewModalProps {
  open: boolean;
  onClose: () => void;
  questions: any[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  currentQuestionImage?: string;
  answers: Record<number, string>;
  savedQuestions: Record<number, boolean>;
  selectedSubject: string;
  subjects?: string[];
  onSubjectChange?: (subject: string) => void;
}

const QuestionReviewModal: React.FC<QuestionReviewModalProps> = ({
  open,
  onClose,
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  currentQuestionImage,
  answers,
  savedQuestions,
  selectedSubject,
  subjects = [],
  onSubjectChange
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === 'dark'
  );

  const getQuestionTooltip = (questionIndex: number, questionId: number) => {
    const hasAnswer = answers[questionId];
    const isSaved = savedQuestions[questionId];
    const initialStatus = questions[questionIndex]?.status === '1';

    if (hasAnswer) {
      return `Soru ${questionIndex + 1}: Cevaplandı (${hasAnswer}) - Yeşil`;
    } else if (isSaved || initialStatus) {
      return `Soru ${questionIndex + 1}: Geri dönülecek soru - Mor`;
    } else {
      return `Soru ${questionIndex + 1}: Boş geçilen - Kırmızı`;
    }
  };

  const getQuestionColor = (questionIndex: number, questionId: number) => {
    const hasAnswer = answers[questionId];
    const isSaved = savedQuestions[questionId];
    const initialStatus = questions[questionIndex]?.status === '1';

    if (hasAnswer) return '#10B981'; // yeşil
    else if (isSaved || initialStatus) return '#8B5CF6'; // mor
    else return '#EF4444'; // kırmızı
  };

  const handleQuestionClick = (index: number) => {
    onQuestionSelect(index);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '900px',
          height: '70vh',
          bgcolor: isDarkMode ? '#2d2d2d' : '#fff',
          borderRadius: '12px',
          outline: 'none',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Başlık */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E2E8F0'}`
          }}
        >
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: 700,
              color: isDarkMode ? '#E5E7EB' : '#000',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Soruincele
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              width: '28px',
              height: '28px',
              color: isDarkMode ? '#E5E7EB' : '#666',
              '&:hover': { 
                backgroundColor: isDarkMode ? '#404040' : '#f5f5f5' 
              }
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Ders Seçimi */}
        <Box sx={{ padding: '12px 24px 0 24px' }}>
          {subjects.length > 1 ? (
            <FormControl sx={{ width: 200, mb: 2 }}>
              <Select
                value={selectedSubject}
                onChange={(e) => onSubjectChange?.(e.target.value)}
                IconComponent={ExpandMoreIcon}
                size="small"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: isDarkMode ? '#404040' : '#fff',
                      border: `1px solid ${isDarkMode ? '#525252' : '#E2E8F0'}`,
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }
                  }
                }}
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? '#404040' : '#F9FAFB',
                  color: isDarkMode ? '#E5E7EB' : '#000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#525252' : '#E2E8F0'
                  },
                  '& .MuiSelect-select': { px: 2, py: 1 },
                  '& .MuiSvgIcon-root': {
                    color: isDarkMode ? '#E5E7EB' : '#666'
                  }
                }}
              >
                {subjects.map((subject) => (
                  <MenuItem
                    key={subject}
                    value={subject}
                    sx={{
                      color: isDarkMode ? '#E5E7EB' : '#000',
                      backgroundColor: isDarkMode ? '#404040' : '#fff',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#525252' : '#f5f5f5'
                      },
                      '&.Mui-selected': {
                        backgroundColor: isDarkMode ? '#6366F1' : '#E0E7FF',
                        color: isDarkMode ? '#fff' : '#4338CA'
                      }
                    }}
                  >
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: isDarkMode ? '#E5E7EB' : '#333',
                mb: 1
              }}
            >
              {selectedSubject}
            </Typography>
          )}
        </Box>

        {/* İçerik */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            px: 3,
            pb: 3,
            gap: '24px',
            overflow: 'hidden'
          }}
        >
          {/* Soru Rehberi */}
          <Box sx={{ width: '280px', mt: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px'
              }}
            >
              {questions.map((question, index) => {
                const id = question.id;
                return (
                  <Tooltip
                    key={id}
                    title={getQuestionTooltip(index, id)}
                    placement="top"
                  >
                    <Box
                      onClick={() => handleQuestionClick(index)}
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      {index + 1}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '4px',
                          right: '4px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: getQuestionColor(index, id)
                        }}
                      />
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>

          {/* Soru Görseli */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDarkMode ? '#404040' : '#F8F9FA',
              borderRadius: '6px',
              border: `1px solid ${isDarkMode ? '#525252' : '#E2E8F0'}`,
              padding: '12px'
            }}
          >
            {currentQuestionImage ? (
              <Box
                component="img"
                src={currentQuestionImage}
                alt={`Soru ${currentQuestionIndex + 1}`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
              />
            ) : (
              <Typography
                sx={{
                  fontSize: '12px',
                  color: isDarkMode ? '#9CA3AF' : '#666',
                  textAlign: 'center'
                }}
              >
                Bu soru için görüntü bulunamadı.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default QuestionReviewModal;
