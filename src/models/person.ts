export interface PersonRequest {
  username: string;
  lastName: string;
  age: number;
  sex: string;
}

export interface Person extends PersonRequest {
  id: string;
}
