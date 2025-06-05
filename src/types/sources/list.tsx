export interface SourceData {
    id(id: any): string;
    source_type_id: number;
    source_type: string | null;
    class_section: string;
    subject: string;
    teacher_id: number;
    teacher: any;
    name: string;
    planned_assignment_count: number;
    status: number;
}

export interface SourcesLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface SourcesMeta {
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

export interface SourcesListResponse {
    data: SourceData[];
    links: SourcesLinks;
    meta: SourcesMeta;
}

export interface SourcesListArg {
    enabled?: boolean;
    [key: string]: any;
}
