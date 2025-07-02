import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Question } from '../types';

interface SidebarProps {
  questions: Question[]; 
  current: number;
  answered: Record<number, boolean>;
  answers: Record<number, string>;
  onJump: (i: number) => void;
  open: boolean;
  onToggleSidebar: () => void;
  options: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  questions,
  current,
  answers,
  open,
  onToggleSidebar,
  onJump,
  options,
  answered
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );

  if (!open) {
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: isDarkMode ? '#2d2d2d' : 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <IconButton
          onClick={onToggleSidebar}
          sx={{
            position: 'absolute',
            left: '-25px',
            top: '17px',
            bgcolor: isDarkMode ? '#2d2d2d' : 'white',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
            width: '36px',
            height: '36px',
            zIndex: 1001,
            color: isDarkMode ? '#E5E7EB' : '#000',
            '&:hover': { bgcolor: isDarkMode ? '#404040' : '#f8f8f8' }
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          alignItems: 'center',
          width: '100%' 
        }}>
          {questions.map((_, i) => {
            const isActive = current === i;
            return (
              <Box
                key={i}
                onClick={() => onJump(i)}
                sx={{
                  width: 36,
                  height: 34,
                  borderRadius: '5px',
                  bgcolor: isActive 
                    ? '#5C67F7' 
                    : (isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(92, 103, 247, 0.20)'),
                  color: isActive 
                    ? 'white' 
                    : (isDarkMode ? '#E5E7EB' : '#5C67F7'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                {i + 1}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: isDarkMode ? '#2d2d2d' : 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <IconButton
        onClick={onToggleSidebar}
        sx={{
          position: 'absolute',
          left: '-35px',
          top: '24px',
          bgcolor: isDarkMode ? '#2d2d2d' : 'white',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          width: '36px',
          height: '36px',
          zIndex: 1001,
          color: isDarkMode ? '#E5E7EB' : '#000',
          '&:hover': { bgcolor: isDarkMode ? '#404040' : '#f8f8f8' }
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 1,
          py: 0.5,
          mt: 1
        }}
      >
        {questions.map((question, i) => {
          const selectedAnswer = answers[question.id];
          const isActive = current === i;
          const isEvenRow = i % 2 === 1;

          return (
            <Box
              key={i}
              onClick={() => onJump(i)}
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
                bgcolor: isActive 
                  ? (isDarkMode ? '#404040' : '#f5f5ff')
                  : isEvenRow 
                    ? (isDarkMode ? '#353535' : '#F9FAFC')
                    : (isDarkMode ? '#2d2d2d' : 'white'),
                cursor: 'pointer',
                '&:hover': { 
                  bgcolor: isActive 
                    ? (isDarkMode ? '#525252' : '#f5f5ff')
                    : isEvenRow 
                      ? (isDarkMode ? '#404040' : '#F0F2F5')
                      : (isDarkMode ? '#353535' : '#f9f9f9')
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <Box 
                  sx={{
                    width: 36,
                    height: 34,
                    borderRadius: '5px',
                    bgcolor: isActive 
                      ? '#5C67F7' 
                      : (isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(92, 103, 247, 0.20)'),
                    color: isActive 
                      ? 'white' 
                      : (isDarkMode ? '#E5E7EB' : '#5C67F7'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  {i + 1}
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex',
                width: '314px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px'
              }}>
                {options.map(option => {
                  const isSelected = selectedAnswer === option;
                  return (
                    <Box
                      key={option}
                      sx={{
                        width: '41px',
                        height: '41px',
                        borderRadius: '74.242px',
                        border: `1px solid ${isDarkMode ? '#525252' : '#E6EFF3'}`,
                        backgroundColor: isSelected 
                          ? '#4D5875' 
                          : (isDarkMode ? '#2d2d2d' : '#FFF'),
                        color: isSelected 
                          ? '#FFF' 
                          : (isDarkMode ? '#E5E7EB' : '#383853'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Inter',
                        fontSize: '22.273px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: isSelected 
                            ? '#4D5875' 
                            : (isDarkMode ? '#6B7280' : '#D1D5DB'),
                          backgroundColor: isSelected 
                            ? '#4D5875' 
                            : (isDarkMode ? '#404040' : '#F9FAFB')
                        }
                      }}
                    >
                      {option}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
