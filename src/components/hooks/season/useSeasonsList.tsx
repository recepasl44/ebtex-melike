import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSeasons } from '../../../slices/seasons/list/thunk';
import { SeasonListStatus } from '../../../enums/seasons/list';

export function useSeasonsList(params: any) {
    const dispatch = useDispatch<AppDispatch>();

    /* ───── Pagination state ───── */
    const [page, setPage] = useState<number>(params.page || 1);
    const [paginate, setPaginate] = useState<number>(params.paginate || 10);

    /* ───── Diğer filtreler ───── */
    const [filter, setFilter] = useState<any>(null);

    /* ───── Redux slice verisi ───── */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.seasonsListSlice,
    );

    /* ───── Fetch tetikleyici ───── */
    const { enabled, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchSeasons({
                ...otherParams,
                page,
                paginate,   // <─ yeni anahtar adı
                filter,
            }),
        );
    }, [
        enabled,
        filter,
        page,
        paginate,
        dispatch,
        otherParams.program_id,
    ]);

    /* ───── Geri dönüş verileri ───── */
    const loading = status === SeasonListStatus.LOADING;
    const seasonsData = data || [];
    const totalPages = meta ? meta.last_page : 1;
    // Eğer meta bilgisi yoksa toplam kayıt sayısını eldeki veri uzunluğundan hesapla
    const totalItems = meta ? meta.total : seasonsData.length;

    return {
        seasonsData,
        loading,
        error,
        page,
        setPage,
        paginate,
        setPaginate,
        filter,
        setFilter,
        totalPages,
        totalItems,
    };
}
