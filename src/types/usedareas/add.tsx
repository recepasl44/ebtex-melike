import { UsedArea } from './list'
import { UsedAreasListStatus } from '../../enums/usedareas/list'

export interface UsedAreasAddPayload {
    id?: number
    name: string
}

export interface UsedAreasAddState {
    data: UsedArea | null
    status: UsedAreasListStatus
    error: string | null
}
