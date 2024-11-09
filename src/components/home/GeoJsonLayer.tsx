'use client';

import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { SggType } from '@/types/Geo';

const GeoJsonLayer = ({ onChange }: { onChange: (sgg: SggType | null) => void }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/geo/seoul_sggnm.geojson')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('GeoJSON data loading error:', error));
  }, []);

  if (!geoData) {
    return null;
  }

  return (
    <GeoJSON
      data={geoData}
      style={{
        color: 'blue',
        weight: 2,
        fillColor: 'lightblue',
        fillOpacity: 0.3,
      }}
      onEachFeature={(feature, layer) => {
        layer.on({
          mouseover: () => {
            onChange({
              sgg: feature.properties.sgg as string,
              sggnm: feature.properties.sggnm as string,
            });
            console.log(feature.properties);
          },
          mouseout: () => {
            onChange(null);
          },
        });
      }}
    />
  );
};

export default GeoJsonLayer;
