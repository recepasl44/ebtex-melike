import { Row, Col, Card } from "react-bootstrap";
import CountryTable from "./country/table";
import CityTable from "./city/table";
import CountyTable from "./county/table";
import DistrictTable from "./district/table";
import { useState } from "react";

export default function AddressStructurePage() {
  const [selectedCountryId, setSelectedCountryId] = useState<number>();
  const [selectedCityId, setSelectedCityId] = useState<number>();
  const [selectedCountyId, setSelectedCountyId] = useState<number>();

  const [cityEnabled, setCityEnabled] = useState(false);
  const [countyEnabled, setCountyEnabled] = useState(false);
  const [districtEnabled, setDistrictEnabled] = useState(false);

  return (
    <div>
      <Row>
        <Col md={3}>
          <Card>
            <h5>Ülkeler</h5>
            <CountryTable
              onSelectCountry={(country) => {
                setSelectedCountryId(country.id);
                setCityEnabled(true);
                setCountyEnabled(false);
                setDistrictEnabled(false);
                setSelectedCityId(undefined);
                setSelectedCountyId(undefined);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Şehirler</h5>
            <CityTable
              countryId={selectedCountryId}
              enabled={cityEnabled}
              onSelectCity={(city) => {
                setSelectedCityId(city.id);
                setCountyEnabled(true);
                setDistrictEnabled(false);
                setSelectedCountyId(undefined);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>İlçeler</h5>
            <CountyTable
              cityId={selectedCityId}
              enabled={countyEnabled}
              onSelectCounty={(county) => {
                setSelectedCountyId(county.id);
                setDistrictEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Mahalleler</h5>
            <DistrictTable countyId={selectedCountyId} enabled={districtEnabled} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
