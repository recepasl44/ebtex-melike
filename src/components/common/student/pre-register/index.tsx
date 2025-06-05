import React, { useState } from 'react';
import TabsContainer from '../../guidance/components/organisms/TabsContainer';
import Pageheader from '../../../page-header/pageheader';
import StudentListPage from './list';
import AppointmentsPage from '../appointments';
import MeetingListPage from '../meetings/table';
import ExcelImportPage from '../import';

const PreRegisterIndexPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: 'Ön Kayıt',
      content: <StudentListPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Randevu',
      content: <AppointmentsPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Görüşme',
      content: <MeetingListPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Toplu Öğrenci Aktarma',
      content: <ExcelImportPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4 w-100">
      <Pageheader title="Öğrenci Yönetimi" currentpage="Ön Kayıt" />
      <div className="mt-3">
        <TabsContainer tabs={tabsConfig} onTabChange={setActiveIdx} />
      </div>
    </div>
  );
};

export default PreRegisterIndexPage;
