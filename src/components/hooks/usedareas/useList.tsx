/* src/hooks/usedareas/useList.ts -----------------------------------------*/
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';

import { fetchUsedAreas } from '../../../slices/usedareas/list/thunk';

import {
    UsedAreasListArg, UsedArea, UsedAreasMeta,
} from '../../../types/usedareas/list';
import { UsedAreasListStatus } from '../../../enums/usedareas/list';

export function useUsedAreasList(params: UsedAreasListArg) {
    const dispatch = useDispatch<AppDispatch>();

    /* ------------------------------------------------------------------ */
    /* yerel pagination – başlangıç değerleri props’tan                   */
    const [page, setPage] = useState<number>(params.page ?? 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize ?? 25);

    /* ek filtre  (örn. arama kutusu)                                     */
    const [filter, setFilter] = useState<any>(null);

    /* ------------------------------------------------------------------ */
    /* redux store                                                        */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.usedAreasList,
    );

    /* ------------------------------------------------------------------ */
    /* params içinden enabled + geri kalanları ayır                       */
    const {
        enabled = true,
        /* <-––– aşağıya ek primitive alanlarınızı yazın –––> */
        area_type_id,
        search,
    } = params;

    /* ------------------------------------------------------------------ */
    /* yalnızca enabled === true iken API çağrısı                          */
    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchUsedAreas({
                enabled: true,         // slice thunk için gerekir
                area_type_id,
                search,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            }),
        );
    }, [
        enabled,                  // aç / kapa
        area_type_id, search,     // primitive parametreler
        filter, page, pageSize,   // local state
        dispatch,
    ]);

    /* ------------------------------------------------------------------ */
    /* dönen veri / yardımcı metrikler                                    */
    const loading = status === UsedAreasListStatus.LOADING;
    const usedAreasData: UsedArea[] = data ?? [];

    const paginationMeta: UsedAreasMeta | null = meta ?? null;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    /* ------------------------------------------------------------------ */
    return {
        /* data  */
        usedAreasData,
        loading,
        error,

        /* pagination */
        page, setPage,
        pageSize, setPageSize,
        totalPages, totalItems,

        /* filtre */
        filter, setFilter,
    };
}
