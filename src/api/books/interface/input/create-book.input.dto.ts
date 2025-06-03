export default interface CreateBookInputDto {
  theme: string;
  author: string;
  resume: string;
  poster: File;
  bookPdf: File;
  genre: number;
}
