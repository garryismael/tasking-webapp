import { Person } from "@/models/person";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { persons: Person[] } = {
  persons: [],
};

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPersons: (state, action: PayloadAction<Person[]>) => {
      state.persons = action.payload;
    },
    addPersonStore: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
    },
    editPersonStore: (state, action: PayloadAction<Person>) => {
      state.persons = state.persons.map((person) =>
        person.id != action.payload.id ? person : action.payload
      );
    },
    deletePersonStore: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter(
        (person) => person.id !== action.payload
      );
    },
  },
});

export const { setPersons, addPersonStore, editPersonStore, deletePersonStore } =
  PersonSlice.actions;

export default PersonSlice.reducer;
