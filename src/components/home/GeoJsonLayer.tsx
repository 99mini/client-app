'use client';

import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import center from '@turf/center';

import { SggType } from '@/types/Geo';
import { LatLng } from 'leaflet';

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
        const centroid = center(feature).geometry.coordinates;
        const [lng, lat] = centroid;

        layer.on({
          mouseover: (e) => {
            const map = e.target._map;
            const point = map.latLngToLayerPoint(new LatLng(lat, lng));

            onChange({
              sgg: feature.properties.sgg as string,
              sggnm: feature.properties.sggnm as string,
              center: [point.y, point.x],
            });
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
