export interface GenreOutputDto {
  id_genre: number;
  genre: string;
}

export interface Book {
  id_book: number;
  theme: string;
  author: string;
  resume: string;
  poster: string;
  bookPdf: string;
}

export interface UserOutputDto {
  id_user: number;
  username: string;
  password: string;
  role: string;
  books: Book[];
}

export default interface BookOutputDto {
  id_book: number;
  theme: string;
  author: string;
  resume: string;
  poster: string;
  bookPdf: string;
  genre: GenreOutputDto;
  users: UserOutputDto[];
}
