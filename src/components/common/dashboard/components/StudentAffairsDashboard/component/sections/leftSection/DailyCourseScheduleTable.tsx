import { useState, useEffect } from "react";
import { Card, Col, Dropdown, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { DailyClassSchedule } from "../../../../../type";

interface DailyCourseScheduleTableProps {
  data: DailyClassSchedule[];
}

const DailyCourseScheduleTable: React.FC<DailyCourseScheduleTableProps> = ({ data }) => {
  // Extract all available levels and classes
  const allSchoolTypes = data.map(school => school.name);
  
  // State for selected filters
  const [selectedSchool, setSelectedSchool] = useState<string>(allSchoolTypes[0] || '');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [displayClasses, setDisplayClasses] = useState<any[]>([]);
  
  // Get unique level names for the selected school
  const getLevelsBySchool = (schoolName: string) => {
    const school = data.find(s => s.name === schoolName);
    return school ? school.levels.map(level => level.name) : [];
  };
  
  // Get unique class names for the selected level
  const getClassesByLevel = (schoolName: string, levelName: string) => {
    const school = data.find(s => s.name === schoolName);
    const level = school?.levels.find(l => l.name === levelName);
    return level ? level.classes.map(cls => cls.name) : [];
  };
  
  // Get classes data to display
  const getClassData = (schoolName: string, levelName: string, className: string) => {
    const school = data.find(s => s.name === schoolName);
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
    
    const levels = data.find(s => s.name === selectedSchool)?.levels;
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

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Günlük Ders Programı</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {/* School type tabs */}
          <div className="px-3 pt-3">
            <Nav variant="pills" className="mb-3">
              {allSchoolTypes.map((schoolType) => (
                <Nav.Item key={schoolType}>
                  <Nav.Link 
                    className={selectedSchool === schoolType ? "active" : ""}
                    onClick={() => setSelectedSchool(schoolType)}
                    style={{
                      borderRadius: '4px',
                      margin: '0 4px',
                      backgroundColor: selectedSchool === schoolType ? '#e9dbff' : '#f5f5fd',
                      color: selectedSchool === schoolType ? '#6259ca' : '#333',
                      border: 'none'
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
        {/* Course schedule table */}
        <div className="table-responsive">
          <SpkTablescomponent
            tableClass="mb-0 border-top"
            tBodyClass="table-group-divider"
            header={[
              { title: "Ders No" },
              { title: "Saat" },
              { title: "Ders" },
              { title: "Öğretmen" },
              { title: "Durum" },
            ]}
          >
            {displayClasses.length > 0 ? (
              displayClasses.map((classData, index) => (
                <tr key={index}>
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  Ders programı bulunamadı
                </td>
              </tr>
            )}
          </SpkTablescomponent>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DailyCourseScheduleTable;