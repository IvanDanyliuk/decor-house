export interface IShop {
  _id?: string;
  name: string;
  address: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}