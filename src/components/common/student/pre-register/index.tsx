import React, { useState } from 'react';
import TabsContainer from '../../pollingManagement/class-course/component/organisms/TabsContainer';
import Pageheader from '../../../page-header/pageheader';

import PreRegisterList from './list';
import AppointmentsList from '../appointments';
import MeetingList from '../meetings/table';
import StudentImport from '../import';

const PreRegisterIndexPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabs = [
    {
      label: 'Ön Kayıt',
      content: <PreRegisterList />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Randevu',
      content: <AppointmentsList />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Görüşme',
      content: <MeetingList />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Öğrenci Yükle',
      content: <StudentImport />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div >
      <Pageheader title="Öğrenciler" currentpage="Ön Kayıt" />
      <TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default PreRegisterIndexPage;
