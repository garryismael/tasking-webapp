import { usePersonForm } from "@/hooks/use-person";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FaEdit, FaPlus } from "react-icons/fa";

const AddPerson = () => {
  const { formik, show, loading, handleOpen, handleClose } =
    usePersonForm();
  return (
    <>
      <Button
        isIconOnly
        startContent={<FaPlus size={18} fill="#979797"/>}
        variant="light"
        color="default"
        onPress={handleOpen}
      ></Button>
      <Modal isOpen={show} onOpenChange={handleClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add A Person
              </ModalHeader>
              <ModalBody>
                <Input
                  name="username"
                  label="Username"
                  variant="bordered"
                  radius="sm"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <Input
                  name="lastName"
                  label="Your Last Name"
                  variant="bordered"
                  radius="sm"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                <Input
                  name="age"
                  label="Your age"
                  variant="bordered"
                  radius="sm"
                  type="number"
                  value={formik.values.age.toString()}
                  onChange={formik.handleChange}
                />
                <Select
                  name="sex"
                  label="Your Sex"
                  variant="bordered"
                  radius="sm"
                  placeholder="Select Your Sex"
                  defaultSelectedKeys="M"
                  onChange={formik.handleChange}
                >
                  <SelectItem key="M" value="M">
                    Male
                  </SelectItem>
                  <SelectItem key="F" value="F">
                    Female
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancel
                </Button>
                <Button isLoading={loading} color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPerson;
