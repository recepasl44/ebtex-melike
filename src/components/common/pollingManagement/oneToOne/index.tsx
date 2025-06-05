/* src/components/common/pollingManagement/oneToOne/index.tsx
   ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ */

import React, { useState } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

/* sekme içerikleri – önceden hazırladığınız tablolar */
import TeacherOneByOnePlanTable from './pages/teacher/table';   // Öğretmen Birebir
import StudentPlanTable from './pages/plan/table';             // Birebir Planla
import OneToOnePollingTable from './pages/polling/table';          // Birebir Yoklama
import CountTeacherTable from './pages/countTeacher/table';     // Öğretmen Birebir Sayıları
import CountStudentTable from './pages/countStudent/table';     // Öğrenci Birebir Sayıları
import Pageheader from "../../../page-header/pageheader";

/* -------------------------------------------------------------------- */
const OneToOneManagementPage: React.FC = () => {
  /* aktif sekme index’i */
  const [, setActiveIdx] = useState<number>(0);

  /* sekme başlıkları ve içerikleri */
  const tabs = [
    {
      label: 'Öğretmen Birebir',
      content: <TeacherOneByOnePlanTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Birebir Planla',
      content: <StudentPlanTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Birebir Yoklama',
      content: <OneToOnePollingTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Öğretmen Birebir Sayıları',
      content: <CountTeacherTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Öğrenci Birebir Sayıları',
      content: <CountStudentTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Yoklama Yönetimi" currentpage="Birebir Yoklama" />

      <TabsContainer
        tabs={tabs}
        // selectedIndex={activeIdx}
        onTabChange={(idx) => setActiveIdx(idx)}
      />
    </div>
  );
};

export default OneToOneManagementPage;
