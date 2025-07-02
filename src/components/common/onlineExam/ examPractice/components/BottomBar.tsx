import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface BottomBarProps {
  onBack: () => void;
  onNext: () => void;
  onSelect: (l: string) => void;
  onSave?: () => void; // Kaydet butonu için
  selected?: string;
  options: string[];
  isSaved?: boolean; // Mevcut sorunun kaydedilip kaydedilmediği
  hasAnswer?: boolean; // Mevcut sorunun cevabının olup olmadığı
  isDarkMode?: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ 
  onBack, 
  onNext, 
  onSelect, 
  onSave,
  selected, 
  options,
  isSaved = false,
  hasAnswer = false,
  isDarkMode = false
}) => {
  // Kaydet butonunun rengini belirleme fonksiyonu
  const getSaveButtonColor = () => {
    if (hasAnswer) {
      // Cevaplandı - Yeşil
      return {
        backgroundColor: '#10B981',
        color: '#fff',
        border: 'none',
        hoverColor: '#059669'
      };
    } else if (isSaved) {
      // Geri dönülecek soru - Mor
      return {
        backgroundColor: '#8B5CF6',
        color: '#fff',
        border: 'none',
        hoverColor: '#7C3AED'
      };
    } else {
      // Boş geçilen - Kırmızı
      return {
        backgroundColor: '#EF4444',
        color: '#fff',
        border: 'none',
        hoverColor: '#DC2626'
      };
    }
  };

  // Kaydet butonunun tooltip metnini belirleme fonksiyonu
  const getSaveTooltipText = () => {
    if (hasAnswer) {
      return "Yeşil: Bu soru cevaplanmış";
    } else if (isSaved) {
      return "Mor: Geri dönülecek soru olarak işaretli";
    } else {
      return "Kırmızı: Soru kaydedilmemiş / boş geçilen";
    }
  };

  const saveButtonStyle = getSaveButtonColor();

  return (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: isDarkMode ? '#2d2d2d' : '#f5f5f5',
      borderTop: `1px solid ${isDarkMode ? '#525252' : '#e0e0e0'}`,
      py: 1.5,
      px: 3,
      height: '46px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'width 0.3s ease',
    }}
  >
    {/* Back button with new styling */}
    <Box 
      onClick={onBack}
      sx={{ 
        display: 'flex',
        padding: '4px 3px 4px 7px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1px',
        aspectRatio: '5/2',
        borderRadius: '44px',
        background: isDarkMode ? 'rgba(158, 92, 247, 0.25)' : 'rgba(158, 92, 247, 0.15)',
        cursor: 'pointer',
        '&:hover': {
          background: isDarkMode ? 'rgba(158, 92, 247, 0.35)' : 'rgba(158, 92, 247, 0.25)'
        }
      }}
    >
      <KeyboardArrowLeftIcon sx={{ color: '#9E5CF7' }} />
      <Typography 
        sx={{
          color: '#9E5CF7',
          textAlign: 'center',
          fontFamily: 'Poppins',
          fontSize: '13px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          textDecoration: 'underline',
          mr: 1,
        }}
      >
        Geri
      </Typography>
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Tooltip title={getSaveTooltipText()} placement="top">
        <Box 
          onClick={onSave}
          sx={{ 
            color: saveButtonStyle.color,
            backgroundColor: saveButtonStyle.backgroundColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            width: 36, 
            height: 36,
            borderRadius: '50%',
            border: saveButtonStyle.border,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: saveButtonStyle.hoverColor,
            }
          }}
        >
          <BookmarkBorderIcon />
        </Box>
      </Tooltip>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        {options.map(option => (
          <Box
            key={option}
            onClick={() => onSelect(option)}
            sx={{ 
              width: 36, 
              height: 36, 
              borderRadius: '50%', 
              bgcolor: selected === option ? '#6366f1' : 'transparent',
              color: selected === option ? 'white' : (isDarkMode ? '#E5E7EB' : '#333'),
              border: '1px solid',
              borderColor: selected === option ? '#6366f1' : (isDarkMode ? '#525252' : '#ccc'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: selected === option ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#6366f1',
                backgroundColor: selected === option ? '#6366f1' : 'rgba(99, 102, 241, 0.1)'
              }
            }}
          >
            {option}
          </Box>
        ))}
      </Box>
    </Box>
    
    {/* Forward button with new styling */}
    <Box 
      onClick={onNext}
      sx={{ 
        display: 'flex',
        padding: '4px 7px 4px 3px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1px',
        aspectRatio: '5/2',
        borderRadius: '44px',
        background: isDarkMode ? 'rgba(158, 92, 247, 0.25)' : 'rgba(158, 92, 247, 0.15)',
        cursor: 'pointer',
        '&:hover': {
          background: isDarkMode ? 'rgba(158, 92, 247, 0.35)' : 'rgba(158, 92, 247, 0.25)'
        }
      }}
    >
      <Typography 
        sx={{
          color: '#9E5CF7',
          textAlign: 'center',
          fontFamily: 'Poppins',
          fontSize: '13px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal',
          textDecoration: 'underline',
          ml: 1,
        }}
      >
        İleri
      </Typography>
      <KeyboardArrowRightIcon sx={{ color: '#9E5CF7' }} />
    </Box>
  </Box>
  );
};

export default BottomBar;