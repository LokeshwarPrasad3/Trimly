import { createUserRequestSchema, type CreateUserRequest } from "@/lib/validations/user";
import { AppError } from "@/server/errors/app-error";
import { userRepository } from "@/server/repositories/user-repository";
import { hashPassword } from "@/server/utils/crypto";

export const userService = {
  async createUser(input: CreateUserRequest) {
    const payload = createUserRequestSchema.parse(input);
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError(409, "EMAIL_IN_USE", "A user with this email already exists.");
    }

    return userRepository.create({
      email: payload.email,
      name: payload.name,
      passwordHash: hashPassword(payload.password),
    });
  },

  async getUserById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "The requested user was not found.");
    }

    return user;
  },
};
