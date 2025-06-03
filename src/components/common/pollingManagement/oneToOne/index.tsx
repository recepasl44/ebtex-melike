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

/* -------------------------------------------------------------------- */
const OneToOneManagementPage: React.FC = () => {
  /* aktif sekme index’i */
  const [activeIdx, setActiveIdx] = useState<number>(0);

  /* sekme başlıkları ve içerikleri */
  const tabs = [
    { label: 'Öğretmen Birebir', content: <TeacherOneByOnePlanTable /> },
    { label: 'Birebir Planla', content: <StudentPlanTable /> },
    { label: 'Birebir Yoklama', content: <OneToOnePollingTable /> },
    { label: 'Öğretmen Birebir Sayıları', content: <CountTeacherTable /> },
    { label: 'Öğrenci Birebir Sayıları', content: <CountStudentTable /> },
  ];

  return (
    <div className="px-4">
      <h5>Birebir Yoklama</h5>

      <TabsContainer
        tabs={tabs}
        selectedIndex={activeIdx}
        onTabChange={(idx) => setActiveIdx(idx)}
      />
    </div>
  );
};

export default OneToOneManagementPage;
