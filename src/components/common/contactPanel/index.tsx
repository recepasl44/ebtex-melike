import React, { useState } from 'react';
import Pageheader from '../../page-header/pageheader';
import TabsContainer from './component/organisms/TabsContainer';

import CurrentNewsletterTable from './pages/currentNewsletter/table';
import NotificationsTable from './pages/notifications/table';
import SmsTable from './pages/sms/table';
import EmailTable from './pages/e-mail/table';

const ContactPanelIndex: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

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

  return (
    <div>
      <Pageheader title="\u0130leti\u015fim Paneli" currentpage="\u0130leti\u015fim Paneli" />
      <TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default ContactPanelIndex;
