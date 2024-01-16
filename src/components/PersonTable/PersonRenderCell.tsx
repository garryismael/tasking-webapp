import { Person } from "@/models/person";
import React from "react";
import PersonTableActions from "./PersonTableActions";

export interface PersonTableProps {
  person: Person;
  columnKey: string | React.Key;
}

const PersonRenderCell = ({ person, columnKey }: PersonTableProps) => {
  switch (columnKey) {
    case "actions":
      return <PersonTableActions person={person} />;
    default:
      // @ts-ignore
      const cellValue = person[columnKey];
      return cellValue;
  }
};

export default PersonRenderCell;
