import React from 'react';
import { Box, Button, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';

interface TabsProps {
  tabs: string[];
  active: string; // Boş string hiçbir tab aktif değil anlamına gelir
  onChange: (t: string) => void;
  timer: React.ReactNode;
  subjects: string[];
  selectedSubject: string;
  onSelectSubject: (subject: string) => void; 
}

const Tabs: React.FC<TabsProps> = ({
  active,
  onChange,
  timer,
  tabs,
  subjects,
  selectedSubject,
  onSelectSubject
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );

  return (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: { xs: 'wrap', md: 'nowrap' },
    position: 'relative',
    zIndex: 5
  }}>
    {/* Left side with tabs */}
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexShrink: 0
    }}>
      {tabs.map(label => (
        <Button
          key={label}
          variant={active === label ? 'contained' : 'outlined'}
          onClick={() => onChange(label)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
            textWrap: 'nowrap',
            textTransform: 'none',
            height: '42px',
            width: '115px',
            borderRadius: '5px',
            padding: '6px 16px',
            fontFamily: 'Poppins',
            fontSize: '13px',
            fontWeight: 600,
            border: 'none',
            ...(active === label ? {
              background: '#9E5CF7',
              color: '#FFFFFF',
            } : {
              background: '#9E5CF733',
              color: '#9E5CF7',
            }),
            '&:hover': {
              bgcolor: active === label ? '#8a52dd' : 'rgba(158, 92, 247, 0.25)',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>

    {/* Right side with timer and subject selector */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {timer}

      <Select
        value={selectedSubject}
        onChange={(e) => {
          onSelectSubject(e.target.value as string);
        }}
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
          width: '250px',
          height: '49.182px',
          flexShrink: 0,
          borderRadius: '10px',
          background: isDarkMode ? '#404040' : '#F8F9F9',
          color: isDarkMode ? '#E5E7EB' : '#000',
          '.MuiOutlinedInput-notchedOutline': { 
            borderColor: isDarkMode ? '#525252' : '#ddd' 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isDarkMode ? '#6B7280' : '#bbb'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: isDarkMode ? '#8B5CF6' : '#6366F1'
          },
          '& .MuiSvgIcon-root': {
            color: isDarkMode ? '#E5E7EB' : '#666'
          }
        }}
      >
        {subjects.map((subj) => (
          <MenuItem 
            key={subj} 
            value={subj}
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
            {subj}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </Box>
  );
};

export default Tabs;