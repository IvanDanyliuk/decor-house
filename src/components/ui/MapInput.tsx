'use client';

import { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { MAP_STARTING_POSITION } from '@/lib/constants';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';


interface IMapInput {
  name: string;
  label: string;
  defaultValue?: {
    lat: number; 
    lng: number;
  };
  error?: string[]
}

const MapInput: React.FC<IMapInput> = ({ name, label, defaultValue, error }) => {
  const [geoData, setGeoData] = useState(defaultValue || MAP_STARTING_POSITION);
  
  const MapEvents = () => {
    useMapEvents({
      click(e: any) {
        setGeoData(e.latlng);
      }
    });
    return false;
  };

  return (
    <div className='w-full flex flex-col md:flex-row items-start gap-3'>
      <input 
        type='text' 
        name={name} 
        value={JSON.stringify(geoData)} 
        onChange={() => {}} 
        className='hidden' 
      />
      {label && (
        <label 
          htmlFor={name} 
          className='px-3 md:px-0 w-full md:w-36 h-10 flex items-center text-sm font-semibold'
        >
          <span>{label}</span>
        </label>
      )}
      <div className='relative w-full md:grow'>
      <p className='mt-1 px-3 md:px-0 text-xs text-red-600'>
          {error && (
            <>
              <ExclamationCircleOutlined />
              <span className='ml-1'>{error.join(' ')}</span>
            </>
          )}
        </p>
        {geoData.lat && geoData.lng && (
          <MapContainer 
            center={geoData} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ position: 'relative', width: '100%', height: '80vh' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={geoData} />
            <MapEvents />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapInput;