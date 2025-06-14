/* -------------------------------------------------------------------------- */
/*  src/types/attendance/list.ts                                              */
/*                                                                            */
/*  API: GET /api/v1/attendances – Örnek JSON’a göre tip tanımları             */
/* -------------------------------------------------------------------------- */

/* ► NOT: Bu dosya *sadece tip* içerir, herhangi bir iş mantığı barındırmaz.  */
/*   Yapılan değişiklikler / eklemeler dosya içinde “// ★” etiketiyle işaretli */
/* -------------------------------------------------------------------------- */

/* ---------- Yardımcı (inline) tipler ------------------------------------- */
export interface Group {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    platform_id: number;
}

// ★ Backend’de “days” dizisindeki değerler için küçük enum:
export type WeekDayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;      // 1 =Pzt … 7 =Paz

export interface AttendanceDay {
    id: number;
    attendance_id: number;
    day_id: WeekDayId;
    created_at: string;
    updated_at: string;
    platform_id: number;
}

export interface AttendanceStudentPivot {
    attendance_id: number;
    student_id: number;
}

export interface AttendanceStudent {
    id: number;
    register_no: number;
    branche_id: number;
    season_id: number;
    nationality_id: number;
    identification_no: string;
    gender_id: number;
    first_name: string;
    last_name: string;
    status: number;
    birthday: string;
    program_id: number;
    level_id: number;
    course_id: number;
    school_id: number;
    email: string;
    phone: string;
    mobile_phone: string;
    blood_type: string;
    illness: string | null;
    address_id: number;
    parent_id: number;
    financial_status: string;
    additional_information_1: string;
    additional_information_2: string;
    class_teacher: string;
    advisor_teacher: string;
    guide_teacher: string | null;
    profile_picture: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    student_no: number;
    class_teacher_id: number;
    advisor_teacher_id: number;
    guide_teacher_id: number;
    pivot: AttendanceStudentPivot;
}

export interface AttendanceTeacherPivot {
    attendance_id: number;
    teacher_id: number;
}

export interface AttendanceTeacher {
    id: number;
    personel_id: number;
    name_surname: string;
    short_name: string;
    branch: string;
    class_teacher_id: number;
    social_club: string;
    email: string;
    created_at: string | null;
    updated_at: string | null;
    pivot: AttendanceTeacherPivot;
}

/* ---------- Attendance ana modeli --------------------------------------- */
export interface AttendanceData {
    /* --- Opsiyonel / her modelde gelmeyen alanlar ----------------------- */
    manager_ids?: number[];            // ★  “[1,4,9]” gibi dizi – backend’de string bekleniyorsa string[]
    time_range?: string;               // "07:00 - 09:00"
    week_days?: WeekDayId[];           // ★ Backend’den dizi geliyorsa
    classroom_id?: number | null;
    area_id?: number | null;
    club_name?: string;
    /*
     * Bazı endpoint'lerde detay bilgisinde aşağıdaki alanlar da
     * gönderilebiliyor. Tip uyumsuzluklarını önlemek için opsiyonel
     * olarak tanımlandı.
     */
    lessons?: any[];
    sessions?: any[];
    lesson?: any;
    student?: any;
    /* Birebir planlarda ders bilgisinin id'si */
    lesson_id?: number;
    /* Öğretmen planı detayındaki haftalık zaman çizelgesi */
    timeTable?: any[];
    /* sayısal toplamlar sadece bazı endpoint’lerde dönüyor */
    late_count?: number;
    absent_count?: number;
    present_count?: number;

    /* --- Zorunlu alanlar -------------------------------------------------- */
    id: number;
    name: string;                      // “Yemek Yoklaması” vb.
    group_type_id: number;
    group_type: unknown | null;        // ★ Detay gelmediği için “unknown”
    group_id: number;
    group: Group | null;
    program_id: number;
    program: unknown | null;           // ★
    level_id: number;
    level: unknown | null;             // ★
    start_date: string;                // “YYYY-MM-DD HH:mm:ss”
    end_date: string;
    start_time: string;                // Nullable ise string | null yapın
    used_area_id: number | null;
    used_area: unknown | null;         // ★
    teacher_id?: number | null;
    teacher?: unknown | null;
    responsible_id?: number | null;
    responsible?: unknown | null;
    duty_teacher_id?: number | null;
    duty_teacher?: unknown | null;
    duty_user_id?: number | null;
    duty_user?: unknown | null;

    students: AttendanceStudent[];
    teachers: AttendanceTeacher[];
    days: AttendanceDay[];
    status: number;
}

/* ---------- Pagination -------------------------------------------------- */
export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface MetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

/* ---------- Response şablonu ------------------------------------------- */
export interface ListAttendancesResponse {
    data: AttendanceData[];
    links: Links;
    meta: Meta;
}

/* ---------- Hook/request parametreleri --------------------------------- */
export interface AttendancesListArg {
    enabled?: boolean;
    /* ★ Dinamik query parametreleri eklenebilsin diye index-signature korundu */
    [key: string]: unknown;
}
