export default class Event {
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

  producer: Producer;

  category: Category;
}

type Producer = {
  id: string;
  name: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
};
