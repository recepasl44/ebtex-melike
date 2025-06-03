import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { Appointment } from "../../../../../type";

interface GenerationAppointmentsTableProps {
  data: Appointment[];
}

const GenerationAppointmentsTable: React.FC<GenerationAppointmentsTableProps> = ({
  data
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  useEffect(() => {
    const days: Date[] = [];
    const currentDay = new Date();
    
    const dayOfWeek = currentDay.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const monday = new Date(currentDay);
    monday.setDate(currentDay.getDate() + diff);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(day);
    }
    
    setDaysOfWeek(days);
    
    const todayIndex = days.findIndex(
      day => day.toDateString() === today.toDateString()
    );
    
    if (todayIndex !== -1) {
      setSelectedDate(days[todayIndex]);
    } else {
      setSelectedDate(days[0]);
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedIndex = daysOfWeek.findIndex(
        day => day.toDateString() === selectedDate.toDateString()
      );
      
      if (selectedIndex !== -1) {
        const dayElement = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
        if (dayElement) {
          const scrollLeft = dayElement.offsetLeft - scrollContainerRef.current.offsetWidth / 2 + dayElement.offsetWidth / 2;
          scrollContainerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
  }, [daysOfWeek, selectedDate]);

  const parseAppointmentDate = (dateStr: string): Date => {
    // Remove any comma at the end of the date string
    const cleanDateStr = dateStr.replace(/,\s*$/, '');
    
    // Parse DD/MM/YYYY format
    const [day, month, year] = cleanDateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
  };

  const formatAppointmentData = () => {
    return data.map(appointment => {
      const dateObj = parseAppointmentDate(appointment.date);
      
      return {
        ...appointment,
        formattedDate: dateObj,
        // Use the hourse string directly since it's already formatted
        formattedTime: typeof appointment.hourse === 'string' ? appointment.hourse : '00:00 - 00:00'
      };
    }).filter(appointment => {
      return (
        appointment.formattedDate.getDate() === selectedDate.getDate() && 
        appointment.formattedDate.getMonth() === selectedDate.getMonth() && 
        appointment.formattedDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  const appointments = formatAppointmentData();

  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>Yaklaşan Randevular</Card.Title>
      </Card.Header>
      <Card.Body>
        {/* Days of week scrollable selector */}
        <div 
          className="d-flex overflow-auto mb-3"
          ref={scrollContainerRef}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`flex-shrink-0 text-center mx-1 p-3 rounded ${
                day.toDateString() === selectedDate.toDateString()
                  ? "bg-primary text-white"
                  : "bg-light text-body"
              }`}
              style={{
                minWidth: '70px',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
              }}
              onClick={() => setSelectedDate(day)}
            >
              <div className="fs-3">{day.getDate()}</div>
              <div>{dayNames[day.getDay()]}</div>
            </div>
          ))}
        </div>

        {/* Appointments list */}
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div 
                key={index} 
                className="appointment-item mb-3 border-bottom pb-3"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{appointment.title}</h6>
                  <div className="text-muted">
                    <i className="fe fe-clock me-1"></i>
                    {appointment.formattedTime}
                  </div>
                </div>
                <p className="text-muted mb-0 small">{appointment.description}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted">
              <p>Bu gün için randevunuz bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GenerationAppointmentsTable;