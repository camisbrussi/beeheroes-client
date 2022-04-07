import { ProfileAvatarInfo } from "./user";

export type Subscription = {
  id: string;
  volunteer: ProfileAvatarInfo;
};

export type CreateSubscription = {
  projectId: string;
  userId: string;
};

export type SubscriptionMessageConfirmation = {
  message: string;
};
