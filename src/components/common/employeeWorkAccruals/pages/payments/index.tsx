import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsContainer from '../../component/organisms/TabsContainer';

import PersonnelPaymentsMonthTable from './month/table';
import PersonnelPaymentsPeriodTable from './period/table';

const EmployeePaymentsIndex: React.FC = () => {
    const tabs = [
        {
            label: 'Aylık',
            content: <PersonnelPaymentsMonthTable />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
        {
            label: 'Dönem',
            content: <PersonnelPaymentsPeriodTable />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
    ];

    const location = useLocation();
    const navigate = useNavigate();

    const getTabFromSearch = () => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('paymentTab');
        return tab ? parseInt(tab, 10) : 0;
    };

    const [activeIdx, setActiveIdx] = useState<number>(getTabFromSearch());

    useEffect(() => {
        setActiveIdx(getTabFromSearch());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    return (
        <div>
            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(parentIdx) => {
                    setActiveIdx(parentIdx);
                    const params = new URLSearchParams(location.search);
                    params.set('paymentTab', parentIdx.toString());
                    navigate(`${location.pathname}?${params.toString()}`, {
                        replace: true,
                    });
                }}
            />
        </div>
    );
};

export default EmployeePaymentsIndex;
