import TabsContainer from "../components/organisms/TabsContainer.tsx";
import SpkAccordions from "../../../../@spk-reusable-components/reusable-advancedui/spk-accordions.tsx";
import FilterGroup, {
  FilterDefinition,
} from "../components/organisms/SearchFilter.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useProgramsTable } from "../../../hooks/program/useList.tsx";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters.tsx";
import { useLevelsTable } from "../../../hooks/levels/useList.tsx";
import { useListStudents } from "../../../hooks/student/useList.tsx";
import { useDebounce } from "../../ReusableTable.tsx";

type QueryParams = {
  [x: string]: any;
  program_id: number;
  level_id: number;
  name: string;
};

const StudentTrackingPage = () => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [name, setName] = useState("");
  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    name: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("name")) setName(params.get("name") || "");
  }, [location.search]);

  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "level_id") setLevelId(value);
    if (key === "name") {
      setInputName(value);
    }
  };

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const filterState = useMemo(
    () => ({
      program_id: Number(program_id) || 0,
      level_id: Number(level_id) || 0,
      name: name,
    }),
    [program_id, level_id, name]
  );

  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    if (params.program_id) query.set("program_id", String(params.program_id));
    if (params.level_id) query.set("level_id", String(params.level_id));
    if (params.name) query.set("program_name", params.name);
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
    }),
    [program_id]
  );

  const nameParams = useMemo(
    () => ({
      enabled: level_id ? true : false,
      name: inputName,
    }),
    [filtersEnabled.name, name]
  );

  const { levelsData: programLevelsData } = useLevelsTable(levelParams);

  const {} = useListStudents(nameParams);

  const handleTabChange = (
    parentTabIndex: number,
    childTabIndex: number | null
  ) => {
    console.log(`Parent Tab: ${parentTabIndex}, Child Tab: ${childTabIndex}`);
  };

  const filters: FilterDefinition[] = [
    {
      key: "program_id",
      label: "Sınıf Seviyesi",
      value: program_id,
      type: "select",
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, program_id: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("program_id", val);
      },
      options: (programsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
        key: item.id,
      })),
    },
    {
      key: "level_id",
      label: "Sınıf",
      value: level_id,
      type: "select" as const,
      onChange: (val: string) => {
        handleFilterChange("level_id", val);
      },
      options: (programLevelsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    },
    {
      key: "filter3",
      label: "Öğrenci",
      type: "autocomplete",
      value: nameParams.name,
      onChange: (val: string) => {
        handleFilterChange("name", val);
      },
    },
  ];
  const Basicdata = [
    {
      id: "1",
      title: "Öğrenci Bilgileri",
      content: "",
      children: [],
    },
    {
      id: "2",
      title: "Anne Bilgileri",
      content: "",
    },
    {
      id: "3",
      title: "Baba Bilgileri",
      content: "",
    },
    {
      id: "4",
      title: "Veli Bilgileri",
      content: "",
    },
    {
      id: "5",
      title: "Ek Veli Bilgileri",
      content: "",
    },
    {
      id: "6",
      title: "Diğer Bilgiler",
      content: "",
    },
    {
      id: "7",
      title: "Psikolojik ve Sosyal Durum",
      content: "",
    },
    {
      id: "8",
      title: "Görüşme Bilgileri",
      content: "",
    },
  ];

  const tabsConfig = [
    {
      label: "Tanıma Formu",
      content: (
        <div>
          <FilterGroup filters={filters} navigate={navigate} />
          <SpkAccordions items={Basicdata} /* openItem="1" */ />
        </div>
      ),
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
      /* 
            children: [
        {
          label: "Child Tab 1",
          content: <div>Child Tab 1 Content</div>,
          activeBgColor: "#FFC300",
          activeTextColor: "#000",
          passiveBgColor: "#E1E4FB",
          passiveTextColor: "#5C67F7",
          children: [
            {
              label: "Child Tab 1",
              content: <div>Child Tab 1 Content</div>,
              activeBgColor: "#FFC300",
              activeTextColor: "#000",
              passiveBgColor: "#E1E4FB",
              passiveTextColor: "#5C67F7",
            },
            {
              label: "Child Tab 2",
              content: <div>Child Tab 2 Content</div>,
              activeBgColor: "#FFC300",
              activeTextColor: "#000",
              passiveBgColor: "#E1E4FB",
              passiveTextColor: "#5C67F7",
            },
          ],
        },
        {
          label: "Child Tab 2",
          content: <div>Child Tab 2 Content</div>,
          activeBgColor: "#FFC300",
          activeTextColor: "#000",
          passiveBgColor: "#E1E4FB",
          passiveTextColor: "#5C67F7",
        },
      ], */
    },
    {
      label: "Main Tab 2",
      content: <div>Main Tab 2 Content</div>,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
  ];

  return <TabsContainer tabs={tabsConfig} onTabChange={handleTabChange} />;
};

export default StudentTrackingPage;
