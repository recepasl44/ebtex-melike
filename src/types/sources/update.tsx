import { SourceData } from './list';
import SourcesListStatus from '../../enums/sources/list';

export interface SourcesUpdatePayload {
    sourceId: number;
    payload: {
        source_type_id?: number;
        source_type?: string | null;
        class_section?: string;
        subject?: string;
        teacher_id?: number;
        teacher?: any;
        name?: string;
        planned_assignment_count?: number;
        status?: number;
    };
}

export interface SourcesUpdateState {
    data: SourceData | null;
    status: SourcesListStatus;
    error: string | null;
}
