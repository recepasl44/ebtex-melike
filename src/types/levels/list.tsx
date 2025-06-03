// src/types/levels/list.ts
export interface LevelData {
    id: number;
    program_id: number;
    program: {
      id: number;
      name: string;
      category_id: number;
      category: string;
    };
    name: string;
    level_id?: number | null;
  }
  export interface LevelMeta {
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
  export interface ListLevelResponse {
    data: LevelData[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: LevelMeta;
  }
  export interface LevelListArg {
    enabled?: boolean;
    [key: string]: any; 
  }
  