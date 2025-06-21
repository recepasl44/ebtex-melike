// file: src/components/common/contactPanel/pages/currentNewsletter/TargetAudienceModal.tsx
import React, { useCallback, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useProgramsTable as useProgramsList } from '../../../../hooks/program/useList';
import { useLevelsTable as useLevelsList } from '../../../../hooks/levels/useList';
import { useClassroomList as useClassroomsList } from '../../../../hooks/classrooms/useList';
import { useListStudents as useStudentsTable } from '../../../../hooks/student/useList';

import ekle from '../../../../../assets/images/media/ekle.svg';
import ekleHover from '../../../../../assets/images/media/ekle-hover.svg';
import cikar from '../../../../../assets/images/media/cikar.svg';
import cikarHover from '../../../../../assets/images/media/cikar-hover.svg';

export type AudienceItemType = 'program' | 'level' | 'classroom' | 'student';
export interface AudienceItem { id: number; name: string; type: AudienceItemType; }

interface TargetAudienceModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (selected: AudienceItem[]) => void;
}

const columnsStyle: React.CSSProperties = { display: 'flex' };
const treeSectionStyle: React.CSSProperties = {
    flex: 1,
    borderRight: '1px solid #f0f0f0',
    paddingRight: '1rem',
};
const selectedSectionStyle: React.CSSProperties = { flex: 1, paddingLeft: '1rem' };
const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.25rem 0',
};
const treeItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '0.25rem 0',
};
const lineStyle = (level: number): React.CSSProperties => ({
    position: 'absolute',
    left: `${level * 1.5}rem`,
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: '#e0e0e0',
});
const labelStyle = (level: number): React.CSSProperties => ({
    marginLeft: `${level * 1.5 + 0.5}rem`,
});

const IconButton: React.FC<{ add?: boolean; onClick: () => void }> = ({ add, onClick }) => {
    const [hover, setHover] = useState(false);
    const src = add ? (hover ? ekleHover : ekle) : hover ? cikarHover : cikar;
    return (
        <img
            src={src}
            style={{ width: 24, height: 24, marginLeft: 'auto', cursor: 'pointer' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        />
    );
};

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
    const isSelected = useCallback(
        (type: AudienceItemType, id: number) =>
            selectedItems.some(item => item.type === type && item.id === id),
        [selectedItems]
    );
    const clearAll = () => {
        setExpandedProgram(null);
        setExpandedLevel(null);
        setExpandedClassroom(null);
        setSelectedItems([]);
    };
    const save = () => {
        onSave(selectedItems);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="bg-white">
                <Modal.Title className="text-dark">Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }} className="bg-white">
                <div style={columnsStyle}>
                    <div style={treeSectionStyle}>
                        <h5 className="mb-3 text-dark fw-bold">Seçilebilir Kişiler</h5>
                        {lp && <Spinner size="sm" />}
                        {programs.map(p => (
                            <React.Fragment key={p.id}>
                                <div style={treeItemStyle}>
                                    <div style={lineStyle(0)} />
                                    <span
                                        onClick={() => toggleProgram(p.id)}
                                        className="text-dark link-offset-2 link-underline link-underline-opacity-0-hover"
                                        style={labelStyle(0)}
                                    >
                                        {p.name}
                                    </span>
                                    {isSelected('program', p.id) ? (
                                        <IconButton onClick={() => removeItem('program', p.id)} />
                                    ) : (
                                        <IconButton add onClick={() => addItem('program', p.id, p.name)} />
                                    )}
                                </div>
                                {expandedProgram === p.id && (
                                    <>
                                        {ll && <div style={treeItemStyle}><div style={lineStyle(1)} /><Spinner size="sm" /></div>}
                                        {levels.map(l => (
                                            <React.Fragment key={l.id}>
                                                <div style={treeItemStyle}>
                                                    <div style={lineStyle(1)} />
                                                    <span
                                                        onClick={() => toggleLevel(l.id)}
                                                        className="text-dark link-offset-2 link-underline link-underline-opacity-0-hover"
                                                        style={labelStyle(1)}
                                                    >
                                                        {l.name}
                                                    </span>
                                                    {isSelected('level', l.id) ? (
                                                        <IconButton onClick={() => removeItem('level', l.id)} />
                                                    ) : (
                                                        <IconButton add onClick={() => addItem('level', l.id, l.name)} />
                                                    )}
                                                </div>
                                                {expandedLevel === l.id && (
                                                    <>
                                                        {lc && <div style={treeItemStyle}><div style={lineStyle(2)} /><Spinner size="sm" /></div>}
                                                        {classes.map(c => (
                                                            <React.Fragment key={c.id}>
                                                                <div style={treeItemStyle}>
                                                                    <div style={lineStyle(2)} />
                                                                    <span
                                                                        onClick={() => toggleClassroom(c.id)}
                                                                        className="text-dark link-offset-2 link-underline link-underline-opacity-0-hover"
                                                                        style={labelStyle(2)}
                                                                    >
                                                                        {c.name}
                                                                    </span>
                                                                    {isSelected('classroom', c.id) ? (
                                                                        <IconButton onClick={() => removeItem('classroom', c.id)} />
                                                                    ) : (
                                                                        <IconButton add onClick={() => addItem('classroom', c.id, c.name)} />
                                                                    )}
                                                                </div>
                                                                {expandedClassroom === c.id && (
                                                                    <>
                                                                        {ls && <div style={treeItemStyle}><div style={lineStyle(3)} /><Spinner size="sm" /></div>}
                                                                        {students.map((s: any) => (
                                                                            <div key={s.id} style={treeItemStyle}>
                                                                                <div style={lineStyle(3)} />
                                                                                <span className="text-dark" style={labelStyle(3)}>{s.first_name} {s.last_name}</span>
                                                                                {isSelected('student', s.id) ? (
                                                                                    <IconButton onClick={() => removeItem('student', s.id)} />
                                                                                ) : (
                                                                                    <IconButton
                                                                                        add
                                                                                        onClick={() => {
                                                                                            const cls = classes.find(c => c.id === expandedClassroom);
                                                                                            const clsName = cls ? ` (${cls.name})` : '';
                                                                                            addItem('student', s.id, `${s.first_name} ${s.last_name}${clsName}`);
                                                                                        }}
                                                                                    />
                                                                                )}
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
                        <h5 className="mb-3 text-dark fw-bold">Eklenenler</h5>
                        {selectedItems.map(it => (
                            <div key={`${it.type}-${it.id}`} style={rowStyle}>
                                <span className="text-dark">{it.name}</span>
                                <IconButton onClick={() => removeItem(it.type, it.id)} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-white">
                <Button variant="outline-secondary" onClick={clearAll}>Temizle</Button>
                <Button variant="primary" onClick={save}>Kaydet</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TargetAudienceModal;
