export interface Program {
  id: number;
  name: string;
  category_id?: number;
  category?: string;
}

export interface meta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string;
      active: boolean;
    }
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ListProgramResponse {
  data: Program[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: meta;
}

export interface ProgramListArg {
  [key: string]: any;
  enabled: boolean;
}
