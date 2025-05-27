import api from "@/api/common/utils/base.axios";
import CreateGenreInputDto from "../interface/input/create-genre.input.dto";
import GenreOutputDto from "../interface/output/genre.output.dto";
import UpdateGenreInputDto from "../interface/input/update-genre.input.dto";

export const addGenre = async (
  genreData: CreateGenreInputDto
): Promise<GenreOutputDto> => {
  try {
    const response = await api.post<GenreOutputDto>("/genres", genreData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGenre = async (
  genreData: UpdateGenreInputDto,
  id: number
): Promise<GenreOutputDto> => {
  try {
    const response = await api.put<GenreOutputDto>(`/genres/${id}`, genreData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllGenre = async (): Promise<GenreOutputDto[]> => {
  try {
    const response = await api.get<GenreOutputDto[]>("/genres");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGenre = async (id: string | number): Promise<void> => {
  try {
    await api.delete(`/genres/${id}`);
  } catch (error) {
    throw error;
  }
};
