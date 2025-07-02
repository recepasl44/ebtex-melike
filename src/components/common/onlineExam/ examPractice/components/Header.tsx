import React from 'react';
import { Box, Typography } from '@mui/material';
interface HeaderProps {
  examTitle: string;
  logoUrl: string;
  quizName: string;
  platformName: string;
}
const Header: React.FC<HeaderProps> = ({ examTitle, logoUrl, quizName, platformName }) => (
  <Box
    sx={{
      bgcolor: '#5C67F7',
      color: 'white',
      p: 2,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '44px',
      flexShrink: 0,
      boxSizing: 'border-box',
      borderRadius: '8px 8px 0 0',
    }}
  >
    <Box component="img" src={logoUrl} alt="Logo" sx={{ height: 24, mr: 15.5, ml: 1, width: 'auto' }} />
    <Typography
      sx={{
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        mr: 2,
      }}
      variant="h6"
    >
      {examTitle}
    </Typography>
    <Typography sx={{ color: '#FFF', fontSize: '14px', lineHeight: 'normal' }}>
      {platformName} / {quizName}
    </Typography>
  </Box>
);

export default Header;
