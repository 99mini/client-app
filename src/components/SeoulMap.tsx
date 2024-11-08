'use client';

import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type SggType = {
  sgg: string;
  sggnm: string;
};

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

const center: LatLngExpression = [37.5665, 126.978]; // 서울의 위도와 경도

const SeoulMap = () => {
  const [sgg, setSgg] = useState<SggType | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '600px', width: '100%' }}
        zoomControl={false} // 줌 컨트롤 비활성화
        scrollWheelZoom={false} // 스크롤 줌 비활성화
        doubleClickZoom={false} // 더블 클릭 줌 비활성화
        dragging={false} // 지도 드래그 비활성화
        touchZoom={false} // 모바일 터치 줌 비활성화
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJsonLayer onChange={setSgg} />
        {sgg && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            <h2>{sgg.sgg}</h2>
            <p>{sgg.sggnm}</p>
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default SeoulMap;
