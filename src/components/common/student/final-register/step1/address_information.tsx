import { useState, useMemo } from "react";
import { FieldDefinition } from "../../../ReusableModalForm";
import { useCountriesList } from "../../../../hooks/countries/useCountriesList";
import { useCityTable } from "../../../../hooks/city/useList";
import { useListCounties } from "../../../../hooks/county/useCountyList";
import { useDiscrictTable } from "../../../../hooks/districts/useList";

export function getAddressFields(): FieldDefinition[] {
  // API tetikleme flag'leri
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

  /**
   * Artık form field "address.country_id" gibi nested name'ler tanımlıyoruz.
   * ReusableModalForm => "formik.setFieldValue('address.country_id', ...)" yapacak.
   */
  return [
    {
      name: "address.country_id",
      label: "Ülke Ara",
      type: "autocomplete",
      placeholder: "Ülke ara...",
      onInputChange: (text, _formik) => {
        setCountryTerm(text);
        setEnableCountries(text.length > 0);
      },
      onChange: (val, formik) => {
        // val => seçilen country_id
        formik.setFieldValue("address.country_id", val);
        // Sıfırlama
        formik.setFieldValue("address.city_id", "");
        formik.setFieldValue("address.county_id", "");
        formik.setFieldValue("address.district_id", "");
        setSelectedCountry(val as number);
        setEnableCities(!!val);
      },
      options: countryOptions,
    },
    {
      name: "address.city_id",
      label: "İl",
      type: "select",
      onClick: () => setEnableCities(true),
      options: cityOptions,
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
      options: countyOptions,
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
      options: districtOptions,
      onChange: (val, formik) => {
        formik.setFieldValue("address.district_id", val);
      },
    },
    {
      name: "address.neighborhood_id",
      label: "Semt",
      type: "select", // İsterseniz 'select' de yapabilirsiniz
      col: 6,
    },
    {
      name: "address.address",
      label: "Adres",
      type: "textarea",
      placeholder: "Adresinizi giriniz",
      col: 6,
    },
  ];
}
