import React, { useState } from 'react';
import TabsContainer from '../pollingManagement/class-course/component/organisms/TabsContainer';
import PreRegisterList from './pre-register/list';
import AppointmentsList from './appointments/index';
import MeetingListPage from './meetings/table';
import ExcelImportPage from './import/index';
import CombineFinalRegister from './final-register/combine';
import ServiceManagementPage from './service_management/index';
import CalculatePage from './calculate/index';
import Pageheader from '../page-header/pageheader';

const StudentManagementPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabs = [
    {
      label: 'Ön Kayıt',
      content: <></>,
      children: [
        { label: 'Ön Kayıt', content: <PreRegisterList /> },
        { label: 'Randevu', content: <AppointmentsList /> },
        { label: 'Görüşme', content: <MeetingListPage /> },
        { label: 'Toplu Öğrenci Aktarımı', content: <ExcelImportPage /> },
      ],
    },
    {
      label: 'Kayıt',
      content: <></>,
      children: [
        { label: 'Kesin Kayıt', content: <CombineFinalRegister /> },
        { label: 'Hizmet Yönetimi', content: <ServiceManagementPage /> },
        { label: 'Ücret Hesapla', content: <CalculatePage /> },
        { label: 'Kayıt Kontrol', content: <div>Kayıt Kontrol</div> },
      ],
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Öğrenci" currentpage="Öğrenci Yönetimi" />
      <TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default StudentManagementPage;
