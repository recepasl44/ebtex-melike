import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export interface Program { id: number; name: string }
export interface Level { id: number; name: string }
export interface Classroom { id: number; name: string }
export interface Student { id: number; name: string }

interface TargetAudienceModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (students: Student[]) => void;
}

const TargetAudienceModal: React.FC<TargetAudienceModalProps> = ({ show, onClose, onSave }) => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const [selectedProgramId, setSelectedProgramId] = useState<number | ''>('');
    const [selectedLevelId, setSelectedLevelId] = useState<number | ''>('');
    const [selectedClassroomId, setSelectedClassroomId] = useState<number | ''>('');

    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

    const toArray = <T,>(value: unknown): T[] => {
        if (Array.isArray(value)) return value as T[];
        // some APIs wrap results in a `data` property
        if (value && typeof value === 'object' && Array.isArray((value as any).data)) {
            return (value as any).data as T[];
        }
        return [];
    };

    // Fetch programs when modal opens
    useEffect(() => {
        if (!show) return;
        axios
            .get<Program[]>('/api/programs')
            .then(res => {
                setPrograms(toArray<Program>(res.data));
            })
            .catch(() => setPrograms([]));
    }, [show]);

    // Fetch levels when program changes
    useEffect(() => {
        if (selectedProgramId === '') {
            setLevels([]);
            setSelectedLevelId('');
            return;
        }
        axios
            .get<Level[]>(`/api/programs/${selectedProgramId}/levels`)
            .then(res => {
                setLevels(toArray<Level>(res.data));
            })
            .catch(() => setLevels([]));
    }, [selectedProgramId]);

    // Fetch classrooms when level changes
    useEffect(() => {
        if (selectedLevelId === '') {
            setClassrooms([]);
            setSelectedClassroomId('');
            return;
        }
        axios
            .get<Classroom[]>(`/api/levels/${selectedLevelId}/classrooms`)
            .then(res => {
                setClassrooms(toArray<Classroom>(res.data));
            })
            .catch(() => setClassrooms([]));
    }, [selectedLevelId]);

    // Fetch students when classroom changes
    useEffect(() => {
        if (selectedClassroomId === '') {
            setStudents([]);
            return;
        }
        axios
            .get<Student[]>(`/api/classrooms/${selectedClassroomId}/students`)
            .then(res => setStudents(toArray<Student>(res.data)))
            .catch(() => setStudents([]));
    }, [selectedClassroomId]);

    const addStudent = useCallback(
        (student: Student) => {
            setSelectedStudents(prev => {
                if (prev.find(s => s.id === student.id)) return prev;
                return [...prev, student];
            });
        },
        []
    );

    const removeStudent = useCallback((id: number) => {
        setSelectedStudents(prev => prev.filter(s => s.id !== id));
    }, []);

    const handleSave = () => {
        onSave(selectedStudents);
        onClose();
    };

    const handleClear = () => {
        setSelectedStudents([]);
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Form.Select
                            className="mb-2"
                            value={selectedProgramId}
                            onChange={e => setSelectedProgramId(e.target.value ? Number(e.target.value) : '')}
                        >
                            <option value="">Okul Türü Seçiniz</option>
                            {programs.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            className="mb-2"
                            value={selectedLevelId}
                            onChange={e => setSelectedLevelId(e.target.value ? Number(e.target.value) : '')}
                            disabled={levels.length === 0}
                        >
                            <option value="">Seviye Seçiniz</option>
                            {levels.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select
                            className="mb-2"
                            value={selectedClassroomId}
                            onChange={e => setSelectedClassroomId(e.target.value ? Number(e.target.value) : '')}
                            disabled={classrooms.length === 0}
                        >
                            <option value="">Sınıf Seçiniz</option>
                            {classrooms.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                        <ListGroup>
                            {students.map(s => (
                                <ListGroup.Item key={s.id} className="d-flex justify-content-between align-items-center">
                                    <span>{s.name}</span>
                                    <Button size="sm" variant="success" onClick={() => addStudent(s)}>
                                        +
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <ListGroup>
                            {selectedStudents.map(s => (
                                <ListGroup.Item key={s.id} className="d-flex justify-content-between align-items-center">
                                    <span>{s.name}</span>
                                    <Button size="sm" variant="danger" onClick={() => removeStudent(s.id)}>
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