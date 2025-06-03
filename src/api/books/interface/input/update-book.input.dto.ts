export default interface UpdateBookInputDto {
  theme: string;
  author: string;
  resume: string;
  poster: File;
  bookPdf: File;
  genre: number;
}
