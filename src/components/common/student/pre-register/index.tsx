import React, { useState } from 'react';
import TabsContainer from '../../pollingManagement/class-course/component/organisms/TabsContainer';
import Pageheader from '../../../page-header/pageheader';
import PreRegisterList from './list';
import AppointmentsList from '../appointments/index';
import MeetingTable from '../meetings/table';
import StudentImport from '../import/index';

const PreRegisterIndexPage: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const tabs = [
    { label: 'Ön Kayıt', content: <PreRegisterList /> },
    { label: 'Randevu', content: <AppointmentsList /> },
    { label: 'Görüşme', content: <MeetingTable /> },
    { label: 'Toplu Öğrenci Aktarımı', content: <StudentImport /> },
  ];

  return (
    <div className="px-4">
      <Pageheader
        title="Öğrenciler"
        subtitle="Ön Kayıt"
        currentpage="Ön Kayıt"
        activepage="Ön Kayıt"
      />
      <TabsContainer
        tabs={tabs}
        selectedIndex={active}
        onTabChange={(idx) => setActive(idx)}
      />
    </div>
  );
};

export default PreRegisterIndexPage;
