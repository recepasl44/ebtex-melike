
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchCounties } from '../../../slices/counties/list/thunk';
import { CountyLListArg } from '../../../types/counties/list';


export function useListCounties(params :CountyLListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter] = useState<any>(null);

  const { data,  status, error } = useSelector(
    (state: RootState) => state.countyList,
  );
 
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchCounties({ ...otherParams, filter }));
  }, [enabled, filter, dispatch]);


  const Countriesdata = data || [];



  return {
    data,
    Countriesdata,
    status,
    error,
  };
}
