'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Divider } from 'antd';
import { getShops } from '@/lib/queries/shop.queries';
import { IShop } from '@/lib/types/shop.types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import Select from '../ui/Select';


interface IShopsView {
  countries: string[];
}

interface IFlyMapTo {
  coordinates: {
    lat: number;
    lng: number;
  }
}

const FlyMapTo: React.FC<IFlyMapTo> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(coordinates);
  }, [coordinates]);

  return null;
}


const ShopsView: React.FC<IShopsView> = ({ countries }) => {
  const [country, setCountry] = useState<string>(countries[0]);
  const [shops, setShops] = useState<IShop[]>([]);
  const countriesOptions = countries.map(item => ({ label: item, value: item }));

  useEffect(() => {
    getShops({ country }).then(res => setShops(res.data.shops));
  }, [country]);

  if(shops.length === 0) {
    return <div className='w-full h-full grow text-center'>Cannot find any shops</div>;
  }

  return (
    <div className='relative w-full'>
      <div className='relative w-full'>
        <MapContainer
          center={shops[0].coordinates}
          zoom={13}
          scrollWheelZoom={true}
          style={{ position: 'relative', width: '100%', height: '80vh', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {shops.map(shop => (
            <Marker position={shop.coordinates}>
              <Popup>
                <p className='font-semibold'>{shop.name}</p>
                <p className='text-xs text-gray-dark'>{shop.address}</p>
              </Popup>
            </Marker>
          ))}
          <FlyMapTo coordinates={shops[0].coordinates} />
        </MapContainer>
      </div>
      <div className='absolute left-52 top-0 px-10 py-16 w-[550px] h-full bg-white'>
        <Select defaultValue={countries[0]} options={countriesOptions} onChange={setCountry} />
        <ul className='py-5'>
          {shops.map((shop, i) => (
            <>
              <li key={crypto.randomUUID()}>
                <p className='font-semibold'>{shop.name}</p>
                <p className='text-sm text-gray-dark'>{shop.address}</p>
              </li>
              {i !== shops.length - 1 && <Divider />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopsView;