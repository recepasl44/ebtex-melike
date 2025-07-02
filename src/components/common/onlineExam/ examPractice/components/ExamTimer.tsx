import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import TimerInfo from './TimerInfo';
import { QuizStatus } from '../types';

interface ExamTimerProps {
  initialTime?: number; // Initial time in seconds (fallback)
  perQuestion?: number;
  totalTime?: string;
  quizStatus?: QuizStatus[];
  selectedSubject?: string;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ 
  initialTime = 1800, // 30 dakika fallback
  perQuestion = 90, 
  totalTime = '30:00',
  quizStatus = [],
  selectedSubject
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  
  // Quiz status'tan dinamik süre bilgilerini al
  const currentStatus = quizStatus.find(status => status.lesson_name === selectedSubject) || quizStatus[0];
  
  // Kalan süreyi quiz_status'tan al (örn: "42 dk 44 sn" formatında)
  const parseTimeString = (timeStr: string): number => {
    if (!timeStr) return initialTime;
    
    // "42 dk 44 sn" formatını parse et
    const parts = timeStr.split(' ');
    let totalSeconds = 0;
    
    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i]);
      const unit = parts[i + 1];
      
      if (unit === 'dk') {
        totalSeconds += value * 60;
      } else if (unit === 'sn') {
        totalSeconds += value;
      }
    }
    
    return totalSeconds;
  };

  // Dinamik süre hesaplama
  const dynamicRemainingTime = currentStatus?.reminder_time 
    ? parseTimeString(currentStatus.reminder_time)
    : initialTime;
    
  const dynamicTotalTime = currentStatus?.quiz_time || totalTime;
  
  // API'den dinamik soru süresi hesaplama
  const dynamicPerQuestion = currentStatus?.average_time 
    ? parseTimeString(currentStatus.average_time)
    : perQuestion;

  const [remainingTime, setRemainingTime] = useState<number>(dynamicRemainingTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Quiz status değiştiğinde timer'ı güncelle
  useEffect(() => {
    setRemainingTime(dynamicRemainingTime);
  }, [dynamicRemainingTime, selectedSubject]);
  
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          alert(`${selectedSubject || 'Sınav'} süresi doldu. Sınav sonlandırılıyor.`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [selectedSubject]);

  const formatTime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TimerInfo
      perQuestion={dynamicPerQuestion}
      remainingDynamic={formatTime(remainingTime)}
      total={dynamicTotalTime}
      isDarkMode={isDarkMode}
    />
  );
};

export default React.memo(ExamTimer);