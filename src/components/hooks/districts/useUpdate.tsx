
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateDistrict } from '../../../slices/districts/update/thunk';
import { UpdateDistrictPayload } from '../../../types/districts/update';

export function useDiscrictUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.districtUpdate);

  const updateDiscrictDetails = useCallback(
    async (districtId: number, payload: UpdateDistrictPayload) => {
      const resultAction = await dispatch(updateDistrict({ districtId, payload }));
      if (updateDistrict.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedDiscrict: data, status, error, updateDiscrictDetails };
}
