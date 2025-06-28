import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pageheader from '../../page-header/pageheader';
import TabsContainer from './component/organisms/TabsContainer';

import CurrentNewsletterTable from './pages/currentNewsletter/table';
import NotificationsTable from './pages/notifications/table';
import SmsTable from './pages/sms/table';
import EmailTable from './pages/e-mail/table';
import MessagesIndex from './pages/messages';


const ContactPanelIndex: React.FC = () => {
    const loggedInUserId = 1;

    const tabs = [
        {
            label: 'Mesajlar',
            content: <MessagesIndex currentUserId={loggedInUserId.toString()} />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },

        {
            label: 'Güncel Bülten',
            content: <CurrentNewsletterTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Bildirimler',
            content: <NotificationsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'SMS',
            content: <SmsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'E-Posta',
            content: <EmailTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },

    ];

    const location = useLocation();
    const navigate = useNavigate();
    const getTabFromSearch = () => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        return tab ? parseInt(tab, 10) : 0;
    };

    const [activeIdx, setActiveIdx] = useState<number>(getTabFromSearch());

    useEffect(() => {
        setActiveIdx(getTabFromSearch());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    return (
        <div>
            <Pageheader
                title="İletişim  Paneli"
                currentpage={tabs[activeIdx].label}
            />
            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(parentIdx) => {
                    setActiveIdx(parentIdx);
                    const params = new URLSearchParams(location.search);
                    params.set('tab', parentIdx.toString());
                    navigate(`${location.pathname}?${params.toString()}`, {
                        replace: true,
                    });
                }}
            />
        </div>
    );
};

export default ContactPanelIndex;
