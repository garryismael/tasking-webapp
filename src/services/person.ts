import { PERSON_PATH } from "@/constants";
import { Person, PersonRequest } from "@/models/person";
import http from "@/utils/axios";

export const getPersons = async () => {
  const response = await http.get<Person[]>(PERSON_PATH);
  return response.data;
};

export const addPerson = async (data: PersonRequest) => {
  const response = await http.post<Person>(PERSON_PATH);
  return response.data;
};

export const editPerson = async (id: string, data: PersonRequest) => {
  const response = await http.put<Person>(`${PERSON_PATH}/${id}`, data);
  return response.data;
};

export const deletePerson = async (id: string) => {
  const response = await http.put<void>(`${PERSON_PATH}/${id}`);
  return response.data;
};
