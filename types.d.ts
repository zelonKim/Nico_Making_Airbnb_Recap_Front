export interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  pk: string;
  name: string;
  description: string;
}

export interface ICategory {
  pk: string;
  name: string;
  kind: string;
}

export interface IRoomDetail extends IRoomList {
  id: string;
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: ICategory;
  owner: IRoomOwner;
  amenities: IAmenity[];
}

export interface IReview {
  roomPk: string;
  payload: string;
  rating: number;
  user: IRoomOwner;
}
