export interface SourceTypeData {
    id: number;
    name: string;
}

export interface SourceTypesLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface SourceTypesMeta {
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

export interface SourceTypesListResponse {
    data: SourceTypeData[];
    links: SourceTypesLinks;
    meta: SourceTypesMeta;
}

export interface SourceTypesListArg {
    enabled?: boolean;
    [key: string]: any;
}
