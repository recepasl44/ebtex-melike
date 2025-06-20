import { useCallback, useState } from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Accordion,
    ListGroup,
    Spinner,
} from 'react-bootstrap';

import { useProgramsTable as useProgramsList } from '../../../../hooks/program/useList';
import { useLevelsTable as useLevelsList } from '../../../../hooks/levels/useList';
import { useClassroomList as useClassroomsList } from '../../../../hooks/classrooms/useList';

export type AudienceItemType = 'program' | 'level' | 'classroom';

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
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const {
        programsData: programs = [],
        loading: loadingPrograms,
    } = useProgramsList({ enabled: show });

    const { levelsData: levels = [], loading: loadingLevels } = useLevelsList({
        enabled: show && selectedProgram !== null,
        program_id: selectedProgram ?? undefined,
    });

    const {
        classroomData: classrooms = [],
        loading: loadingClassrooms,
    } = useClassroomsList({
        enabled: show && selectedLevel !== null,
        program_id: selectedProgram ?? undefined,
        level_id: selectedLevel ?? undefined,
    });

    const addItem = useCallback(
        (type: AudienceItemType, id: number, name: string) => {
            setSelectedItems((prev) => {
                if (prev.some((p) => p.id === id && p.type === type)) {
                    return prev;
                }
                return [...prev, { type, id, name }];
            });
        },
        []
    );

    const removeItem = useCallback((id: number, type: AudienceItemType) => {
        setSelectedItems((prev) => prev.filter((p) => !(p.id === id && p.type === type)));
    }, []);

    const handleClear = () => {
        setSelectedItems([]);
        setSelectedProgram(null);
        setSelectedLevel(null);
    };

    const handleSave = () => {
        onSave(selectedItems);
        onClose();
    };

    const renderLoading = (flag: boolean) =>
        flag ? <Spinner animation="border" size="sm" /> : null;

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            dialogClassName="target-audience-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6} className="mb-3">
                        <Accordion
                            alwaysOpen
                            className="accordion-customicon1 customized-accordion accordions-items-seperate"
                        >
                            <Accordion.Item eventKey="program" className="custom-accordion-primary">
                                <Accordion.Header>Program</Accordion.Header>
                                <Accordion.Body>
                                    {renderLoading(loadingPrograms)}
                                    <ListGroup className="mb-3">
                                        {programs.map((p) => (
                                            <ListGroup.Item
                                                key={p.id}
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <span
                                                    role="button"
                                                    onClick={() => setSelectedProgram(p.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {p.name}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="success"
                                                    onClick={() => addItem('program', p.id, p.name)}
                                                >
                                                    +
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            {selectedProgram !== null && (
                                <Accordion.Item eventKey="level" className="custom-accordion-success ms-4">
                                    <Accordion.Header>Seviye</Accordion.Header>
                                    <Accordion.Body>
                                        {renderLoading(loadingLevels)}
                                        <ListGroup className="mb-3">
                                            {levels.map((l) => (
                                                <ListGroup.Item
                                                    key={l.id}
                                                    className="d-flex justify-content-between align-items-center"
                                                >
                                                    <span
                                                        role="button"
                                                        onClick={() => setSelectedLevel(l.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {l.name}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => addItem('level', l.id, l.name)}
                                                    >
                                                        +
                                                    </Button>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                            {selectedLevel !== null && (
                                <Accordion.Item eventKey="classroom" className="custom-accordion-warning ms-5">
                                    <Accordion.Header>Sınıf</Accordion.Header>
                                    <Accordion.Body>
                                        {renderLoading(loadingClassrooms)}
                                        <ListGroup>
                                            {classrooms.map((c) => (
                                                <ListGroup.Item
                                                    key={c.id}
                                                    className="d-flex justify-content-between align-items-center"
                                                >
                                                    <span>{c.name}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => addItem('classroom', c.id, c.name)}
                                                    >
                                                        +
                                                    </Button>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    </Col>
                    <Col md={6} className="mb-3">
                        <h6 className="mb-2">Eklentiler</h6>
                        <ListGroup>
                            {selectedItems.map((item) => (
                                <ListGroup.Item
                                    key={`${item.type}-${item.id}`}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span>{item.name}</span>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => removeItem(item.id, item.type)}
                                    >
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

