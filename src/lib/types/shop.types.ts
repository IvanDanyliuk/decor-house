export interface IShop {
  _id?: string;
  name: string;
  city: string;
  country: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}