import React from "react";
import { Box, Typography } from "@mui/material";

interface TimerInfoProps {
  perQuestion: number;
  remainingDynamic: string;
  total: string;
  isDarkMode?: boolean;
}

const TimerInfo: React.FC<TimerInfoProps> = ({ perQuestion, remainingDynamic, total, isDarkMode = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: { xs: "wrap", sm: "nowrap" },
      gap: 2
    }}
  >
    <InfoLabel label="Soru Süresi:" value={`${perQuestion} s`} isDarkMode={isDarkMode} />
    <InfoLabel label="Kalan Süre:" value={remainingDynamic} isDarkMode={isDarkMode} />
    <InfoLabel label="Toplam Süre:" value={total} isDarkMode={isDarkMode} />
  </Box>
);

const InfoLabel: React.FC<{ label: string; value: string; isDarkMode?: boolean }> = ({ label, value, isDarkMode = false }) => (
  <Box sx={{ display: "flex", alignItems: "center", padding: "4px 8px" }}>
    <Typography
      sx={{
        color: isDarkMode ? "#E5E7EB" : "#27313C",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: 600,
        mr: 1,
        textWrap: "nowrap"
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: "inline-flex",
        height: "26px",
        padding: "0px 10px",
        alignItems: "center",
        borderRadius: "10px",
        background: isDarkMode ? "#404040" : "#F8F9F9"
      }}
    >
      <Typography
        sx={{
          color: isDarkMode ? "#E5E7EB" : "#27313C",
          fontFamily: "Inter",
          fontSize: "15px",
          fontWeight: 400
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default TimerInfo;
