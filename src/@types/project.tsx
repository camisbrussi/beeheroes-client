import { Address } from "./address";
import { OrganizationProps } from "./organization";

export type Project = {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  status: number;
  vacancies: number;
  total_subscription: number;
  address: Address;
  organization: OrganizationProps;
};
