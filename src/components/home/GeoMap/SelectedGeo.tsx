'use client';

import useChallenge from '@/hooks/useChallenge';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

const SelectedGeo = ({ sgg, sggnm }: { sgg: string; sggnm: string }) => {
  const [geoData, setGeoData] = useState(null);
  const challenge = useChallenge();
  const router = useRouter();

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetch(`/geo/seoul_${sgg}.geojson`)
        .then((response) => response.json())
        .then((data) => setGeoData(data))
        .catch((error) => console.error('GeoJSON data loading error:', error));
    }, 100);

    return () => {
      clearTimeout(debounce);
      setGeoData(null);
    };
  }, [sgg]);

  if (!geoData || !sgg) {
    return null;
  }

  return (
    <>
      {/* 지도 선택 영역 */}
      <GeoJSON
        data={geoData}
        style={{
          color: '#F0F0F0',
          fillColor: '#06E5AD',
          fillOpacity: 1,
        }}
        onEachFeature={(feature, layer) => {
          layer.on('click', () => {
            const selectedChallenge = challenge.find((challen) => challen.district === sggnm);
            if (!selectedChallenge) {
              return;
            }
            router.replace(
              `/challenge?district=${selectedChallenge.district}&bigCategory=${selectedChallenge.bigCategory}`
            );
          });
        }}
      />
    </>
  );
};

export default SelectedGeo;
