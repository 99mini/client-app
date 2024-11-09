'use client';

import { LatLng } from 'leaflet';
import { SetStateAction, useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import center from '@turf/center';

import { SggType } from '@/types/Geo';

const GeoJsonLayer = ({
  sgg,
  onChange,
}: {
  sgg: SggType | null;
  onChange: React.Dispatch<SetStateAction<SggType | null>>;
}) => {
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
    <>
      {/* 아웃 바운드 화이트 배경  */}
      <GeoJSON
        data={
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
                ...(geoData as { features: { geometry: { coordinates: number[] } }[] }).features
                  .map((feature) => feature.geometry.coordinates)
                  .flat(),
              ],
            },
          } as never
        }
        style={{
          color: 'white',
          fillColor: 'white',
          fillOpacity: 1,
          weight: 0,
        }}
      />
      {/* 지도 영역 - 테두리 */}
      <GeoJSON
        data={geoData}
        style={{
          color: '#F0F0F0',
          weight: 2,
          opacity: 1,
        }}
      />
      {/* 지도 영역 */}
      <GeoJSON
        data={geoData}
        style={{
          color: '#F0F0F0',
          fillColor: '#ABDAF4',
          fillOpacity: 1,
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
          });
        }}
      />
    </>
  );
};

export default GeoJsonLayer;
