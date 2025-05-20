export interface Book {
  id_book: number;
  theme: string;
  author: string;
  resume: string;
  poster: string;
  bookPdf: string;
}

export default interface GenreOutputDto {
  id_genre: number;
  books: Book[];
}
