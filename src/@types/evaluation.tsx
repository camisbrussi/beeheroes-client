export type Evaluation = {
  id: string;
  score: number;
  description: string;
  project: {
    id: string;
    name: string;
  };
  organization: {
    id: string;
    name: string;
    avatar: string;
  };
};
