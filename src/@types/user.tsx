import { Address } from "./address";

export type Responsibles = {
  name: string;
  user_id: string;
  avatar: string;
};

export type ProfileAvatarInfo = {
  id?: string;
  name: string;
  user_id: string;
  avatar: string;
};

export type User = {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  is_volunteer: boolean;
  address?: Address;
};

export type EditUserFormData = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  is_volunteer?: boolean;
  address?: {
    city_id: number;
  };
  status?: number;
};

export type UserSignIn = {
  id: string;
  email?: string;
  name: string;
  avatar?: string;
  permissions: string[];
  roles: string[];
  token?: string;
  refresh_token?: string;
};
