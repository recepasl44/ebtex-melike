import { useCallback, useState } from 'react';
import {
    useProgramsTable as useProgramsList,
} from '../../../../hooks/program/useList';
import {
    useLevelsTable as useLevelsList,
} from '../../../../hooks/levels/useList';
import {
    useClassroomList as useClassroomsList,
} from '../../../../hooks/classrooms/useList';
import {
    useListStudents as useStudentsTable,
} from '../../../../hooks/student/useList';

export type AudienceItemType =
    | 'program'
    | 'level'
    | 'classroom'
    | 'student';

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
    const [opened, setOpened] = useState({
        program: false,
        level: false,
        classroom: false,
        student: false,
    });
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(
        null
    );
    const [selectedItems, setSelectedItems] = useState<AudienceItem[]>([]);

    const { programsData: programs = [], loading: loadingPrograms } =
        useProgramsList({ enabled: opened.program });

    const { levelsData: levels = [], loading: loadingLevels } = useLevelsList({
        enabled: opened.level && selectedProgram !== null,
        program_id: selectedProgram ?? undefined,
    });

    const { classroomData: classrooms = [], loading: loadingClassrooms } =
        useClassroomsList({
            enabled: opened.classroom && selectedLevel !== null,
            program_id: selectedProgram ?? undefined,
            level_id: selectedLevel ?? undefined,
        });

    const { data: students = [], loading: loadingStudents } = useStudentsTable({
        enabled: opened.student && selectedClassroom !== null,
        classroom_id: selectedClassroom ?? undefined,
    });

    const toggleSection = (key: keyof typeof opened) =>
        setOpened((prev) => ({ ...prev, [key]: !prev[key] }));

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

    const removeItem = useCallback((type: AudienceItemType, id: number) => {
        setSelectedItems((prev) =>
            prev.filter((p) => !(p.id === id && p.type === type))
        );
    }, []);

    const handleClear = () => {
        setOpened({ program: false, level: false, classroom: false, student: false });
        setSelectedProgram(null);
        setSelectedLevel(null);
        setSelectedClassroom(null);
        setSelectedItems([]);
    };

    const handleSave = () => {
        onSave(selectedItems);
        onClose();
    };

    if (!show) return null;

    const renderLoading = (flag: boolean) =>
        flag ? <span className="loading">Yükleniyor...</span> : null;

    return (
        <div className="ta-modal-overlay" onClick={onClose}>
            <div
                className="ta-modal"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="ta-header">
                    <span>Hedef Kitle</span>
                    <button className="btn-circle" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="ta-body">
                    <div className="ta-columns">
                        <div className="tree-section" style={{ flex: 1 }}>
                            <div
                                className="tree-row tree-header"
                                onClick={() => toggleSection('program')}
                            >
                                Program
                            </div>
                            {opened.program && (
                                <div className="tree-items">
                                    {renderLoading(loadingPrograms)}
                                    {programs.map((p) => (
                                        <div
                                            key={p.id}
                                            className="tree-row indent-1"
                                        >
                                            <span
                                                className="label"
                                                onClick={() => {
                                                    setSelectedProgram(p.id);
                                                    setOpened((o) => ({
                                                        ...o,
                                                        level: false,
                                                        classroom: false,
                                                        student: false,
                                                    }));
                                                }}
                                            >
                                                {p.name}
                                            </span>
                                            <button
                                                className="btn-circle"
                                                onClick={() =>
                                                    addItem('program', p.id, p.name)
                                                }
                                            >
                                                ＋
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedProgram !== null && (
                                <>
                                    <div
                                        className="tree-row tree-header indent-1"
                                        onClick={() => toggleSection('level')}
                                    >
                                        Seviye
                                    </div>
                                    {opened.level && (
                                        <div className="tree-items">
                                            {renderLoading(loadingLevels)}
                                            {levels.map((l) => (
                                                <div
                                                    key={l.id}
                                                    className="tree-row indent-2"
                                                >
                                                    <span
                                                        className="label"
                                                        onClick={() => {
                                                            setSelectedLevel(l.id);
                                                            setOpened((o) => ({
                                                                ...o,
                                                                classroom: false,
                                                                student: false,
                                                            }));
                                                        }}
                                                    >
                                                        {l.name}
                                                    </span>
                                                    <button
                                                        className="btn-circle"
                                                        onClick={() =>
                                                            addItem(
                                                                'level',
                                                                l.id,
                                                                l.name
                                                            )
                                                        }
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            {selectedLevel !== null && (
                                <>
                                    <div
                                        className="tree-row tree-header indent-2"
                                        onClick={() => toggleSection('classroom')}
                                    >
                                        Sınıf
                                    </div>
                                    {opened.classroom && (
                                        <div className="tree-items">
                                            {renderLoading(loadingClassrooms)}
                                            {classrooms.map((c) => (
                                                <div
                                                    key={c.id}
                                                    className="tree-row indent-3"
                                                >
                                                    <span
                                                        className="label"
                                                        onClick={() => {
                                                            setSelectedClassroom(c.id);
                                                            setOpened((o) => ({
                                                                ...o,
                                                                student: false,
                                                            }));
                                                        }}
                                                    >
                                                        {c.name}
                                                    </span>
                                                    <button
                                                        className="btn-circle"
                                                        onClick={() =>
                                                            addItem(
                                                                'classroom',
                                                                c.id,
                                                                c.name
                                                            )
                                                        }
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            {selectedClassroom !== null && (
                                <>
                                    <div
                                        className="tree-row tree-header indent-3"
                                        onClick={() => toggleSection('student')}
                                    >
                                        Öğrenci
                                    </div>
                                    {opened.student && (
                                        <div className="tree-items">
                                            {renderLoading(loadingStudents)}
                                            {students.map((s: any) => (
                                                <div
                                                    key={s.id}
                                                    className="tree-row indent-4"
                                                >
                                                    <span className="label">
                                                        {s.first_name} {s.last_name}
                                                    </span>
                                                    <button
                                                        className="btn-circle"
                                                        onClick={() =>
                                                            addItem(
                                                                'student',
                                                                s.id,
                                                                `${s.first_name} ${s.last_name}`
                                                            )
                                                        }
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="selected-section" style={{ flex: 1 }}>
                            <h4>Seçilenler</h4>
                            {selectedItems.map((item) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className="tree-row"
                                >
                                    <span className="label">{item.name}</span>
                                    <button
                                        className="btn-circle"
                                        onClick={() => removeItem(item.type, item.id)}
                                    >
                                        －
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ta-footer">
                    <button onClick={handleClear}>Temizle</button>
                    <button onClick={handleSave}>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default TargetAudienceModal;

