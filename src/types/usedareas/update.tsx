import { UsedArea } from './list'
import { UsedAreasListStatus } from '../../enums/usedareas/list'

export interface UsedAreasUpdatePayload {
    usedAreaId: number
    payload: {
        id?: number
        name: string
    }
}

export interface UsedAreasUpdateState {
    data: UsedArea | null
    status: UsedAreasListStatus
    error: string | null
}
