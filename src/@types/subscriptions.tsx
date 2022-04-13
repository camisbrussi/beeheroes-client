import { ProfileAvatarInfo } from "./user";

export type Subscription = {
  id: string;
  status: number;
  volunteer: ProfileAvatarInfo;
};

export type CreateSubscription = {
  projectId: string;
  userId: string;
  onCloseModal: () => void;
};

export type SubscriptionMessageConfirmation = {
  message: string;
  onCloseModal: () => void;
};
