// file: src/components/common/contactPanel/pages/currentNewsletter/TargetAudienceModal.tsx
import React, { useCallback, useState } from 'react';
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
const treeHeaderStyle: React.CSSProperties = { fontWeight: 500, cursor: 'pointer', padding: '0.5rem 0' };
const treeRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.25rem 0' };
const indent = (level: number): React.CSSProperties => ({ paddingLeft: `${level * 1}rem` });

const TargetAudienceModal: React.FC<TargetAudienceModalProps> = ({ show, onClose, onSave }) => {
    const [opened, setOpened] = useState({ program: false, level: false, classroom: false, student: false });
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const { programsData: programs = [], loading: lp } = useProgramsList({ enabled: opened.program });
    const { levelsData: levels = [], loading: ll } = useLevelsList({
        enabled: opened.level && selectedProgram != null,
        program_id: selectedProgram ?? undefined,
    });
    const { classroomData: classes = [], loading: lc } = useClassroomsList({
        enabled: opened.classroom && selectedLevel != null,
        program_id: selectedProgram ?? undefined,
        level_id: selectedLevel ?? undefined,
    });
    const { data: students = [], loading: ls } = useStudentsTable({
        enabled: opened.student && selectedClassroom != null,
        classroom_id: selectedClassroom ?? undefined,
    });

    const toggle = (k: keyof typeof opened) => setOpened(prev => ({ ...prev, [k]: !prev[k] }));
    const addItem = useCallback((type: AudienceItemType, id: number, name: string) => {
        setSelectedItems(prev => prev.some(x => x.id === id && x.type === type) ? prev : [...prev, { type, id, name }]);
    }, []);
    const removeItem = useCallback((type: AudienceItemType, id: number) => {
        setSelectedItems(prev => prev.filter(x => !(x.id === id && x.type === type)));
    }, []);
    const clearAll = () => {
        setOpened({ program: false, level: false, classroom: false, student: false });
        setSelectedProgram(null); setSelectedLevel(null); setSelectedClassroom(null);
        setSelectedItems([]);
    };
    const save = () => { onSave(selectedItems); onClose(); };
    const loadingSpan = (f: boolean) => f ? <span style={{ color: '#888' }}>Yükleniyor...</span> : null;

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
                            <div style={treeHeaderStyle} onClick={() => toggle('program')}>Program</div>
                            {opened.program && (
                                <>
                                    {loadingSpan(lp)}
                                    {programs.map(p => (
                                        <div key={p.id} style={{ ...treeRowStyle, ...indent(1) }}>
                                            <span onClick={() => {
                                                setSelectedProgram(p.id);
                                                setOpened(o => ({ ...o, level: false, classroom: false, student: false }));
                                            }}>{p.name}</span>
                                            <button style={addBtnStyle} onClick={() => addItem('program', p.id, p.name)}>＋</button>
                                        </div>
                                    ))}
                                </>
                            )}
                            {selectedProgram != null && (
                                <>
                                    <div style={{ ...treeHeaderStyle, ...indent(1) }} onClick={() => toggle('level')}>Seviye</div>
                                    {opened.level && (
                                        <>
                                            {loadingSpan(ll)}
                                            {levels.map(l => (
                                                <div key={l.id} style={{ ...treeRowStyle, ...indent(2) }}>
                                                    <span onClick={() => {
                                                        setSelectedLevel(l.id);
                                                        setOpened(o => ({ ...o, classroom: false, student: false }));
                                                    }}>{l.name}</span>
                                                    <button style={addBtnStyle} onClick={() => addItem('level', l.id, l.name)}>＋</button>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                            {selectedLevel != null && (
                                <>
                                    <div style={{ ...treeHeaderStyle, ...indent(2) }} onClick={() => toggle('classroom')}>Sınıf</div>
                                    {opened.classroom && (
                                        <>
                                            {loadingSpan(lc)}
                                            {classes.map(c => (
                                                <div key={c.id} style={{ ...treeRowStyle, ...indent(3) }}>
                                                    <span onClick={() => {
                                                        setSelectedClassroom(c.id);
                                                        setOpened(o => ({ ...o, student: false }));
                                                    }}>{c.name}</span>
                                                    <button style={addBtnStyle} onClick={() => addItem('classroom', c.id, c.name)}>＋</button>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                            {selectedClassroom != null && (
                                <>
                                    <div style={{ ...treeHeaderStyle, ...indent(3) }} onClick={() => toggle('student')}>Öğrenci</div>
                                    {opened.student && (
                                        <>
                                            {loadingSpan(ls)}
                                            {students.map((s: any) => (
                                                <div key={s.id} style={{ ...treeRowStyle, ...indent(4) }}>
                                                    <span>{s.first_name} {s.last_name}</span>
                                                    <button style={addBtnStyle} onClick={() => addItem('student', s.id, `${s.first_name} ${s.last_name}`)}>＋</button>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
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
