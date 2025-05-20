export interface GenreOutputDto {
  id_genre: number;
  genre: string;
}

export default interface CreateBookOutputDto {
  id_book: number;
  theme: string;
  author: string;
  resume: string;
  poster: string;
  bookPdf: string;
  genre: GenreOutputDto;
}
