import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';

import { SggType } from '@/types/Geo';

interface SelectedGeoProps {
  geoData: any;
  sgg: SggType | null;
}

const SelectedGeo = ({ geoData, sgg }: SelectedGeoProps) => {
  const selectedData: any | null = useMemo(() => {
    if (!geoData || !sgg) {
      return null;
    }
    return (
      (geoData as { features: { properties: { sgg: string } }[] }).features.find(
        (feature) => feature.properties.sgg === sgg.sgg
      ) ?? null
    );
  }, [sgg, geoData]);

  return (
    <GeoJSON
      data={selectedData}
      style={{
        color: 'red',
        weight: 2,
        fillColor: 'white',
      }}
    />
  );
};

export default SelectedGeo;
