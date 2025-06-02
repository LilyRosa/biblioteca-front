import api from "@/api/common/utils/base.axios";
import CreateBookInputDto from "../interface/input/create-book.input.dto";
import BookOutputDto from "../interface/output/book.output.dto";
import UpdateBookInputDto from "../interface/input/update-book.input.dto";

export const addBook = async (
  bookData: CreateBookInputDto
): Promise<BookOutputDto> => {
  try {
    const response = await api.post<BookOutputDto>("/books", bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBook = async (): Promise<BookOutputDto> => {
  try {
    const response = await api.get<BookOutputDto>("/books");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllExceptUserBooks = async (): Promise<BookOutputDto> => {
  try {
    const response = await api.get<BookOutputDto>("/books/{user}/except");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (
  bookData: UpdateBookInputDto,
  id: number
): Promise<BookOutputDto> => {
  try {
    const response = await api.put<BookOutputDto>(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (id: string | number): Promise<void> => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    throw error;
  }
};
