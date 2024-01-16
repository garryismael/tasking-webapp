import { Person } from "@/models/person";
import { Tooltip } from "@nextui-org/react";
import DeletePerson from "./DeletePerson";
import EditPerson from "./EditPerson";

type Props = {
  person: Person;
};

const PersonTableActions = ({ person }: Props) => {
  return (
    <div className="flex items-center gap-4 ">
      <div>
        <Tooltip content="Edit person">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditPerson person={person} />
          </span>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Delete person">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <DeletePerson person={person} />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default PersonTableActions;
