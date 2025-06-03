
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPrograms } from './thunk';
import { ListProgramResponse } from '../../../types/programs/list';  
import { ProgramListStatus } from '../../../enums/programs/list';  

const initialState: {
  data: ListProgramResponse['data'] | null;
  links: ListProgramResponse['links'] | null;
  meta: ListProgramResponse['meta'] | null;
  status: ProgramListStatus;
  error: string | null;
} = {
  data: null,
  links: null,
  meta: null,
  status: ProgramListStatus.IDLE,
  error: null,
};

const programListSlice = createSlice({
  name: 'programList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.status = ProgramListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<ListProgramResponse>) => {
        state.status = ProgramListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchPrograms.rejected, (state, action: PayloadAction<any>) => {
        state.status = ProgramListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default programListSlice.reducer;
