import {
  createUserRequestSchema,
  loginUserRequestSchema,
  type CreateUserRequest,
  type LoginUserRequest,
  type PublicUser,
} from "@/lib/validations/user";
import { AppError } from "@/server/errors/app-error";
import { userRepository } from "@/server/repositories/user-repository";
import { hashPassword, verifyPassword } from "@/server/utils/crypto";

function toPublicUser(user: {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    imageUrl: user.imageUrl,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export const userService = {
  async createUser(input: CreateUserRequest) {
    const payload = createUserRequestSchema.parse(input);
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError(409, "EMAIL_IN_USE", "A user with this email already exists.");
    }

    const user = await userRepository.create({
      email: payload.email,
      name: payload.name,
      passwordHash: hashPassword(payload.password),
    });

    return toPublicUser(user);
  },

  async loginUser(input: LoginUserRequest) {
    const payload = loginUserRequestSchema.parse(input);
    const user = await userRepository.findByEmail(payload.email);

    if (!user || !verifyPassword(payload.password, user.passwordHash)) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
    }

    if (!user.isActive) {
      throw new AppError(403, "USER_INACTIVE", "This account is not active.");
    }

    return toPublicUser(user);
  },

  async getUserById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "The requested user was not found.");
    }

    return toPublicUser(user);
  },
};
