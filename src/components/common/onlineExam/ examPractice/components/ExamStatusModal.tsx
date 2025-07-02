import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface QuizStatus {
  lesson_name: string;
  question_number: number;
  response: number;
  reminder: number;
  start_time: string;
  end_time: string;
  quiz_time: string;
  elapsed_time: string;
  reminder_time: string;
  average_time: string;
}

interface ExamStatusModalProps {
  open: boolean;
  onClose: () => void;
  quizStatus: QuizStatus[];
  selectedSubject: string;
  onSubjectChange?: (subject: string) => void;
}

const ExamStatusModal: React.FC<ExamStatusModalProps> = ({
  open,
  onClose,
  quizStatus,
  selectedSubject,
  onSubjectChange
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  
  const currentStatus = quizStatus.find(s => s.lesson_name === selectedSubject);
  if (!currentStatus) return null;

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: 600,
          bgcolor: isDarkMode ? '#2d2d2d' : '#fff',
          border: `1px solid ${isDarkMode ? '#404040' : '#E2E8F0'}`,
          borderRadius: 4, // Border radius artırıldı (24px'e eşdeğer)
          p: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: isDarkMode ? '#E5E7EB' : '#666',
            '&:hover': { backgroundColor: isDarkMode ? '#404040' : '#f5f5f5' }
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Typography sx={{ fontSize: 32, fontWeight: 700, mb: 4, color: isDarkMode ? '#E5E7EB' : '#000' }}>SınavDurum</Typography>

        <FormControl sx={{ width: 200, mb: 4 }}>
          <Select
            value={selectedSubject}
            onChange={(e) => onSubjectChange?.(e.target.value)}
            IconComponent={ExpandMoreIcon}
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
              fontSize: 16,
              fontWeight: 400,
              borderRadius: 2,
              bgcolor: isDarkMode ? '#404040' : '#F9FAFB',
              color: isDarkMode ? '#E5E7EB' : '#000',
              '& .MuiOutlinedInput-notchedOutline': { 
                borderColor: isDarkMode ? '#525252' : '#E2E8F0' 
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#6B7280' : '#D1D5DB'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#8B5CF6' : '#6366F1'
              },
              '& .MuiSelect-select': { px: 2, py: 1.5 },
              '& .MuiSvgIcon-root': {
                color: isDarkMode ? '#E5E7EB' : '#666'
              }
            }}
          >
            {quizStatus.map((status) => (
              <MenuItem 
                key={status.lesson_name} 
                value={status.lesson_name}
                sx={{
                  color: isDarkMode ? '#E5E7EB' : '#000',
                  backgroundColor: isDarkMode ? '#404040' : '#fff',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#525252' : '#f5f5f5'
                  },
                  '&.Mui-selected': {
                    backgroundColor: isDarkMode ? '#6366F1' : '#E0E7FF',
                    color: isDarkMode ? '#fff' : '#4338CA',
                    '&:hover': {
                      backgroundColor: isDarkMode ? '#5B21B6' : '#C7D2FE'
                    }
                  }
                }}
              >
                {status.lesson_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{
          border: `1px solid ${isDarkMode ? '#525252' : '#E2E8F0'}`,
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <Table sx={{ 
            borderCollapse: 'collapse', 
            width: '100%'
          }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: isDarkMode ? '#404040' : '#F9FAFB' }}>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Soru Sayısı</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Yanıtlanan</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Kalan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.question_number}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.response}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.reminder}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: isDarkMode ? '#404040' : '#F9FAFB' }}>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Başlama Zamanı</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Bitiş Zamanı</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Sınav Süresi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.start_time}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.end_time}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.quiz_time}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: isDarkMode ? '#404040' : '#F9FAFB' }}>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Geçen Süresi</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Kalan Süre</TableCell>
              <TableCell sx={{...headerCell, backgroundColor: isDarkMode ? '#404040' : '#F9FAFB', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>Ortalama Süre</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.elapsed_time}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.reminder_time}</TableCell>
              <TableCell sx={{...bodyCell, backgroundColor: isDarkMode ? '#2d2d2d' : '#fff', color: isDarkMode ? '#E5E7EB' : '#000', borderColor: isDarkMode ? '#525252' : '#E2E8F0'}}>{currentStatus.average_time}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </Box>
      </Box>
    </Modal>
  );
};

const headerCell = {
  fontWeight: 600,
  fontSize: 16,
  color: '#000',
  textAlign: 'center' as const,
  border: '1px solid #E2E8F0',
  py: 1.5
};

const bodyCell = {
  fontWeight: 400,
  fontSize: 16,
  color: '#000',
  textAlign: 'center' as const,
  border: '1px solid #E2E8F0',
  py: 2
};

export default ExamStatusModal;
