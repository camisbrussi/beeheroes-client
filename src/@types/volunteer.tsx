import { OccupationArea } from "./occupationArea";

export type CreateVolunteerFormData = {
  name: string;
  email: string;
  avatarUser: string;
  password: string;
  passwordConfirmation: string;
  stateId: number;
  cityId: number;
  occupationAreaId: string;
  description: string;
};

export type Volunteer = {
  id: string;
  description: string;
  occupationArea?: OccupationArea;
  occupation_area?: OccupationArea;
  user: {
    id: string;
    avatar: string;
    name: string;
    address: {
      city: {
        name: string;
        state: {
          uf: string;
        };
      };
    };
  };
};

export type EditVolunteerFormData = {
  id?: string;
  description?: string;
  occupation_area_id?: string;
};
