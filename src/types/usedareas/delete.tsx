import { UsedArea } from './list'
import { UsedAreasListStatus } from '../../enums/usedareas/list'

export interface UsedAreasDeleteState {
    data: UsedArea | null
    status: UsedAreasListStatus
    error: string | null
}
