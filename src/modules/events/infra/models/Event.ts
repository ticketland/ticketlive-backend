export default class Event {
  id: string;

  name: string;

  slug: string;

  release: string;

  date: Date;

  start_sales: Date;

  rules: Rule[];

  venue: Venue;

  producer: Producer;

  category: Category;
}

type Rule = {
  id: string;
  rule: string;
};

type Venue = {
  id: string;
  name: string;
  address: string;
};

type Producer = {
  id: string;
  name: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
};
