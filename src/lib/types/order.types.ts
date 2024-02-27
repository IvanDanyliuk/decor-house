import { ICartItem } from './user.types';


export enum DeliveryStatus {
  Delivered = 'Delivered',
  NotDelivered = 'Not Delivered'
}

export enum DeliveryMethod {
  Pickup = 'Pickup',
  Delivery = 'Delivery'
}

export enum PaymentStatus {
  Paid = 'Paid',
  NotPaid = 'Not Paid'
}

export enum PaymentMethod {
  Card = 'Card',
  Cash = 'Cash'
}

export interface IOrder {
  _id?: string;
  user: {
    name: string;
    phone: string;
    email: string;
  };
  products: ICartItem[];
  totalAmount: number;
  deliveryAddress: string;
  deliveryStatus: string;
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
}