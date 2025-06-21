import { useCallback, useState } from 'react';
import { Modal, Button, Row, Col, ListGroup, Spinner } from 'react-bootstrap';

import { useProgramsTable as useProgramsList } from '../../../../hooks/program/useList';
import { useLevelsTable as useLevelsList } from '../../../../hooks/levels/useList';
import { useClassroomList as useClassroomsList } from '../../../../hooks/classrooms/useList';
import { useListStudents as useStudentsList } from '../../../../hooks/student/useList';

export type AudienceItemType = 'program' | 'level' | 'classroom' | 'student';

export interface AudienceItem {
    id: number;
    name: string;
    type: AudienceItemType;
}

interface TargetAudienceModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (selected: AudienceItem[]) => void;
}

const TargetAudienceModal: React.FC<TargetAudienceModalProps> = ({
    show,
    onClose,
    onSave,
}) => {
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [items, setItems] = useState<AudienceItem[]>([]);

    const { programsData: programs = [], loading: loadingPrograms } =
        useProgramsList({ enabled: show });

    const { levelsData: levels = [], loading: loadingLevels } = useLevelsList({
        enabled: !!selectedProgram,
        program_id: selectedProgram ?? undefined,
    });

    const {
        classroomData: classrooms = [],
        loading: loadingClassrooms,
    } = useClassroomsList({
        enabled: !!selectedLevel,
        level_id: selectedLevel ?? undefined,
    });

    const { data: students = [], loading: loadingStudents } = useStudentsList({
        enabled: !!selectedClass,
        classroom_id: selectedClass ?? undefined,
    });

    const addItem = useCallback(
        (type: AudienceItemType, id: number, name: string) => {
            setItems((prev) =>
                prev.some((p) => p.id === id && p.type === type)
                    ? prev
                    : [...prev, { type, id, name }]
            );
        },
        []
    );

    const removeItem = useCallback(
        (id: number, type: AudienceItemType) => {
            setItems((prev) => prev.filter((p) => !(p.id === id && p.type === type)));
        },
        []
    );

    const handleClear = () => {
        setItems([]);
        setSelectedProgram(null);
        setSelectedLevel(null);
        setSelectedClass(null);
    };

    const handleSave = () => {
        onSave(items);
        onClose();
    };

    const renderLoading = (flag: boolean) =>
        flag ? <Spinner animation="border" size="sm" /> : null;

    return (
        <Modal show={show} onHide={onClose} centered dialogClassName="target-audience-modal" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <div className="tree-section">
                            <div className="tree-header" onClick={() => setSelectedProgram(null)}>
                                Program{' '}
                                <Button size="sm" onClick={() => addItem('program', -1, 'Tümü')}>
                                    +
                                </Button>
                            </div>
                            {loadingPrograms ? (
                                <Spinner animation="border" />
                            ) : (
                                programs.map((p) => (
                                    <div key={p.id} className="tree-node" style={{ marginLeft: 0 }}>
                                        <span onClick={() => setSelectedProgram(p.id)}>{p.name}</span>
                                        <Button size="sm" variant="success" onClick={() => addItem('program', p.id, p.name)}>
                                            +
                                        </Button>
                                    </div>
                                ))
                            )}
                            {selectedProgram && (
                                <>
                                    <div className="tree-header level-header">Seviye</div>
                                    {loadingLevels ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        levels.map((l) => (
                                            <div key={l.id} className="tree-node" style={{ marginLeft: 15 }}>
                                                <span onClick={() => setSelectedLevel(l.id)}>{l.name}</span>
                                                <Button size="sm" variant="success" onClick={() => addItem('level', l.id, l.name)}>
                                                    +
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                            {selectedLevel && (
                                <>
                                    <div className="tree-header class-header">Sınıf</div>
                                    {loadingClassrooms ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        classrooms.map((c) => (
                                            <div key={c.id} className="tree-node" style={{ marginLeft: 30 }}>
                                                <span onClick={() => setSelectedClass(c.id)}>{c.name}</span>
                                                <Button size="sm" variant="success" onClick={() => addItem('classroom', c.id, c.name)}>
                                                    +
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                            {selectedClass && (
                                <>
                                    <div className="tree-header student-header">Öğrenci</div>
                                    {loadingStudents ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        students.map((s) => (
                                            <div key={s.id} className="tree-node" style={{ marginLeft: 45 }}>
                                                <span>{s.name}</span>
                                                <Button size="sm" variant="success" onClick={() => addItem('student', s.id, s.name)}>
                                                    +
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h6>Eklentiler</h6>
                        <ListGroup>
                            {items.map((item) => (
                                <ListGroup.Item key={`${item.type}-${item.id}`} className="d-flex justify-content-between">
                                    {item.name}{' '}
                                    <Button size="sm" variant="danger" onClick={() => removeItem(item.id, item.type)}>
                                        -
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClear}>
                    Temizle
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TargetAudienceModal;

