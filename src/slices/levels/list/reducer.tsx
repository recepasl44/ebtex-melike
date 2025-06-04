
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLevels } from './thunk';
import { ListLevelResponse } from '../../../types/levels/list';
import { LevelListStatus } from '../../../enums/levels/list';
interface LevelListState {
  data: ListLevelResponse['data'] | null;
  links: ListLevelResponse['links'] | null;
  meta: ListLevelResponse['meta'] | null;
  status: LevelListStatus;
  error: string | null;
}
const initialState: LevelListState = {
  data: null,
  links: null,
  meta: null,
  status: LevelListStatus.IDLE,
  error: null
};
const levelListSlice = createSlice({
  name: 'levels/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLevels.pending, (state) => {
      state.status = LevelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchLevels.fulfilled, (state, action: PayloadAction<ListLevelResponse>) => {
      state.status = LevelListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchLevels.rejected, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default levelListSlice.reducer;
