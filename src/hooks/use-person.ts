import { useFormik } from "formik";
import useFormModal from "./useFormModal";
import { Person, PersonRequest } from "@/models/person";
import { addPerson, deletePerson, editPerson } from "@/services/person";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./useStore";
import {
  addPersonStore,
  deletePersonStore,
  editPersonStore,
  setPersons,
} from "@/utils/person-slice";

export const usePersonList = (persons: Person[]) => {
  const dispatch = useAppDispatch();
  const { persons: data } = useAppSelector((state) => state.person);
  useEffect(() => {
    dispatch(setPersons(persons));
  }, [dispatch, persons]);
  return data;
};

export const usePersonForm = () => {
  const dispatch = useAppDispatch();
  const { show, loading, setLoading, handleClose, handleOpen } = useFormModal();
  const formik = useFormik<PersonRequest>({
    initialValues: {
      username: "",
      lastName: "",
      sex: "M",
      age: 0,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const person = await addPerson(values);
      dispatch(addPersonStore(person));
      setLoading(false);
      handleClose();
      toast.success("Person Added Successfully!", {
        position: "bottom-right",
        toastId: "create-person",
      });
    },
  });

  return { formik, show, loading, handleOpen, handleClose };
};

export const useEditPerson = (person: Person) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { show, loading, setLoading, handleClose, handleOpen } = useFormModal();
  const [id] = useState(person.id);
  const formik = useFormik<PersonRequest>({
    initialValues: {
      username: person.username,
      lastName: person.lastName,
      age: person.age,
      sex: person.sex,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const person = await editPerson(id, values);
      dispatch(editPersonStore(person));
      handleClose();
      setLoading(false);
      toast.success("Person Edited Successfully!", {
        position: "bottom-right",
        toastId: "edit-person",
      });
    },
  });

  return { formik, show, loading, handleOpen, handleClose };
};

export const useDeletePerson = (id: string) => {
  const dispatch = useAppDispatch();
  const { show, loading, setLoading, handleClose, handleOpen } = useFormModal();

  const handleDelete = async () => {
    setLoading(true);
    await deletePerson(id);
    dispatch(deletePersonStore(id));
    handleClose();
    setLoading(false);
    toast.success("Person Deleted Successfully!", {
      position: "bottom-right",
      toastId: "delete-person",
    });
  };

  return { show, loading, handleOpen, handleClose, handleDelete };
};
