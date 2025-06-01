import api from "@/api/common/utils/base.axios";
import UserOutputDto from "../interface/output/user.output.dto";

export const getAllBooksUser = async (): Promise<UserOutputDto> => {
  try {
    const response = await api.get<UserOutputDto>("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFavoriteBooksUser = async (): Promise<UserOutputDto> => {
  try {
    const response = await api.get<UserOutputDto>("/users/me/favorite");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSuggestedBooksUser = async (): Promise<UserOutputDto> => {
  try {
    const response = await api.get<UserOutputDto>("/users/me/suggestion");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleFavoriteBook = async (bookId: number, favorite: boolean) => {
  try {
    const response = await api.patch(`/users/me/books/${bookId}/favorite`, {
      favorite,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
