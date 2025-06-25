import React, { useState } from 'react';
import Pageheader from '../../page-header/pageheader';
import TabsContainer from './component/organisms/TabsContainer';

import CurrentNewsletterTable from './pages/currentNewsletter/table';
import NotificationsTable from './pages/notifications/table';
import SmsTable from './pages/sms/table';
import EmailTable from './pages/e-mail/table';
import MessagesPage from './pages/messages';

const ContactPanelIndex: React.FC = () => {

    const tabs = [

        {
            label: 'G\u00fcncel B\u00fclten',
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

    const [activeIdx, setActiveIdx] = useState<number>(0);

    return (
        <div>
            <Pageheader
                title="İletişim  Paneli"
                currentpage={tabs[activeIdx].label}
            />
            <TabsContainer
                tabs={tabs}
                onTabChange={(parentIdx) => setActiveIdx(parentIdx)}
            />
        </div>
    );
};

export default ContactPanelIndex;