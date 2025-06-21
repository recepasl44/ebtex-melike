// file: src/components/common/contactPanel/pages/currentNewsletter/TargetAudienceModal.tsx
import React, { useCallback, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useProgramsTable as useProgramsList } from '../../../../hooks/program/useList';
import { useLevelsTable as useLevelsList } from '../../../../hooks/levels/useList';
import { useClassroomList as useClassroomsList } from '../../../../hooks/classrooms/useList';
import { useListStudents as useStudentsTable } from '../../../../hooks/student/useList';

export type AudienceItemType = 'program' | 'level' | 'classroom' | 'student';
export interface AudienceItem { id: number; name: string; type: AudienceItemType; }

interface TargetAudienceModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (selected: AudienceItem[]) => void;
}

const columnsStyle: React.CSSProperties = { display: 'flex' };
const treeSectionStyle: React.CSSProperties = { flex: 1, borderRight: '1px solid #f0f0f0', paddingRight: '1rem' };
const selectedSectionStyle: React.CSSProperties = { flex: 1, paddingLeft: '1rem' };
const treeRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.25rem 0' };
const indent = (level: number): React.CSSProperties => ({ paddingLeft: `${level * 1}rem` });

const TargetAudienceModal: React.FC<TargetAudienceModalProps> = ({ show, onClose, onSave }) => {
    const [expandedProgram, setExpandedProgram] = useState<number | null>(null);
    const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
    const [expandedClassroom, setExpandedClassroom] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const { programsData: programs = [], loading: lp } = useProgramsList({ enabled: true });
    const { levelsData: levels = [], loading: ll } = useLevelsList({
        enabled: expandedProgram != null,
        program_id: expandedProgram ?? undefined,
    });
    const { classroomData: classes = [], loading: lc } = useClassroomsList({
        enabled: expandedLevel != null,
        program_id: expandedProgram ?? undefined,
        level_id: expandedLevel ?? undefined,
    });
    const { data: students = [], loading: ls } = useStudentsTable({
        enabled: expandedClassroom != null,
        classroom_id: expandedClassroom ?? undefined,
    });

    const toggleProgram = (id: number) => {
        setExpandedProgram(prev => (prev === id ? null : id));
        setExpandedLevel(null);
        setExpandedClassroom(null);
    };
    const toggleLevel = (id: number) => {
        setExpandedLevel(prev => (prev === id ? null : id));
        setExpandedClassroom(null);
    };
    const toggleClassroom = (id: number) => {
        setExpandedClassroom(prev => (prev === id ? null : id));
    };
    const addItem = useCallback((type: AudienceItemType, id: number, name: string) => {
        setSelectedItems(prev => prev.some(x => x.id === id && x.type === type) ? prev : [...prev, { type, id, name }]);
    }, []);
    const removeItem = useCallback((type: AudienceItemType, id: number) => {
        setSelectedItems(prev => prev.filter(x => !(x.id === id && x.type === type)));
    }, []);
    const clearAll = () => {
        setExpandedProgram(null);
        setExpandedLevel(null);
        setExpandedClassroom(null);
        setSelectedItems([]);
    };
    const save = () => { onSave(selectedItems); onClose(); };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <div style={columnsStyle}>
                    <div style={treeSectionStyle}>
                        <h5 className="mb-2">Seçilebilir Kişiler</h5>
                        {lp && <Spinner animation="border" size="sm" />}
                        {programs.map(p => (
                            <React.Fragment key={p.id}>
                                <div style={{ ...treeRowStyle }}>
                                    <span onClick={() => toggleProgram(p.id)}>{p.name}</span>
                                    <Button size="sm" variant="light-success" className="rounded-circle" onClick={() => addItem('program', p.id, p.name)}>
                                        <i className="ti ti-plus" />
                                    </Button>
                                </div>
                                {expandedProgram === p.id && (
                                    <>
                                        {ll && <div style={{ ...indent(1) }}><Spinner animation="border" size="sm" /></div>}
                                        {levels.map(l => (
                                            <React.Fragment key={l.id}>
                                                <div style={{ ...treeRowStyle, ...indent(1) }}>
                                                    <span onClick={() => toggleLevel(l.id)}>{l.name}</span>
                                                    <Button size="sm" variant="light-success" className="rounded-circle" onClick={() => addItem('level', l.id, l.name)}>
                                                        <i className="ti ti-plus" />
                                                    </Button>
                                                </div>
                                                {expandedLevel === l.id && (
                                                    <>
                                                        {lc && <div style={{ ...indent(2) }}><Spinner animation="border" size="sm" /></div>}
                                                        {classes.map(c => (
                                                            <React.Fragment key={c.id}>
                                                                <div style={{ ...treeRowStyle, ...indent(2) }}>
                                                                    <span onClick={() => toggleClassroom(c.id)}>{c.name}</span>
                                                                    <Button size="sm" variant="light-success" className="rounded-circle" onClick={() => addItem('classroom', c.id, c.name)}>
                                                                        <i className="ti ti-plus" />
                                                                    </Button>
                                                                </div>
                                                                {expandedClassroom === c.id && (
                                                                    <>
                                                                        {ls && <div style={{ ...indent(3) }}><Spinner animation="border" size="sm" /></div>}
                                                                        {students.map((s: any) => (
                                                                            <div key={s.id} style={{ ...treeRowStyle, ...indent(3) }}>
                                                                                <span>{s.first_name} {s.last_name}</span>
                                                                                <Button size="sm" variant="light-success" className="rounded-circle" onClick={() => addItem('student', s.id, `${s.first_name} ${s.last_name}`)}>
                                                                                    <i className="ti ti-plus" />
                                                                                </Button>
                                                                            </div>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div style={selectedSectionStyle}>
                        <h5 className="mb-2">Eklenenler</h5>
                        {selectedItems.map(it => (
                            <div key={`${it.type}-${it.id}`} style={treeRowStyle}>
                                <span>{it.name}</span>
                                <Button size="sm" variant="light-danger" className="rounded-circle" onClick={() => removeItem(it.type, it.id)}>
                                    <i className="ti ti-minus" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={clearAll}>Temizle</Button>
                <Button variant="primary" onClick={save}>Kaydet</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TargetAudienceModal;
