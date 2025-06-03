
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addDistrict } from '../../../slices/districts/add/thunk';
import { AddDistrictPayload } from '../../../types/districts/add';

export function useDiscrictAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.districtAdd);

  const addNewDistrict = useCallback(
    async (payload: AddDistrictPayload) => {


      const resultAction = await dispatch(addDistrict(payload));
      if (addDistrict.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedDistrict: data, status, error, addNewDistrict };
}
