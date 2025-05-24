/* -------------------------------------------------------------------------- */
/* crud.tsx – Öğretmen Birebir ›  Ekle / Düzenle (Modal + Tablo)              */
/* -------------------------------------------------------------------------- */

import { useEffect, useMemo, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';

import ReusableModalForm from '../../../../ReusableModalForm';
import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

/* ---- Attendance CRUD (örnek) ------------------------------------------- */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

/* ---- yardımcı listeler (ders / alan) ----------------------------------- */
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

/* ---- tablo satır tipi -------------------------------------------------- */
interface Row {
    time_range: string;  // “09:00 – 09:20”
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

/* ---- form verisi ------------------------------------------------------- */
interface IForm {
    teacher_id: string;
    lesson_id: string;
    rows: Row[];
}

/* ======================================================================= */
export default function TeacherPlanCrudModal({
    show,
    onClose,
    onRefresh,
}: {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {

    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';

    /* ───── yardımcı listeler (ders / alan) ───── */
    const { lessonsData = [] } = useLessonList({ enabled: true });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: true });

    /* ───── CRUD hook’ları ───── */
    const { addNewAttendance,
        status: addSt, error: addErr } = useAttendanceAdd();

    const { updateExistingAttendance,
        status: updSt, error: updErr } = useAttendanceUpdate();

    const { attendance: fetched,
        status: detSt, error: detErr,
        getAttendance } =
        useAttendanceDetail({ attendanceId: Number(id), enabled: !!id });

    /* ───── form state ───── */
    const [initial, setInitial] = useState<IForm>({
        teacher_id: '',
        lesson_id: '',
        rows: [
            {
                time_range: '', monday: '', tuesday: '', wednesday: '', thursday: '',
                friday: '', saturday: '', sunday: ''
            },
        ],
    });

    /* ---- detay çek (update) -------------------------------------------- */
    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [id]);

    useEffect(() => {
        if (mode === 'update' && fetched) {
            // fetched içindeki dizi verilerini kendi formatınıza göre eşleyin
            setInitial({
                teacher_id: String(fetched.teachers?.[0]?.id ?? ''),
                lesson_id: String(fetched.lesson_id ?? ''),
                rows: fetched.plan_rows ?? [],     // backend’de plan satırları
            });
        }
    }, [fetched, mode]);

    /* ---- tablo kolonları ------------------------------------------------ */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'time_range', label: 'Saat Aralıkları', editable: true },

        { key: 'monday', label: 'Pazartesi', editable: true },
        { key: 'tuesday', label: 'Salı', editable: true },
        { key: 'wednesday', label: 'Çarşamba', editable: true },
        { key: 'thursday', label: 'Perşembe', editable: true },
        { key: 'friday', label: 'Cuma', editable: true },
        { key: 'saturday', label: 'Cumartesi', editable: true },
        { key: 'sunday', label: 'Pazar', editable: true },
    ], []);

    /* ---- kaydet --------------------------------------------------------- */
    async function handleSave(values: IForm, _h: FormikHelpers<IForm>) {
        const payload = {
            ...values,
            teacher_id: Number(values.teacher_id),
            lesson_id: Number(values.lesson_id),
        };

        if (mode === 'add')
            await addNewAttendance(payload as any);
        else if (id)
            await updateExistingAttendance({ attendanceId: +id, payload });

        onRefresh();
        onClose();
    }

    /* ---- UI state ------------------------------------------------------- */
    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    const combinedErr = addErr || updErr || detErr || null;

    /* ---- render --------------------------------------------------------- */
    return (
        <ReusableModalForm<IForm>
            show={show}
            mode="table"              /* ReusableModalForm “table” modu         */
            title={mode === 'add' ? 'Öğretmen Ekle' : 'Öğretmen Detay / Düzenle'}
            initialValues={initial}
            onSubmit={handleSave}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={combinedErr}
            autoGoBackOnModalClose
            onClose={onClose}
        >
            {/* ---- üst kısımda basit alanlar ---- */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label fw-semibold">Öğretmen</label>
                    <select name="teacher_id" className="form-select"
                        defaultValue={initial.teacher_id}>
                        <option value="">Seçiniz</option>
                        {fetched?.teachers?.map(t => (
                            <option key={t.id} value={t.id}>{t.name_surname}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Ders</label>
                    <select name="lesson_id" className="form-select"
                        defaultValue={initial.lesson_id}>
                        <option value="">Seçiniz</option>
                        {lessonsData.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ---- plan tablosu ---- */}
            <ReusableTable<Row>
                showModal                   /* tablo modal içinde render edilir       */
                columns={columns}
                data={initial.rows}
                tableMode="single"
                onAdd={() => {
                    setInitial(p => ({
                        ...p,
                        rows: [...p.rows,
                        {
                            time_range: '', monday: '', tuesday: '', wednesday: '',
                            thursday: '', friday: '', saturday: '', sunday: ''
                        }],
                    }));
                }}
                onChange={(d: any) => setInitial(p => ({ ...p, rows: d }))}
                showExportButtons={false}
            />
        </ReusableModalForm>
    );
}
