import { useEffect, useState, CSSProperties } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
} from "date-fns";
import { tr } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DateNavigationProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DateNavigation = ({
  selectedDate,
  onDateSelect,
}: DateNavigationProps) => {
  // Hafta başlangıcını tutan state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(selectedDate, { weekStartsOn: 1 }) // 1: Pazartesi
  );
  const [dateRange, setDateRange] = useState<Date[]>([]);

  // Hafta değiştiğinde tarih aralığını güncelle
  useEffect(() => {
    const weekStart = currentWeekStart;
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const dates = eachDayOfInterval({ start: weekStart, end: weekEnd });
    setDateRange(dates);
  }, [currentWeekStart]);

  // Önceki haftaya gitme işlevi
  const handlePreviousWeek = () => {
    const prevWeekStart = subWeeks(currentWeekStart, 1);
    setCurrentWeekStart(prevWeekStart);
  };

  // Sonraki haftaya gitme işlevi
  const handleNextWeek = () => {
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(nextWeekStart);
  };

  const dayMap: { [key: string]: string } = {
    Monday: "Pzt",
    Tuesday: "Sal",
    Wednesday: "Çar",
    Thursday: "Per",
    Friday: "Cum",
    Saturday: "Cmt",
    Sunday: "Paz",
  };

  const textStyle: CSSProperties = {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "normal",
    textAlign: "center",
  };

  return (
    <div className="d-flex align-items-center gap-2 my-4">
      {/* Sol ok - sabit kalacak */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          cursor: "pointer",
          width: "32px",
          height: "32px",
          minWidth: "32px", // Minimum genişliği sabitler
          flexShrink: 0, // Küçülmesini engeller
          backgroundColor: "#9E5CF726",
          borderRadius: "50%",
          zIndex: 2, // Üstte görünmesi için
        }}
        onClick={() => handlePreviousWeek()}
      >
        <FaChevronLeft />
      </div>

      {/* Tarih aralığı - kaydırmalı konteyner */}
      <div
        className="d-flex flex-grow-1 gap-2 overflow-auto"
        style={{
          overflowX: "auto", // Yatay kaydırma
          scrollbarWidth: "none", // Firefox için scroll çubuğunu gizle
          msOverflowStyle: "none", // IE için scroll çubuğunu gizle
          justifyContent: "space-between",
          WebkitOverflowScrolling: "touch", // iOS'ta pürüzsüz kaydırma
          scrollBehavior: "smooth", // Pürüzsüz kaydırma animasyonu
        }}
      >
        {dateRange.map((date, index) => {
          const day = format(date, "d");
          const month = format(date, "MMMM", { locale: tr });
          const dayName =
            dayMap[format(date, "EEEE")] ||
            format(date, "EEEE", { locale: tr });

          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          const containerStyle: CSSProperties = {
            cursor: "pointer",
            display: "flex",
            height: "36px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0, // Küçülmesini engeller
            minWidth: "165px", // Minimum genişliği sabitler
            transition: "all 0.2s ease",
            backgroundColor: isSelected ? "#9E5CF7" : "#9E5CF726",
          };

          const textColorStyle: CSSProperties = {
            ...textStyle,
            color: isSelected ? "#FFF" : "#9E5CF7",
          };

          return (
            <div
              key={index}
              className="rounded"
              style={containerStyle}
              onClick={() => onDateSelect(date)}
            >
              <div style={textColorStyle}>
                {day} {month.substring(0, 3)} {dayName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sağ ok - sabit kalacak */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          cursor: "pointer",
          width: "32px",
          height: "32px",
          minWidth: "32px", // Minimum genişliği sabitler
          flexShrink: 0, // Küçülmesini engeller
          backgroundColor: "#9E5CF726",
          borderRadius: "50%", // "100%" yerine "50%" kullanıyorum (aynı şey)
          zIndex: 2, // Üstte görünmesi için
        }}
        onClick={() => handleNextWeek()}
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default DateNavigation;
