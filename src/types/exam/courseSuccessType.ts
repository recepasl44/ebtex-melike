export interface Achievement {
  achievements_id: number;
  achievements_name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate: string;
  }[];
}

export interface Unit {
  unit_id: number;
  unit_name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate: string;
  }[];
  achievements: Achievement[]; 
}

export interface Result {
  id: number;
  name: string;
  colnums: {
    name: string;
    cell: string | number | null;
    rate: string;
  }[];
  units: Unit[];
  achievements: Achievement[];
}

export interface CourseSuccessData {
  analysis_report_id: number;
  results: Result[];
}