import { PersonTable } from "@/components/PersonTable";
import { getPersons } from "@/services/person";

export default async function Home() {
  const persons = await getPersons();
  return <PersonTable persons={persons} />;
}
