import TabsContainer from "../components/organisms/TabsContainer.tsx";
import SpkAccordions from "../../../../@spk-reusable-components/reusable-advancedui/spk-accordions.tsx";
import { useEffect, useState } from "react";
import { useDebounce } from "../../ReusableTable.tsx";
import ReusableModalForm from "../../ReusableModalForm.tsx";
import { useStudentinfosTable } from "../../../hooks/studentInfo/useList.tsx";
import {
  FatherInfosForm,
  MeetingInfosForm,
  MotherInfosForm,
  OtherInfosForm,
  ParentInfosForm,
  SocialInfosForm,
  StudentInfosForm,
} from "./types.ts";
import { getStep1Fields } from "./tab1/accordion_option1/student_infos/student_infos.tsx";
import { getStep3Fields } from "./tab1/accordion_option3/fatherInfos/father_infos.tsx";
import { getStep4Fields } from "./tab1/accordion_option4/parentInfos/parent_infos.tsx";
import { getStep6Fields } from "./tab1/accordion_option6/otherInfos/other_infos.tsx";
import { getStep7Fields } from "./tab1/accordion_option7/socialInfos/social_infos.tsx";
import { getStep8Fields } from "./tab1/accordion_option8/meetingInfos/meeting_infos.tsx";
import { getStep2Fields } from "./tab1/accordion_option2/motherInfos/mother_infos.tsx";
import RecognitionFormFilter from "./tab1/recognition-list-filter";
import ObservationListFilter from "./tab2/observation-list-filter";
import { useGuardiansTable } from "../../../hooks/guardian/useList.tsx";
import ObservationRecordListFilter from "./tab3/observationRecord-list-filter";
import ParentMeetingListFilter from "./tab4/parent-meetingList-filter";
import { useGuidanceMeetingsTable } from "../../../hooks/guidanceMeeting/useList.tsx";
import Pageheader from "../../../page-header/pageheader";

