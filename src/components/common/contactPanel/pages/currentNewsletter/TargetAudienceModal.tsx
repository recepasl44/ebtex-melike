import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

export interface Program { id: number; name: string }
export interface Level { id: number; name: string }
export interface Classroom { id: number; name: string }

export type AudienceItemType = 'program' | 'level' | 'classroom';

export interface AudienceItem {
    id: number;
    name: string;
    type: AudienceItemType;
}

interface TargetAudienceModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (items: AudienceItem[]) => void;
}

const TargetAudienceModal: React.FC<TargetAudienceModalProps> = ({ show, onClose, onSave }) => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
    const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const [loading, setLoading] = useState({ programs: false, levels: false, classrooms: false });

    const toArray = <T,>(value: unknown): T[] => {
        if (Array.isArray(value)) return value as T[];
        if (value && typeof value === 'object' && Array.isArray((value as any).data)) {
            return (value as any).data as T[];
        }
        return [];
    };

    useEffect(() => {
        if (!show) return;
        setLoading((l) => ({ ...l, programs: true }));
        axios
            .get<Program[]>('/api/programs')
            .then((res) => setPrograms(toArray<Program>(res.data)))
            .catch(() => setPrograms([]))
            .finally(() => setLoading((l) => ({ ...l, programs: false })));
    }, [show]);

    useEffect(() => {
        if (!show || selectedProgramId == null) {
            setLevels([]);
            setSelectedLevelId(null);
            return;
        }
        setLoading((l) => ({ ...l, levels: true }));
        axios
            .get<Level[]>(`/api/programs/${selectedProgramId}/levels`)
            .then((res) => setLevels(toArray<Level>(res.data)))
            .catch(() => setLevels([]))
            .finally(() => setLoading((l) => ({ ...l, levels: false })));
    }, [selectedProgramId, show]);

    useEffect(() => {
        if (!show || selectedLevelId == null) {
            setClassrooms([]);
            return;
        }
        setLoading((l) => ({ ...l, classrooms: true }));
        axios
            .get<Classroom[]>(`/api/levels/${selectedLevelId}/classrooms`)
            .then((res) => setClassrooms(toArray<Classroom>(res.data)))
            .catch(() => setClassrooms([]))
            .finally(() => setLoading((l) => ({ ...l, classrooms: false })));
    }, [selectedLevelId, show]);

    const addItem = useCallback((item: { id: number; name: string }, type: AudienceItemType) => {
        setSelectedItems((prev) => {
            if (prev.find((p) => p.id === item.id && p.type === type)) return prev;
            return [...prev, { ...item, type }];
        });
    }, []);

    const removeItem = useCallback((id: number, type: AudienceItemType) => {
        setSelectedItems((prev) => prev.filter((p) => !(p.id === id && p.type === type)));
    }, []);

    const handleSave = () => {
        onSave(selectedItems);
        onClose();
    };

    const handleClear = () => setSelectedItems([]);

    const renderLoading = (flag: boolean) => (flag ? <Spinner animation="border" size="sm" className="ms-2" /> : null);

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <h6 className="mb-2">Program Seç</h6>
                        <ListGroup className="mb-3">
                            {programs.map((p) => (
                                <ListGroup.Item
                                    key={p.id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span
                                        role="button"
                                        onClick={() => setSelectedProgramId(p.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {p.name}
                                    </span>
                                    <Button size="sm" variant="success" onClick={() => addItem(p, 'program')}>
                                        +
                                    </Button>
                                </ListGroup.Item>
                            ))}
                            {renderLoading(loading.programs)}
                        </ListGroup>
                        {levels.length > 0 && (
                            <>
                                <h6 className="mb-2">Level Seç</h6>
                                <ListGroup className="mb-3">
                                    {levels.map((l) => (
                                        <ListGroup.Item
                                            key={l.id}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <span
                                                role="button"
                                                onClick={() => setSelectedLevelId(l.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {l.name}
                                            </span>
                                            <Button size="sm" variant="success" onClick={() => addItem(l, 'level')}>
                                                +
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                    {renderLoading(loading.levels)}
                                </ListGroup>
                            </>
                        )}
                        {classrooms.length > 0 && (
                            <>
                                <h6 className="mb-2">Sınıf Seç</h6>
                                <ListGroup className="mb-3">
                                    {classrooms.map((c) => (
                                        <ListGroup.Item
                                            key={c.id}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <span>{c.name}</span>
                                            <Button size="sm" variant="success" onClick={() => addItem(c, 'classroom')}>
                                                +
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                    {renderLoading(loading.classrooms)}
                                </ListGroup>
                            </>
                        )}
                    </Col>
                    <Col md={6}>
                        <h6 className="mb-2">Eklenenler</h6>
                        <ListGroup>
                            {selectedItems.map((item) => (
                                <ListGroup.Item
                                    key={`${item.type}-${item.id}`}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span>{item.name}</span>
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
