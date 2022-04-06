import { Address } from "./address";
import { OrganizationProps } from "./organization";

export type Donation = {
  id: string;
  name: string;
  description: string;
  total_value: number;
  total_collected: number;
  status: number;
  address: Address;
  organization: OrganizationProps;
};
