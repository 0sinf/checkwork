export interface UserCreateRequest {
  name: string;
  email: string;
  company: string;
  wage: number;
}

export interface UserUpdateRequest {
  company: string;
  wage: number;
}
