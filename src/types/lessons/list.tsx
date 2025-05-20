export interface data {
    id: number;
    name: string;
    cover: string | null;
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
    ]
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface ListLessonsResponse {
    data: data[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: meta;
}

export interface LessonsListArg {
    enabled?: boolean;
    [key: string]: any;
}
