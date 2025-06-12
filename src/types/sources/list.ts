export interface SourceData {
  id?: number;
  source_type_id: number;
  source_type: any;
  class_section: string;
  subject: string;
  teacher_id: number;
  teacher: any;
  name: string;
  planned_assignment_count: number;
  status: number;
}

export interface SourceLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface SourceMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ListSourcesResponse {
  data: SourceData[];
  links: SourceLinks;
  meta: SourceMeta;
}

export interface SourceListArg {
  enabled?: boolean;
  [key: string]: any;
}
