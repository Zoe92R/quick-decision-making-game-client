import { UserResponse } from "../types/types";
import axios from "../api/axiosConfig";

// create new user
export const createUser = async (
  userName: string,
  score: number,
  setUserId: (id: string) => void
) => {
  try {
    const response: UserResponse = (
      await axios.request({
        method: "POST",
        url: "users",
        data: { userName, score },
      })
    ).data;
    setUserId(response._id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};

// update new user
export const updateUser = async (userId: string, score: number) => {
  try {
    await axios.request({
      method: "PUT",
      url: `users/${userId}`,
      data: { score },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};
