import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  Divider 
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QuizStatus } from '../types';

interface ExamFinishModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  quizStatus: QuizStatus[];
  selectedSubject: string;
}

const ExamFinishModal: React.FC<ExamFinishModalProps> = ({
  open,
  onClose,
  onConfirm,
  quizStatus,
  selectedSubject
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Seçili dersin istatistiklerini al
  const currentStatus = quizStatus.find(status => status.lesson_name === selectedSubject) || quizStatus[0];

  // Modal kapandığında state'i sıfırla
  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  // Sınavı sonlandır butonu
  const handleConfirm = () => {
    setShowSuccess(true);
    // 2 saniye sonra modal'ı kapat
    setTimeout(() => {
      setShowSuccess(false);
      onConfirm();
    }, 2000);
  };

  if (!currentStatus) return null;

  // Başarı mesajı ekranı
  if (showSuccess) {
    return (
      <Dialog
        open={open}
        onClose={() => {}} // Başarı mesajı sırasında kapatılmasın
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px', // Border radius artırıldı
            p: 3,
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#fff'
          }
        }}
      >
        <DialogContent sx={{ py: 4 }}>
          <CheckCircleIcon 
            sx={{ 
              fontSize: '80px', 
              color: '#10B981', 
              mb: 2 
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: isDarkMode ? '#E5E7EB' : '#2D3748',
              mb: 1
            }}
          >
            Sınav Başarıyla Sonlandırıldı!
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: isDarkMode ? '#9CA3AF' : '#4A5568' }}
          >
            Sonuçlarınız kaydedildi.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  // Onay ekranı
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px', // Border radius artırıldı
          p: 2,
          backgroundColor: isDarkMode ? '#2d2d2d' : '#fff'
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        fontWeight: 600,
        fontSize: '24px',
        color: isDarkMode ? '#E5E7EB' : '#2D3748'
      }}>
        Sınavı Sonlandır
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="body1" sx={{ 
            mb: 3, 
            color: isDarkMode ? '#9CA3AF' : '#4A5568' 
          }}>
            Sınavı sonlandırmak istediğinizden emin misiniz?
          </Typography>
          
          <Box sx={{ 
            background: isDarkMode ? '#404040' : '#F7FAFC', 
            borderRadius: '12px', // Border radius artırıldı
            p: 2,
            border: `1px solid ${isDarkMode ? '#525252' : '#E2E8F0'}`
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              color: isDarkMode ? '#E5E7EB' : '#2D3748'
            }}>
              {currentStatus.lesson_name} - Sınav Özeti
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? '#9CA3AF' : 'text.secondary' 
              }}>
                Toplam Soru:
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{
                color: isDarkMode ? '#E5E7EB' : '#000'
              }}>
                {currentStatus.question_number}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? '#9CA3AF' : 'text.secondary' 
              }}>
                Cevaplanmış:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#38A169">
                {currentStatus.response}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? '#9CA3AF' : 'text.secondary' 
              }}>
                Kalan:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#E53E3E">
                {currentStatus.reminder}
              </Typography>
            </Box>
            
            <Divider sx={{ 
              my: 2,
              borderColor: isDarkMode ? '#525252' : '#E2E8F0'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? '#9CA3AF' : 'text.secondary' 
              }}>
                Geçen Süre:
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{
                color: isDarkMode ? '#E5E7EB' : '#000'
              }}>
                {currentStatus.elapsed_time}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? '#9CA3AF' : 'text.secondary' 
              }}>
                Ortalama Süre:
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{
                color: isDarkMode ? '#E5E7EB' : '#000'
              }}>
                {currentStatus.average_time}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            minWidth: '120px',
            borderRadius: '12px', // Border radius artırıldı
            textTransform: 'none',
            fontSize: '16px',
            color: isDarkMode ? '#E5E7EB' : '#000',
            borderColor: isDarkMode ? '#525252' : '#E2E8F0',
            '&:hover': {
              borderColor: isDarkMode ? '#6B7280' : '#D1D5DB',
              backgroundColor: isDarkMode ? '#404040' : '#f5f5f5'
            }
          }}
        >
          İptal
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          sx={{
            minWidth: '120px',
            borderRadius: '12px', // Border radius artırıldı
            textTransform: 'none',
            fontSize: '16px'
          }}
        >
          Sınavı Sonlandır
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamFinishModal;
