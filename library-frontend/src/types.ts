export type Author = {
  id: string;
  name: string;
  born: number;
  bookCount: number;
};

export type Book = {
  id: string;
  title: string;
  published: number;
  author: string;
};
