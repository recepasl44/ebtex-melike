import React, { useState } from 'react';
import Pageheader from '../../page-header/pageheader';
import TabsContainer from './component/organisms/TabsContainer';
import { useSearchParams } from 'react-router-dom';

import CurrentNewsletterTable from './pages/currentNewsletter/table';
import NotificationsTable from './pages/notifications/table';
import SmsTable from './pages/sms/table';
import EmailTable from './pages/e-mail/table';

const ContactPanelIndex: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabs = [
        {
            label: 'G\u00fcncel B\u00fclten',
            path: 'current-newsletter',
            content: <CurrentNewsletterTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Bildirimler',
            path: 'notifications',
            content: <NotificationsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'SMS',
            path: 'sms',
            content: <SmsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'E-Posta',
            path: 'e-mail',
            content: <EmailTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    const initialTab = searchParams.get('tab');
    const initialIdx = tabs.findIndex((t) => t.path === initialTab);
    const [activeIdx, setActiveIdx] = useState<number>(initialIdx >= 0 ? initialIdx : 0);

    const handleTabChange = (parentIdx: number) => {
        setActiveIdx(parentIdx);
        setSearchParams({ tab: tabs[parentIdx].path });
    };

    return (
        <div>
            <Pageheader
                title="İletişim  Paneli"
                currentpage={tabs[activeIdx].label}
            />
            <TabsContainer
                tabs={tabs}
                onTabChange={(parentIdx) => handleTabChange(parentIdx)}
            />
        </div>
    );
};

export default ContactPanelIndex;
