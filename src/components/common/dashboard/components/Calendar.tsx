import { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, Button, ButtonGroup, Col } from "react-bootstrap";
import trLocale from "@fullcalendar/core/locales/tr";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// Örnek notlar - Gerçek uygulamada API'den alınacak
const sampleNotes = [
  {
    date: "2025-05-26",
    time: "09:00:00",
    title: "Toplantı",
    description: "Yönetim kurulu toplantısı",
  },
  {
    date: "2025-05-26",
    time: "14:30:00",
    title: "Görüşme",
    description: "Müşteri görüşmesi",
  },
  {
    date: "2025-05-27",
    time: "11:00:00",
    title: "Eğitim",
    description: "Yazılım eğitimi",
  },
  {
    date: "2025-05-28",
    time: "13:00:00",
    title: "Demo",
    description: "Ürün demo sunumu",
  },
];

// Pastel renk üreteci fonksiyonu
const generatePastelColor = (str: string) => {
  // Stringden sabit bir hash üret (aynı string için her zaman aynı renk)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Pastel renk oluştur
  const h = hash % 360;
  return `hsla(${h}, 70%, 80%, 0.8)`; // Pastel ton
};

// Etkinlik tiplerinin renklerini önceden hesapla ve sakla
const eventColorMap: Record<string, string> = {};
sampleNotes.forEach((note) => {
  if (!eventColorMap[note.title]) {
    eventColorMap[note.title] = generatePastelColor(note.title);
  }
});

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  console.log("selectedDate" + selectedDate);

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
  };

  // Light/dark mode değişikliğinde takvimi güncelle
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const currentView = calendarApi.view.type;
      calendarApi.changeView(currentView);
      calendarApi.updateSize();
    }
  }, [isDarkMode]);

  // Bir gün seçildiğinde günlük görünüme geç
  const handleDateClick = (arg: any) => {
    const calendarApi = calendarRef.current?.getApi();
    setSelectedDate(arg.dateStr);
    calendarApi?.changeView("timeGridDay", arg.date);
  };

  // Takvim stil ayarları
  const calendarStyles = {
    "--fc-border-color": isDarkMode ? "#555" : "#ddd",
    "--fc-day-today-bg-color": isDarkMode
      ? "rgba(85, 140, 245, 0.1)"
      : "rgba(85, 140, 245, 0.1)",
    "--fc-button-text-color": isDarkMode ? "#fff" : "#212529",
    "--fc-button-bg-color": isDarkMode ? "#2c3139" : "#f0f0f0",
    "--fc-button-border-color": isDarkMode ? "#444" : "#ddd",
    "--fc-button-hover-bg-color": isDarkMode ? "#3a3f48" : "#e9e9e9",
    "--fc-button-hover-border-color": isDarkMode ? "#555" : "#ccc",
    "--fc-button-active-bg-color": isDarkMode ? "#1a73e8" : "#1a73e8",
    "--fc-button-active-border-color": isDarkMode ? "#1a73e8" : "#1a73e8",
    "--fc-page-bg-color": isDarkMode ? "#1f1f1f" : "#fff",
    "--fc-neutral-bg-color": isDarkMode ? "#2c3139" : "#f5f5f5",
    "--fc-neutral-text-color": isDarkMode ? "#fff" : "#212529",
    "--fc-list-event-hover-bg-color": isDarkMode ? "#3a3f48" : "#f5f5f5",
    "--fc-daygrid-day-number-color": isDarkMode ? "#fff" : "#000",
    "--fc-col-header-cell-cushion-color": isDarkMode ? "#fff" : "#000",
    "--fc-timegrid-slot-label-color": isDarkMode ? "#fff" : "#000",
    "--fc-event-border-color": "transparent",
    "--fc-event-bg-color": "transparent",
  } as React.CSSProperties;

  // Card için stil ayarları
  const cardStyles = {
    display: "flex",
    width: "100%", // Changed from fixed 627px to 100%
    padding: "20px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ...(isDarkMode
      ? {}
      : {
          borderRadius: "9.429px",
          background: "#FFF",
          boxShadow: "0px 3.771px 3.771px 0px rgba(0, 0, 0, 0.25)",
        }),
  };

  // Örnek notları takvim olaylarına dönüştür - tutarlı renklerle
  const events = sampleNotes.map((note) => {
    // eventColorMap'ten rengi al (daha önce oluşturulmuş)
    const color = eventColorMap[note.title];
    return {
      title: note.title,
      start: `${note.date}T${note.time}`,
      backgroundColor: color,
      borderColor: color,
      textColor: isDarkMode ? "#fff" : "#333",
      classNames: [`event-${note.title.replace(/\s+/g, "-").toLowerCase()}`],
      extendedProps: {
        description: note.description,
        eventType: note.title,
      },
    };
  });

  // Etkinlik türleri için stil ekle
  useEffect(() => {
    // Önceki stilleri temizle
    const oldStyle = document.getElementById("event-colors-style");
    if (oldStyle) {
      oldStyle.remove();
    }

    // Yeni stiller oluştur
    const style = document.createElement("style");
    style.id = "event-colors-style";

    let styleContent = "";
    Object.entries(eventColorMap).forEach(([title, color]) => {
      const className = `event-${title.replace(/\s+/g, "-").toLowerCase()}`;
      styleContent += `
        .fc-daygrid-event.${className},
        .fc-timegrid-event.${className},
        .fc-list-event.${className} {
          background-color: ${color} !important;
          border-color: ${color} !important;
        }
      `;
    });

    style.textContent = styleContent;
    document.head.appendChild(style);

    return () => {
      if (document.getElementById("event-colors-style")) {
        document.getElementById("event-colors-style")?.remove();
      }
    };
  }, []);

  return (
    <Col xxl={12} className="d-flex justify-content-center">
      <Card
        className={`custom-card ${
          isDarkMode ? "dark-mode-card" : "light-mode-card"
        }`}
        style={cardStyles}
      >
        <Card.Header className="calendar-header">
          <Card.Title>Takvim</Card.Title>
        </Card.Header>
        <Card.Body
          style={calendarStyles}
          className={`calendar-container ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="d-flex justify-content-between mb-3">
            <div>
              <ButtonGroup size="sm">
                <Button
                  variant="primary"
                  className="rounded-start"
                  onClick={handlePrev}
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>
                <Button
                  variant="primary"
                  className="rounded-end"
                  onClick={handleNext}
                >
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </ButtonGroup>
              <Button
                variant="primary"
                size="sm"
                className="ms-2"
                onClick={handleToday}
              >
                Bugün
              </Button>
            </div>
            <ButtonGroup size="sm">
              <Button
                variant="primary"
                onClick={() =>
                  calendarRef.current?.getApi().changeView("dayGridMonth")
                }
              >
                Ay
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  calendarRef.current?.getApi().changeView("timeGridWeek")
                }
              >
                Hafta
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  calendarRef.current?.getApi().changeView("timeGridDay")
                }
              >
                Gün
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  calendarRef.current?.getApi().changeView("listWeek")
                }
              >
                Liste
              </Button>
            </ButtonGroup>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={false}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height={300}
            contentHeight={100}
            locale={trLocale}
            dayHeaderFormat={{ weekday: "short" }}
            firstDay={1}
            slotMinTime="01:00:00"
            slotMaxTime="23:00:00"
            slotDuration="01:00:00"
            allDaySlot={false}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            buttonText={{
              today: "Bugün",
              month: "Ay",
              week: "Hafta",
              day: "Gün",
              list: "Liste",
            }}
            dayCellClassNames="calendar-day-cell"
            dayHeaderClassNames="calendar-day-header"
            viewClassNames="small-calendar-view"
            dateClick={handleDateClick}
            eventContent={renderEventContent}
            events={events}
            eventDisplay="block"
            expandRows={true}
            nowIndicator={true}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

// Not içeriğini özel stillerle göster
function renderEventContent(eventInfo: any) {
  const title = eventInfo.event.title;
  const color = eventColorMap[title];

  return (
    <div className="event-content" style={{ backgroundColor: color }}>
      <span className="event-title">{title}</span>
      {eventInfo.event.extendedProps.description && (
        <span className="event-description">
          {eventInfo.event.extendedProps.description}
        </span>
      )}
    </div>
  );
}

export default Calendar;
