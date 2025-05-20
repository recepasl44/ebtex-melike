export interface Achievement {
  achievements_id: number;
  achievements_name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate?: string | number | null;
  }[];
}

export interface Unit {
  unit_id: number;
  unit_name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate?: string | number | null;
  }[];
  achievements: Achievement[]; 
}

export interface Result {
  id: number;
  name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate?: string | number | null;
  }[];
  units: Unit[];
  achievements: Achievement[];
}

export interface CourseSuccessData {
  analysis_report_id: number;
  results: Result[];
}