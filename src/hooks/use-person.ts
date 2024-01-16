import { useFormik } from "formik";
import useFormModal from "./useFormModal";
import { Person, PersonRequest } from "@/models/person";
import { addPerson, deletePerson, editPerson } from "@/services/person";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export const usePersonForm = () => {
  const router = useRouter()
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
      setLoading(false);
      handleClose();
      toast.success("Person Added Successfully!", {
        position: "bottom-right",
        toastId: "create-person",
      });
      router.refresh();
    },
  });

  return { formik, show, loading, handleOpen, handleClose };
};

export const useEditPerson = (person: Person) => {
  const router = useRouter()
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
      handleClose();
      setLoading(false);
      toast.success("Person Edited Successfully!", {
        position: "bottom-right",
        toastId: "edit-person",
      });
      router.refresh();
    },
  });

  return { formik, show, loading, handleOpen, handleClose };
};

export const useDeletePerson = (id: string) => {
  const router = useRouter()
  const { show, loading, setLoading, handleClose, handleOpen } = useFormModal();

  const handleDelete = async () => {
    setLoading(true);
    await deletePerson(id);
    setLoading(false);
    toast.success("Person Deleted Successfully!", {
      position: "bottom-right",
      toastId: "delete-person",
    });
    router.refresh();
  };

  return { show, loading, handleOpen, handleClose, handleDelete };
};
