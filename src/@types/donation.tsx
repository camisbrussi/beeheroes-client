import { OrganizationProps } from "./organization";

export type Donation = {
  id: string;
  name: string;
  description: string;
  total_value: number;
  total_collected: number;
  status: number;
  organization_id: string;
};

export type CreateDonationFormData = {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  totalCollected?: number;
  status: number;
  organizationId: string;
};

export type EditDonationFormData = {
  id?: string;
  name?: string;
  description?: string;
  total_value?: number;
  total_collected?: number;
  status?: number;
};
