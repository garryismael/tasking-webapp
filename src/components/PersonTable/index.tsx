"use client";

import { personColumns } from "@/constants";
import { Person } from "@/models/person";
import {
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import PersonRenderCell from "./PersonRenderCell";
import { SearchIcon } from "../icons/SearchIcon";
import AddPerson from "./AddPerson";

export type PersonTableProps = {
  persons: Person[];
};

export const PersonTable = ({ persons }: PersonTableProps) => {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(persons.length / rowsPerPage);

  const filteredItems = React.useMemo(() => {
    let filteredPersons = [...persons];

    if (hasSearchFilter) {
      filteredPersons = filteredPersons.filter((user) => {
        let exists = false;

        if (user.username.toLowerCase().includes(filterValue.toLowerCase())) {
          exists = true;
        } else if (
          user.lastName.toLowerCase().includes(filterValue.toLowerCase())
        ) {
          exists = true;
        }

        return exists;
      });
    }

    return filteredPersons;
  }, [persons, hasSearchFilter, filterValue]);

  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const getFemale = React.useCallback(() => {
    return persons.filter(
      (person) =>
        person.sex.toUpperCase() === "F" ||
        person.sex.toLowerCase() === "female"
    ).length;
  }, [persons]);

  const getMale = React.useCallback(() => {
    return persons.filter(
      (person) =>
        person.sex.toUpperCase() === "M" || person.sex.toLowerCase() === "male"
    ).length;
  }, [persons]);

  const count = React.useCallback(() => {
    return persons.length;
  }, [persons]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-wrap justify-between">
        <AddPerson />
        <div className="flex flex-col gap-4 w-1/2 ">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by last name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        topContent={topContent}
        isStriped
        aria-label="Person Table"
        bottomContent={
          <div>
            <div>
              <p>Total: {count()}</p>
              <p>Female: {getFemale()}</p>
              <p>Male: {getMale()}</p>
            </div>
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
        }
      >
        <TableHeader columns={personColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data} emptyContent={"No Data Found."}>
          {(person) => (
            <TableRow>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {PersonRenderCell({
                    person,
                    columnKey,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
