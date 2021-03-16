type TEvent = {
  id: string;
  name: string;
  slug: string;
  release: string;
  place: string;
  start_sales: Date;
  start_time: Date;
  max_tickets_per_user: number;
  date: Date;
  rules: [];
  address: string;
  files: [];
  producer: TProducer;
  category: TCategory;
};

type TProducer = {
  id: string;
  name: string;
  description: string;
};

type TCategory = {
  id: string;
  name: string;
};
