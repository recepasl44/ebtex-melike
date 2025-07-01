import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import Pageheader from '../../../../page-header/pageheader';
import TabsContainer from '../../component/organisms/TabsContainer';

import EmployeeEarningsMonthTable from './month/table';
import EmployeeEarningsPeriodTable from './period/table';

const EmployeeAccrualIndex: React.FC = () => {
    /** -------------------------------------------------------------
     *  Tab başlıkları - renkler Planned / Given / Completed ödev
     *  sayfalarında kullanılan mor palet ile aynı yapıldı
     *  (#9E5CF7 – aktif   |  #9E5CF726 – pasif bg   |  beyaz / mor text)
     *  ------------------------------------------------------------- */
    const tabs = [
        {
            label: 'Aylık',
            content: <EmployeeEarningsMonthTable />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
        {
            label: 'Dönem',
            content: <EmployeeEarningsPeriodTable />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
    ];

    /* -------------------------------------------------------------
       URL (?accrualTab=0/1) -> aktif sekme senkronizasyonu
       ------------------------------------------------------------- */
    const location = useLocation();
    const navigate = useNavigate();

    const getTabFromSearch = () => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('accrualTab');
        return tab ? parseInt(tab, 10) : 0;
    };

    const [activeIdx, setActiveIdx] = useState<number>(getTabFromSearch());

    useEffect(() => {
        setActiveIdx(getTabFromSearch());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    return (
        <div>
            {/* <Pageheader title="Hakediş" currentpage={tabs[activeIdx].label} /> */}

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(parentIdx) => {
                    setActiveIdx(parentIdx);

                    /* sekme değiştiğinde URL query’sini güncelle */
                    const params = new URLSearchParams(location.search);
                    params.set('accrualTab', parentIdx.toString());
                    navigate(`${location.pathname}?${params.toString()}`, {
                        replace: true,
                    });
                }}
            />
        </div>
    );
};

export default EmployeeAccrualIndex;
