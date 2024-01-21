export type HomeResponceType = {
  status: number;
  new_arrival_topics: NewArrivalTopicsResponceType[];
};

export type NewArrivalTopicsResponceType = {
  id: number;
  title: string;
  sammary: string;
  category: string;
  created_at: string;
  updated_at: string;
};
