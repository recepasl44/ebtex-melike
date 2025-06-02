import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addCity } from '../../../slices/cities/add/thunk';
import { AddCityPayload } from '../../../types/city/add';

export function useCourseAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.cityAddSlice);

  const addNewCourse = useCallback(
    async (payload: AddCityPayload) => {
      const resultAction = await dispatch(addCity(payload));
      if (addCity.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedCourse: data, status, error, addNewCourse };
}