const StudentTrackingPage = () => {
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [errorStep1, setErrorStep1] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  console.log(setLoadingStep1);
  console.log(setErrorStep1);
  const [studentId, setStudentId] = useState("");
  const [kinshipId, setKinshipId] = useState(0);
  const debouncedName = useDebounce<string>(inputName, 500);
  //
  const { studentinfosData } = useStudentinfosTable({
    enabled: studentId ? true : false,
    student_id: studentId,
    page: 1,
    paginate: 100,
  });

  // refetch'i çekin
  const { guardiansData, refetch } = useGuardiansTable({
    enabled: studentId ? true : false,
    kinship_id: kinshipId,
    student_id: studentId,
    page: 1,
    paginate: 100,
  });

  const { guidanceMeetingsData } = useGuidanceMeetingsTable({
    enabled: studentId ? true : false,
    student_id: studentId,
    page: 1,
    paginate: 100,
  });

  const handleKinshipChange = (newKinshipId: number) => {
    setKinshipId(newKinshipId);
    // Bir sonraki render döngüsünde refetch'i çağır
    setTimeout(() => {
      if (studentId) {
        refetch();
      }
    }, 0);
  };

  const [studentInfoCredentials, setStudentInfoCredentials] =
    useState<StudentInfosForm>({
      student_id: studentId,
      first_name: "",
      last_name: "",
      birthday: "",
      birthplace: "",
      level: "",
      special_conditions: "",
      extracurricular_activities: "",
      hobbies_and_skills: "",
      identification_no: "",
      residential_address: "",
      school: "",
      transportation_status: 0,
      emergency_contact_info: "",
      medical_support: "",
    });
  const [motherInfoCredentials, setmotherInfoCredentials] =
    useState<MotherInfosForm>({
      kinship_id: 0,
      full_name: "",
      education: "",
      profession: "",
      birthday: "",
      health: "",
      email: "",
      phone: "",
      birthplace: "",
    });

  const [fatherInfosCredentials, setfatherInfosCredentials] =
    useState<FatherInfosForm>({
      kinship_id: 1,
      full_name: "",
      education: "",
      profession: "",
      birthday: "",
      health: "",
      email: "",
      phone: "",
      birthplace: "",
    });

  const [parentInfosCredentials, setParentInfosCredentials] =
    useState<ParentInfosForm>({
      kinship_id: 2,
      full_name: "",
      education: "",
      profession: "",
      birthday: "",
      health: "",
      email: "",
      phone: "",
      birthplace: "",
    });
  const [otherInfosCredentials, setOtherInfosCredentials] =
    useState<OtherInfosForm>({
      number_of_siblings: 0,
      psychological_status: "",
      birth_order: 0,
      academic_performance: "",
      chronic_illness: "",
      support_educations: "",
      household_members: "",
      additional_notes: "",
    });
  const [socialInfosCredentials, setSocialInfosCredentials] =
    useState<SocialInfosForm>({
      number_of_siblings: 0,
      psychological_status: "",
      birth_order: 0,
      academic_performance: "",
    });
  const [meetingInfosCredentials, setMeetingInfosCredentials] =
    useState<MeetingInfosForm>({
      meeting_topic: "",
      guidance_name: "",
      meeting_notes: "",
      meeting_date: "",
    });

  useEffect(() => {
    if (guardiansData?.length > 0 && kinshipId === 0) {
      const guardianData = guardiansData.find(
        (guardian) => guardian.kinship_id === 0
      );
      if (kinshipId === 0) {
        setmotherInfoCredentials((prev) => ({
          ...prev,
          kinship_id: guardianData?.kinship_id || 0,
          full_name: guardianData?.full_name || "-",
          education: guardianData?.education || "-",
          birthday: guardianData?.birthday || "-",
          profession: guardianData?.profession || "-",
          health: guardianData?.health || "-",
          email: guardianData?.email || "-",
          phone: guardianData?.phone || "-",
        }));
      }
    }
    if (guardiansData.length > 0 && kinshipId === 1) {
      const guardianData = guardiansData.find(
        (guardian) => guardian.kinship_id === 1
      );
      setfatherInfosCredentials((prev) => ({
        ...prev,
        kinship_id: guardianData?.kinship_id || 1,
        full_name: guardianData?.full_name || "-",
        education: guardianData?.education || "-",
        birthday: guardianData?.birthday || "-",
        profession: guardianData?.profession || "-",
        health: guardianData?.health || "-",
        email: guardianData?.email || "-",
        phone: guardianData?.phone || "-",
      }));
    }
    if (guardiansData.length > 0 && kinshipId === 2) {
      const guardianData = guardiansData.find(
        (guardian) => guardian.kinship_id === 2
      );
      setParentInfosCredentials((prev) => ({
        ...prev,
        kinship_id: guardianData?.kinship_id || 2,
        full_name: guardianData?.full_name || "-",
        education: guardianData?.education || "-",
        birthday: guardianData?.birthday || "-",
        profession: guardianData?.profession || "-",
        health: guardianData?.health || "-",
        email: guardianData?.email || "-",
        phone: guardianData?.phone || "-",
      }));
    }
    if (guardiansData.length > 0 && kinshipId === null) {
      null;
    }
  }, [kinshipId]);

  useEffect(() => {
    if (studentinfosData?.length > 0) {
      const studentData = studentinfosData[0];

      setStudentInfoCredentials((prev) => ({
        ...prev,
        student_id: studentId,
        first_name: studentData?.student?.first_name || "-",
        last_name: studentData?.student?.last_name || "-",
        birthday: studentData?.student?.birthday || "-",
        birthplace: studentData?.birthplace || "not found",
        level: studentData?.student?.level || "not found",
        special_conditions: studentData?.special_conditions || "-",
        extracurricular_activities:
          studentData?.extracurricular_activities || "-",
        hobbies_and_skills: studentData?.hobbies_and_skills || "-",
        identification_no: studentData?.student?.identification_no || "-",
        residential_address: studentData?.residential_address || "-",
        school: studentData?.student?.school || "not found",
        transportation_status: studentData?.transportation_status,
        emergency_contact_info: studentData?.emergency_contact_info || "-",
        medical_support: studentData?.medical_support || "-",
      }));

      setOtherInfosCredentials((prev) => ({
        ...prev,
        number_of_siblings: studentData?.number_of_siblings || 0,
        psychological_status: studentData?.psychological_status || "-",
        birth_order: studentData?.birth_order || 0,
        academic_performance: studentData?.academic_performance || "-",
        chronic_illness: studentData?.chronic_illness || "-",
        support_educations: studentData?.support_educations || "-",
        household_members: studentData?.household_members || "-",
        additional_notes: studentData?.additional_notes || "-",
      }));

      setSocialInfosCredentials((prev) => ({
        ...prev,
        number_of_siblings: studentData?.number_of_siblings || 0,
        psychological_status: studentData?.psychological_status || "-",
        birth_order: studentData?.birth_order || 0,
        academic_performance: studentData?.academic_performance || "-",
      }));
    }
  }, [studentinfosData, studentId]);

  useEffect(() => {
    if (guidanceMeetingsData?.length > 0) {
      const meetingData = guidanceMeetingsData[0];

      setMeetingInfosCredentials((prev) => ({
        ...prev,
        meeting_topic: meetingData?.meeting_topic || "-",
        guidance_name: meetingData?.guidance_name || "-",
        meeting_notes: meetingData?.meeting_notes || "-",
        meeting_date: meetingData?.meeting_date || "-",
      }));
    }
  }, [guidanceMeetingsData, studentId]);

  useEffect(() => {
    setStudentId(debouncedName);
  }, [debouncedName]);

  const handleTabChange = (
    parentTabIndex: number,
    childTabIndex: number | null
  ) => {
    console.log(`Parent Tab: ${parentTabIndex}, Child Tab: ${childTabIndex}`);
  };

  const handleSubmit = async () => {};

  const Basicdata = [
    {
      id: "1",
      title: "Öğrenci Bilgileri",
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep1Fields()}
          onClose={() => {}}
          initialValues={studentInfoCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),

      children: [],
    },
    {
      id: "2",
      title: "Anne Bilgileri",
      onClick: () => {
        handleKinshipChange(0);
      },
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep2Fields()}
          onClose={() => {}}
          initialValues={motherInfoCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
    {
      id: "3",
      title: "Baba Bilgileri",
      onClick: () => {
        handleKinshipChange(1);
      },
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep3Fields()}
          onClose={() => {}}
          initialValues={fatherInfosCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
    {
      id: "4",
      title: "Veli Bilgileri",
      onClick: () => {
        handleKinshipChange(2);
      },
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep4Fields()}
          onClose={() => {}}
          initialValues={parentInfosCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
    {
      id: "6",
      title: "Diğer Bilgiler",
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep6Fields()}
          onClose={() => {}}
          initialValues={otherInfosCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
    {
      id: "7",
      title: "Psikolojik ve Sosyal Durum",
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep7Fields()}
          onClose={() => {}}
          initialValues={socialInfosCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
    {
      id: "8",
      title: "Görüşme Bilgileri",
      content: (
        <ReusableModalForm
          show={false}
          fields={getStep8Fields()}
          onClose={() => {}}
          initialValues={meetingInfosCredentials}
          hideButtons={true}
          isLoading={loadingStep1}
          error={errorStep1}
          onSubmit={handleSubmit}
          mode="single"
        />
      ),
    },
  ];

  const handleStudentChange = (data: { id: string; name: string }) => {
    setStudentId(data.id);
    setInputName(data.name);
  };

  const handleObservationChange =
    (/* data: { id: string; name: string } */) => {};

  const tabsConfig = [
    {
      label: "Tanıma Formu",
      content: (
        <div>
          <RecognitionFormFilter onStudentIdChange={handleStudentChange} />
          <SpkAccordions
            items={Basicdata}
            defaultActiveKey={"0"}
            key={studentId}
          />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Gözlem Listesi",
      content: (
        <div>
          <ObservationListFilter
            onObservationChange={handleObservationChange}
          />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Gözlem Kayıtları",
      content: (
        <div>
          <ObservationRecordListFilter
            onObservationRecordChange={handleObservationChange}
          />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Veli Görüşme",
      content: (
        <div>
          <ParentMeetingListFilter
            parentMeetingChange={handleObservationChange}
          />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#5C67F726",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div>
      <Pageheader title="Rehberlik Takip" currentpage="Öğrenci İzleme" />
      <TabsContainer tabs={tabsConfig} onTabChange={handleTabChange} />
    </div>
  );
};

export default StudentTrackingPage;
