// file: src/components/common/contactPanel/pages/currentNewsletter/TargetAudienceModal.tsx
import React, { useCallback, useState } from 'react';
import { Spinner } from 'react-bootstrap';
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

const overlayStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
};
const modalStyle: React.CSSProperties = {
    background: '#fff', color: '#000', borderRadius: 6, width: '90%', maxWidth: 800,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
};
const headerStyle: React.CSSProperties = {
    padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};
const bodyStyle: React.CSSProperties = { padding: '1rem', flex: 1, overflowY: 'auto' };
const columnsStyle: React.CSSProperties = { display: 'flex' };
const treeSectionStyle: React.CSSProperties = { flex: 1, borderRight: '1px solid #f0f0f0', paddingRight: '1rem' };
const selectedSectionStyle: React.CSSProperties = { flex: 1, paddingLeft: '1rem' };
const footerStyle: React.CSSProperties = {
    padding: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end'
};
const btnCircleStyle: React.CSSProperties = {
    width: 28, height: 28, borderRadius: '50%', border: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: '1rem',
};
const addBtnStyle: React.CSSProperties = { ...btnCircleStyle, background: '#e6fffb', color: '#13c2c2' };
const removeBtnStyle: React.CSSProperties = { ...btnCircleStyle, background: '#fff1f0', color: '#f5222d' };
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

    if (!show) return null;
    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                <div style={headerStyle}>
                    <span>Hedef Kitle</span>
                    <button style={btnCircleStyle} onClick={onClose}>×</button>
                </div>
                <div style={bodyStyle}>
                    <div style={columnsStyle}>
                        <div style={treeSectionStyle}>
                            {lp && <Spinner animation="border" size="sm" />}
                            {programs.map(p => (
                                <React.Fragment key={p.id}>
                                    <div style={{ ...treeRowStyle }}>
                                        <span onClick={() => toggleProgram(p.id)}>{p.name}</span>
                                        <button style={addBtnStyle} onClick={() => addItem('program', p.id, p.name)}>＋</button>
                                    </div>
                                    {expandedProgram === p.id && (
                                        <>
                                            {ll && <div style={{ ...indent(1) }}><Spinner animation="border" size="sm" /></div>}
                                            {levels.map(l => (
                                                <React.Fragment key={l.id}>
                                                    <div style={{ ...treeRowStyle, ...indent(1) }}>
                                                        <span onClick={() => toggleLevel(l.id)}>{l.name}</span>
                                                        <button style={addBtnStyle} onClick={() => addItem('level', l.id, l.name)}>＋</button>
                                                    </div>
                                                    {expandedLevel === l.id && (
                                                        <>
                                                            {lc && <div style={{ ...indent(2) }}><Spinner animation="border" size="sm" /></div>}
                                                            {classes.map(c => (
                                                                <React.Fragment key={c.id}>
                                                                    <div style={{ ...treeRowStyle, ...indent(2) }}>
                                                                        <span onClick={() => toggleClassroom(c.id)}>{c.name}</span>
                                                                        <button style={addBtnStyle} onClick={() => addItem('classroom', c.id, c.name)}>＋</button>
                                                                    </div>
                                                                    {expandedClassroom === c.id && (
                                                                        <>
                                                                            {ls && <div style={{ ...indent(3) }}><Spinner animation="border" size="sm" /></div>}
                                                                            {students.map((s: any) => (
                                                                                <div key={s.id} style={{ ...treeRowStyle, ...indent(3) }}>
                                                                                    <span>{s.first_name} {s.last_name}</span>
                                                                                    <button style={addBtnStyle} onClick={() => addItem('student', s.id, `${s.first_name} ${s.last_name}`)}>＋</button>
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
                            <h4 style={{ marginBottom: 8 }}>Eklentiler</h4>
                            {selectedItems.map(it => (
                                <div key={`${it.type}-${it.id}`} style={treeRowStyle}>
                                    <span>{it.name}</span>
                                    <button style={removeBtnStyle} onClick={() => removeItem(it.type, it.id)}>－</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={footerStyle}>
                    <button onClick={clearAll} style={{ marginRight: 8, padding: '6px 12px' }}>Temizle</button>
                    <button onClick={save} style={{ padding: '6px 12px', background: '#722ed1', color: '#fff', border: 'none' }}>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default TargetAudienceModal;
