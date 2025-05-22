"use client";

import api from "@/api/common/utils/base.axios";
import LoginInputDto from "../interface/input/login.input.dto";
import LoginOutputDto from "../interface/output/login.output.dto";
import RegisterInputDto from "../interface/input/register.input.dto";
import RegisterOutputDto from "../interface/output/register.output.dto";

export const login = async (
  loginData: LoginInputDto
): Promise<LoginOutputDto> => {
  try {
    const response = await api.post<LoginOutputDto>("auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  registerData: RegisterInputDto
): Promise<RegisterOutputDto> => {
  try {
    const response = await api.post<RegisterOutputDto>(
      "auth/register",
      registerData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
