import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSupplierNotes } from './thunk'
import { SupplierNotesListResponse, SupplierNoteData } from '../../../types/supplierNotes/list'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'

export interface SupplierNotesListState {
  data: SupplierNoteData[] | null
  current_page: number | null
  first_page_url: string | null
  from: number | null
  last_page: number | null
  last_page_url: string | null
  links: any[] | null
  next_page_url: string | null
  path: string | null
  per_page: number | null
  prev_page_url: string | null
  to: number | null
  total: number | null
  status: SupplierNotesListStatus
  error: string | null
}

const initialState: SupplierNotesListState = {
  data: null,
  current_page: null,
  first_page_url: null,
  from: null,
  last_page: null,
  last_page_url: null,
  links: null,
  next_page_url: null,
  path: null,
  per_page: null,
  prev_page_url: null,
  to: null,
  total: null,
  status: SupplierNotesListStatus.IDLE,
  error: null,
}

const supplierNotesListSlice = createSlice({
  name: 'supplierNotesList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSupplierNotes.pending, (state) => {
      state.status = SupplierNotesListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchSupplierNotes.fulfilled, (state, action: PayloadAction<SupplierNotesListResponse>) => {
      state.status = SupplierNotesListStatus.SUCCEEDED
      state.data = action.payload.data
      state.current_page = action.payload.current_page
      state.first_page_url = action.payload.first_page_url
      state.from = action.payload.from
      state.last_page = action.payload.last_page
      state.last_page_url = action.payload.last_page_url
      state.links = action.payload.links
      state.next_page_url = action.payload.next_page_url
      state.path = action.payload.path
      state.per_page = action.payload.per_page
      state.prev_page_url = action.payload.prev_page_url
      state.to = action.payload.to
      state.total = action.payload.total
    })
    builder.addCase(fetchSupplierNotes.rejected, (state, action: PayloadAction<any>) => {
      state.status = SupplierNotesListStatus.FAILED
      state.error = action.payload || 'Fetch supplier notes failed'
    })
  },
})

export default supplierNotesListSlice.reducer
