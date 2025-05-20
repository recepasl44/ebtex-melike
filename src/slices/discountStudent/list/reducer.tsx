import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDiscountStudents } from './thunk';
import { ListDiscountStudentResponse } from '../../../types/discountStudent/list';
import { DiscountStudentListStatus } from '../../../enums/discountStudent/list';

export interface DiscountStudentListState {
  data: ListDiscountStudentResponse['data'] | null;
  links: ListDiscountStudentResponse['links'] | null;
  meta: ListDiscountStudentResponse['meta'] | null;
  status: DiscountStudentListStatus;
  error: string | null;
}

const initialState: DiscountStudentListState = {
  data: null,
  links: null,
  meta: null,
  status: DiscountStudentListStatus.IDLE,
  error: null,
};

const discountStudentListSlice = createSlice({
  name: 'discountStudent/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscountStudents.pending, (state) => {
      state.status = DiscountStudentListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchDiscountStudents.fulfilled, (state, action: PayloadAction<ListDiscountStudentResponse>) => {
      state.status = DiscountStudentListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchDiscountStudents.rejected, (state, action: PayloadAction<any>) => {
      state.status = DiscountStudentListStatus.FAILED;
      state.error = action.payload || 'Fetch discount students failed';
    });
  },
});

export default discountStudentListSlice.reducer;
