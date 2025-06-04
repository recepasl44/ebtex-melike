import { FormikValues } from "formik";
import { LevelBrief } from "../../../../types/student/list";

export interface StudentInfosForm extends FormikValues {
    student_id: string;
    first_name: string;
    last_name: string;
    birthday?: string;
    birthplace?: string;
    level?: string | LevelBrief;
    special_conditions?: string;
    extracurricular_activities?: string;
    hobbies_and_skills?: string;
    identification_no?: string;
    residential_address?: string;
    school?: string;
    transportation_status?: number;
    emergency_contact_info?: string;
    medical_support?: string;
}

export interface MotherInfosForm extends FormikValues {
      kinship_id: number,
      full_name: string,
      education: string,
      profession: string,
      birthday: string,
      health: string,
      email: string,
      phone: string,
        birthplace: string;  
}

export interface FatherInfosForm extends FormikValues {
      kinship_id: number,
      full_name: string,
      education: string,
      profession: string,
      birthday: string,
      health: string,
      email: string,
      phone: string,
        birthplace: string;  
}

export interface ParentInfosForm extends FormikValues {
      kinship_id: number,
      full_name: string,
      education: string,
      profession: string,
      birthday: string,
      health: string,
      email: string,
      phone: string,
        birthplace: string;  
}

export interface OtherInfosForm extends FormikValues {
    number_of_siblings: number;
    psychological_status: string;
    birth_order: number;
    academic_performance: string;
    chronic_illness: string;
    support_educations: string;
    household_members: string;
    additional_notes: string;
}
export interface SocialInfosForm extends FormikValues {
    birth_order: number;
    number_of_siblings: number;
    psychological_status: string;
    academic_performance: string;
}
export interface MeetingInfosForm extends FormikValues {
    meeting_topic: string;
    guidance_name: string;
    meeting_notes: string;
    meeting_date: string;
}