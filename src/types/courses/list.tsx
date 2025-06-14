export interface data {
branch: any;
student: any;
identity_no: string;
birth_date: string;
program: string;
is_guardion: boolean;
 
id : number;
level_id : number;
level: {
    id:number;
    program_id: number;
    program: {
        id: number;
        name: string;
        category_id: number;
        category:string;
    };
    name: string;
}
name: string;

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

export interface ListCourseResponse {
    data: data[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: meta;
}
export interface CourseListArg {
   enabled: boolean;
   [key:string]: any;
}
