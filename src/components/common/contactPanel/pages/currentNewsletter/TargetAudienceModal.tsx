import { useCallback, useState } from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
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
    const [openProgramId, setOpenProgramId] = useState<number | null>(null);
    const [openLevelId, setOpenLevelId] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const {
        programsData: programs = [],
        loading: loadingPrograms,
    } = useProgramsList({ enabled: show });

    const { levelsData: levels = [], loading: loadingLevels } = useLevelsList({
        enabled: show && openProgramId !== null,
        program_id: openProgramId ?? undefined,
    });

    const {
        classroomData: classrooms = [],
        loading: loadingClassrooms,
    } = useClassroomsList({
        enabled: show && openLevelId !== null,
        program_id: openProgramId ?? undefined,
        level_id: openLevelId ?? undefined,
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
        setOpenProgramId(null);
        setOpenLevelId(null);
    };

    const handleSave = () => {
        onSave(selectedItems);
        onClose();
    };

    const renderLoading = (flag: boolean) =>
        flag ? <Spinner animation="border" size="sm" /> : null;

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6} className="mb-3">
                        <style>
                            {`
                            .tree ul { padding-left: 1rem; }
                            .tree li { list-style: none; cursor: pointer; }
                            `}
                        </style>
                        <ul className="tree">
                            {renderLoading(loadingPrograms)}
                            {programs.map((p) => (
                                <li key={p.id}>
                                    <div className="d-flex align-items-center py-1 px-2">
                                        <i
                                            className={`bi ${
                                                openProgramId === p.id
                                                    ? 'bi-chevron-down'
                                                    : 'bi-chevron-right'
                                            } me-1`}
                                            onClick={() => {
                                                setOpenProgramId(openProgramId === p.id ? null : p.id);
                                                setOpenLevelId(null);
                                            }}
                                        />
                                        <span className="flex-grow-1">
                                            {p.name}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="success"
                                            onClick={() => addItem('program', p.id, p.name)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {openProgramId === p.id && (
                                        <ul>
                                            {renderLoading(loadingLevels)}
                                            {levels.map((l) => (
                                                <li key={l.id}>
                                                    <div className="d-flex align-items-center py-1 px-2">
                                                        <i
                                                            className={`bi ${
                                                                openLevelId === l.id
                                                                    ? 'bi-chevron-down'
                                                                    : 'bi-chevron-right'
                                                            } me-1`}
                                                            onClick={() => {
                                                                setOpenLevelId(openLevelId === l.id ? null : l.id);
                                                            }}
                                                        />
                                                        <span className="flex-grow-1">
                                                            {l.name}
                                                        </span>
                                                        <Button
                                                            size="sm"
                                                            variant="success"
                                                            onClick={() => addItem('level', l.id, l.name)}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                    {openLevelId === l.id && (
                                                        <ul>
                                                            {renderLoading(loadingClassrooms)}
                                                            {classrooms.map((c) => (
                                                                <li key={c.id} className="py-1 px-2 d-flex align-items-center">
                                                                    <span className="flex-grow-1">
                                                                        {c.name}
                                                                    </span>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="success"
                                                                        onClick={() => addItem('classroom', c.id, c.name)}
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
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

