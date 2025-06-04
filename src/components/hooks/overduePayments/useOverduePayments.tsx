import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverduePayments } from '../../../slices/overduePayments/list/thunk';
import { RootState, AppDispatch } from '../../../store';
import { OverduePaymentFilter } from '../../../enums/overduePayments/list';

export function useOverduePayments(

  initialPage: number = 1,
  initialPaginate: number = 25
) { 
  const dispatch = useDispatch<AppDispatch>();

  // Yerel state'ler: sayfa, sayfa boyutu, filtre ve arama terimi
  const [page, setPage] = useState<number>(initialPage);
  const [paginate, setPaginate] = useState<number>(initialPaginate);
  const [filter, setFilter] = useState<OverduePaymentFilter>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Redux state (fetchOverduePayments thunk tarafından güncellenen slice)
  const overduePaymentsState = useSelector((state: RootState) => state.overduePayments);

  // Parametreler (filtre, sayfa, paginate, arama terimi) değiştiğinde API'ye sorgu gönder
  useEffect(() => {
    dispatch(fetchOverduePayments({ filter, page, paginate }));
    // Eğer API endpoint'iniz arama terimini de destekliyorsa; thunk içine searchTerm ekleyip burada da ekleyebilirsiniz.
  }, [dispatch, filter, page, paginate, searchTerm]);

  return {
    ...overduePaymentsState, // data, current_page, total, per_page vb.
    page,
    paginate,
    filter,
    searchTerm,
    setPage,
    setPaginate,
    setFilter,
    setSearchTerm,
  };
}
export default useOverduePayments;
