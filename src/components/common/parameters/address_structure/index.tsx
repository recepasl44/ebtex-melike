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
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Row>
        <Col md={3}>
          <Card>
            <h5>Ülkeler</h5>
            <CountryTable
              onSelectCountry={(country) => {
                setSelectedCountryId(country.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Şehirler</h5>
            <CityTable
              countryId={selectedCountryId}
              enabled={enabled}
              onSelectCity={(city) => {
                setSelectedCityId(city.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>İlçeler</h5>
            <CountyTable
              cityId={selectedCityId}
              enabled={enabled}
              onSelectCounty={(county) => {
                setSelectedCountyId(county.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Mahalleler</h5>
            <DistrictTable countyId={selectedCountyId} enabled={enabled} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
