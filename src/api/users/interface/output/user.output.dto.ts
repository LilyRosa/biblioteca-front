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
  genre: GenreOutputDto;
}

export default interface UserOutputDto {
  id: number;
  role: string;
  username: string;
  books: Book[];
}
