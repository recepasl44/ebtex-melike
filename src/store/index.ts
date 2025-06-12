
import { configureStore } from '@reduxjs/toolkit';
import customRootReducer from './rootReducer';
import { useDispatch } from 'react-redux';
const store = configureStore({
  reducer: customRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
