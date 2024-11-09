'use client';

import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { SggType } from '@/types/Geo';

import GeoJsonLayer from './GeoJsonLayer';
import SeoulPopup from './SeoulPopup';

import { koreanToEnglishCategory, romanizeAddress } from '@/utils/i11n';
import { Box, Button, Typography } from '@mui/material';
import SelectedGeo from './SelectedGeo';

import useChallenge from '@/hooks/useChallenge';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import './SeoulMap.css';

const center: LatLngExpression = [37.5665, 126.978]; // 서울의 위도와 경도

const SeoulMap = () => {
  const [sgg, setSgg] = useState<SggType | null>(null);
  const challenge = useChallenge();

  return (
    <div className="seoul-map-layout">
      <div className="seoul-map-sticky">
        <div className="seoul-map-container">
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

            <GeoJsonLayer sgg={sgg} onChange={setSgg} />
            {sgg && <SelectedGeo sgg={sgg.sgg} sggnm={sgg.sggnm} />}

            {sgg && (
              <SeoulPopup
                style={{
                  top: sgg.center[0],
                  left: sgg.center[1],
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    {romanizeAddress(sgg.sggnm)}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: '1rem',
                    }}
                  >{`(${sgg.sggnm})`}</Typography>
                  {challenge.length && (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '1rem',
                        }}
                      >{`Category: ${koreanToEnglishCategory(challenge[0].bigCategory)}`}</Typography>
                      <Typography variant="h6">{`Mission: ${challenge[0].text}`}</Typography>
                    </>
                  )}
                </div>
              </SeoulPopup>
            )}
          </MapContainer>
        </div>
        <Box
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              fontSize: '2rem',
              color: 'white',
              backgroundColor: '#15E5B0',
              borderRadius: '12px',
              padding: '10px 20px',
            }}
          >
            <Link href="/challen-log">{'Challenge Seoul'}</Link>
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default SeoulMap;
