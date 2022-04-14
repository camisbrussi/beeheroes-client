import { Address } from "./address";

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
  organization_id: string;
};

export type CreateProjectFormData = {
  name: string;
  description: string;
  start: Date;
  end: Date;
  vacancies: number;
  organizationId: string;
};

export type EditProjectFormData = {
  name?: string;
  description?: string;
  start?: Date;
  end?: Date;
  vacancies?: number;
};

export type ProjectListProps = {
  id?: string;
  name?: string;
  start?: Date;
  end?: Date;
  status?: number;
  status_subscription?: number;
  vacancies?: number;
  total_subscription?: number;
  status_project?: number;
};
