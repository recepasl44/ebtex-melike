import { useState, useEffect } from "react";
import { Card, Col, Dropdown, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { DailyClassSchedule } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface DailyCourseScheduleTableProps {
  data: DailyClassSchedule[];
}

const DailyCourseScheduleTable: React.FC<DailyCourseScheduleTableProps> = ({ data }) => {
  const items = data ?? [];
  if (items.length === 0) return null;
  // Extract all available levels and classes
  const allSchoolTypes = items.map((school) => school.name);
    // Days of the week in Turkish
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );
  // State for selected filters
  const [selectedSchool, setSelectedSchool] = useState<string>(allSchoolTypes[0] || '');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [displayClasses, setDisplayClasses] = useState<any[]>([]);

  // Fixed height table container style
  const tableContainerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    overflow: 'hidden', // Hide overflow initially
    display: 'flex',
    flexDirection: 'column' as const
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

  // Get unique level names for the selected school
  const getLevelsBySchool = (schoolName: string) => {
    const school = items.find((s) => s.name === schoolName);
    return school ? school.levels.map(level => level.name) : [];
  };

  // Get unique class names for the selected level
  const getClassesByLevel = (schoolName: string, levelName: string) => {
    const school = items.find((s) => s.name === schoolName);
    const level = school?.levels.find(l => l.name === levelName);
    return level ? level.classes.map(cls => cls.name) : [];
  };

  // Get classes data to display
  const getClassData = (
    schoolName: string,
    levelName: string,
    className: string
  ) => {
    const school = items.find((s) => s.name === schoolName);
    const level = school?.levels.find(l => l.name === levelName);
    if (level) {
      return level.classes.filter(c => c.name === className);
    }
    return [];
  };

  // Effect to update selected level when school changes
  useEffect(() => {
    const levels = getLevelsBySchool(selectedSchool);
    setSelectedLevel(levels[0] || '');
  }, [selectedSchool]);

  // Effect to update selected class when level changes
  useEffect(() => {
    const classes = getClassesByLevel(selectedSchool, selectedLevel);
    setSelectedClass(classes[0] || '');
  }, [selectedLevel, selectedSchool]);

  // Effect to update displayed class data
  useEffect(() => {
    if (selectedSchool && selectedLevel && selectedClass) {
      setDisplayClasses(getClassData(selectedSchool, selectedLevel, selectedClass));
    } else {
      setDisplayClasses([]);
    }
  }, [selectedClass, selectedLevel, selectedSchool]);

  // Get available classes for dropdown display
  const getClassDropdowns = () => {
    if (!selectedSchool || !selectedLevel) return [];

    const levels = items.find((s) => s.name === selectedSchool)?.levels;
    const level = levels?.find(l => l.name === selectedLevel);

    if (!level) return [];

    // Group classes by first character (usually grade number)
    const classGroups: {[key: string]: string[]} = {};
    level.classes.forEach(cls => {
      const classPrefix = cls.name.split('/')[0];
      if (!classGroups[classPrefix]) {
        classGroups[classPrefix] = [];
      }
      classGroups[classPrefix].push(cls.name);
    });

    return Object.entries(classGroups);
  };

  const getStatusColorClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'öğretmen raporlu':
        return 'text-danger';
      case 'sınıf değişikliği':
        return 'text-info';
      default:
        return '';
    }
  };

  // Format school name for display (capitalize first letter)
  const formatSchoolName = (schoolName: string) => {
    if (!schoolName) return '';
    return schoolName.charAt(0).toUpperCase() + schoolName.slice(1);
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const scheduleData = [...displayClasses];
    
    // If less than 5 rows, add empty rows to maintain height
    if (scheduleData.length < 5) {
      const emptyRowsNeeded = 5 - scheduleData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        scheduleData.push({
          no: '',
          hourse: '',
          lesson: '',
          teacher: '',
          status: ''
        });
      }
    }
    
    return scheduleData;
  };

  return (
    <Col xxl={12} >
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Günlük Ders Programı</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {/* School type tabs */}

          <div className="px-3 pt-3">
            <Nav variant="pills" className="mb-3">
              {allSchoolTypes.map((schoolType) => (
                <Nav.Item key={schoolType} className="mb-2">
                  <Nav.Link
                    className={selectedSchool === schoolType ? "active py-1 px-2" : "py-1 px-2"}
                    onClick={() => setSelectedSchool(schoolType)}
                    style={{
                      borderRadius: "4px",
                      margin: "0 2px",
                      backgroundColor:
                        selectedSchool === schoolType
                          ? isDarkMode
                            ? "#6259ca"
                            : "#e9dbff"
                          : isDarkMode
                          ? "#2c3034"
                          : "#f5f5fd",
                      color:
                        selectedSchool === schoolType
                          ? isDarkMode
                            ? "#fff"
                            : "#6259ca"
                          : isDarkMode
                          ? "#adb5bd"
                          : "#333",
                      border: isDarkMode ? "1px solid #495057" : "none",
                      fontSize: "0.75rem",
                    }}
                  >
                    {formatSchoolName(schoolType)}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          {/* Class selection dropdowns */}
          <div className="d-flex mb-3 px-3 gap-2">
            {getClassDropdowns().map(([prefix, classes], index) => (
              <div key={index} className="dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      backgroundColor: selectedClass.startsWith(prefix) ? '#e9dbff' : '#f5f5fd',
                      borderRadius: '4px',
                      border: 'none',
                      color: '#333'
                    }}
                  >
                    {`${prefix}/${selectedClass.split('/')[1]?.toUpperCase() || 'A'}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {classes.map((cls) => (
                      <Dropdown.Item
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        active={selectedClass === cls}
                      >
                        {cls.toUpperCase()}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))}
          </div>
          
        {/* Course schedule table with fixed height */}
        <div className="table-responsive" style={tableContainerStyle}>
          <div style={scrollContainerStyle}>
            <SpkTablescomponent
              tableClass="text-wrap table-fixed mb-0 border-top"
              tBodyClass="table-group-divider"
              header={[
                { title: "Ders No" },
                { title: "Saat" },
                { title: "Ders" },
                { title: "Öğretmen" },
                { title: "Durum" },
              ]}
            >
              {prepareTableData().map((classData, index) => {
                // Check if this is an empty row
                const isEmpty = !classData.no && !classData.lesson;
                
                return isEmpty ? (
                  <tr key={`empty-${index}`} style={{ height: '48px' }}>
                    <td colSpan={5}>&nbsp;</td>
                  </tr>
                ) : (
                  <tr key={`class-${index}`}>
                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {classData.no}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {classData.hourse}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        className="text-capitalize">
                      {classData.lesson}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {classData.teacher}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        className={getStatusColorClass(classData.status)}>
                      {classData.status}
                    </td>
                  </tr>
                );
              })}
            </SpkTablescomponent>
          </div>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DailyCourseScheduleTable;