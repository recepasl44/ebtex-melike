import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, Button, ButtonGroup, Col } from 'react-bootstrap';
import trLocale from '@fullcalendar/core/locales/tr';

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);

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

  return (
    <Col xxl={12} >
      {/* Calendar Card */}
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Takvim</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <ButtonGroup size="sm">
                <Button variant="primary" className="rounded-start" onClick={handlePrev}>
                  <i className="bi bi-chevron-left"></i>
                </Button>
                <Button variant="primary" className="rounded-end" onClick={handleNext}>
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
              <Button variant="primary" onClick={() => calendarRef.current?.getApi().changeView('dayGridMonth')}>Ay</Button>
              <Button variant="primary" onClick={() => calendarRef.current?.getApi().changeView('timeGridWeek')}>Hafta</Button>
              <Button variant="primary" onClick={() => calendarRef.current?.getApi().changeView('timeGridDay')}>Gün</Button>
              <Button variant="primary" onClick={() => calendarRef.current?.getApi().changeView('listWeek')}>Liste</Button>
            </ButtonGroup>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height={300} // Set a fixed small height
            contentHeight={250} // Internal content height
            locale={trLocale}
            dayHeaderFormat={{ weekday: 'short' }} // Short day names to save space
            firstDay={1}
            buttonText={{
              today: 'Bugün',
              month: 'Ay',
              week: 'Hafta',
              day: 'Gün',
              list: 'Liste'
            }}
            dayCellClassNames="small-cell"
            dayHeaderClassNames="small-header"
            viewClassNames="small-calendar-view"
          />
        </Card.Body>
      </Card>

    </Col>
  );
};

export default Calendar;