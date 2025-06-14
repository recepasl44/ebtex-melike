// src/components/common/student/pre-register/fields/addressFields.ts
import { useMemo, useState } from "react";
import { FieldDefinition } from "../../../ReusableModalForm";
import { useCountriesList } from "../../../../hooks/countries/useCountriesList";
import { useCityTable } from "../../../../hooks/city/useList";
import { useListCounties } from "../../../../hooks/county/useCountyList";
import { useDiscrictTable } from "../../../../hooks/districts/useList";

export const getAddressFields = (): FieldDefinition[] => {
  const [enableCountries, setEnableCountries] = useState(false);
  const [enableCities, setEnableCities] = useState(false);
  const [enableCounties, setEnableCounties] = useState(false);
  const [enableDistricts, setEnableDistricts] = useState(false);

  // Arama terimleri / seçimler
  const [countryTerm, setCountryTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<number | "">("");
  const [selectedCity, setSelectedCity] = useState<number | "">("");
  const [selectedCounty, setSelectedCounty] = useState<number | "">("");

  // Hook’lar
  const { data: countriesData } = useCountriesList({
    enabled: enableCountries,
    name: countryTerm,
    page: 1,
    pageSize: 999,
  });

  const { data: cityPages } = useCityTable({
    enabled: enableCities && !!selectedCountry,
    country_id: Number(selectedCountry) || 0,
    page: 1,
    pageSize: 999,
  });

  const { Countriesdata } = useListCounties({
    enabled: enableCounties && !!selectedCity,
    city_id: Number(selectedCity) || 0,
    page: 1,
    pageSize: 999,
  });

  const { data: districtResponse } = useDiscrictTable({
    enabled: enableDistricts && !!selectedCounty,
    county_id: Number(selectedCounty) || 0,
    page: 1,
    pageSize: 999,
  });

  const allCities = useMemo(() => {
    if (!Array.isArray(cityPages)) return [];
    return cityPages.flatMap((page: any) =>
      Array.isArray(page.data) ? page.data : []
    );
  }, [cityPages]);

  const allCounties = useMemo(() => {
    // If there's no data at all, return an empty array.
    if (!Countriesdata) {
      return [];
    }

    // If it's already an array, return it directly.
    if (Array.isArray(Countriesdata)) {
      return Countriesdata;
    }

    // Handle the case where Countriesdata is an object
    if (typeof Countriesdata === "object" && "data" in Countriesdata) {
      return (Countriesdata as { data: any[] }).data || [];
    }

    return [];
  }, [Countriesdata]);
  const allDistricts = districtResponse ?? [];

  const countryOptions = useMemo(() => {
    return (countriesData || []).map((c: { name: any; id: any }) => ({
      label: c.name,
      value: c.id,
    }));
  }, [countriesData]);

  const cityOptions = useMemo(() => {
    return allCities.map((c) => ({
      label: c.name,
      value: c.id,
    }));
  }, [allCities]);

  const countyOptions = useMemo(() => {
    return (allCounties || []).map((c: { name: any; id: any }) => ({
      label: c.name,
      value: c.id,
    }));
  }, [allCounties]);
  const districtOptions = useMemo(() => {
    return (Array.isArray(allDistricts) ? allDistricts : []).map(
      (d: { name: any; id: any }) => ({
        label: d.name,
        value: d.id,
      })
    );
  }, [allDistricts]);

  return [
    {
      name: "",
      label: "Adres Bilgisi",
      type: "heading",
    },
    {
      name: "address.country_id",
      label: "Ülke Ara",
      type: "autocomplete",
      onInputChange: (text, _formik) => {
        setCountryTerm(text);
        setEnableCountries(text.length > 0);
      },
      onChange: (val, formik) => {
        // val => seçilen country_id
        formik.setFieldValue("address.country_id", val);

        setSelectedCountry(val as number);
        setEnableCities(!!val);

        // Sıfırlama
        formik.setFieldValue("address.city_id", "");
        formik.setFieldValue("address.county_id", "");
        formik.setFieldValue("address.district_id", "");
      },
      options: [{ label: "Seçiniz", value: "" }, ...countryOptions],
    },
    {
      name: "address.city_id",
      label: "İl",
      type: "select",
      onClick: () => setEnableCities(true),
      options: [{ label: "Seçiniz", value: "" }, ...cityOptions],
      onChange: (val, formik) => {
        formik.setFieldValue("address.city_id", val);

        setSelectedCity(val as number);
        setEnableCounties(!!val);

        // Sıfırlama
        formik.setFieldValue("address.county_id", "");
        formik.setFieldValue("address.district_id", "");
      },
    },
    {
      name: "address.county_id",
      label: "İlçe",
      type: "select",
      onClick: () => setEnableCounties(true),
      options: [{ label: "Seçiniz", value: "" }, ...countyOptions],
      onChange: (val, formik) => {
        formik.setFieldValue("address.county_id", val);

        setSelectedCounty(val as number);
        setEnableDistricts(!!val);

        formik.setFieldValue("address.district_id", "");
      },
    },
    {
      name: "address.district_id",
      label: "Mahalle",
      type: "select",
      onClick: () => setEnableDistricts(true),
      options: [{ label: "Seçiniz", value: "" }, ...districtOptions],
      onChange: (val, formik) => {
        formik.setFieldValue("address.district_id", val);
      },
    },
    {
      name: "address.address",
      placeholder: "Mahalle, sokak, no...",
      label: "Açık Adres",
      type: "textarea",
      required: true,
    },
  ];
};
