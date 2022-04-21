export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  company: string;
  wage: number;
}

export interface UserUpdateRequest {
  company: string;
  wage: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  company: string;
  wage: number;
}

export interface UserRepository {
  save(
    userCreateRequest: Omit<UserCreateRequest, "passwordConfirm">
  ): Promise<number>;

  findById(userId: number): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByIdAndUpdate(
    userId: number,
    userUpdateRequest: UserUpdateRequest
  ): Promise<UserUpdateRequest>;

  findByIdAndDelete(userId: number): Promise<void>;
}
