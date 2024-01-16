import { useDeletePerson } from "@/hooks/use-person";
import { Person } from "@/models/person";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { FaTrash } from "react-icons/fa";

type Props = {
  person: Person;
};

const DeletePerson = ({ person }: Props) => {
  const { show, loading, handleClose, handleOpen, handleDelete } =
    useDeletePerson(person.id);

  return (
    <>
      <Button
        isIconOnly
        startContent={<FaTrash size={18} fill="#FF0080" />}
        variant="light"
        color="default"
        onPress={handleOpen}
      ></Button>
      <Modal
        isOpen={show}
        onOpenChange={handleClose}
        placement="top-center"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete a person
              </ModalHeader>
              <ModalBody>
                <p>Are you sure to delete {person.lastName}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  isLoading={loading}
                  onClick={handleDelete}
                  type="button"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePerson;
