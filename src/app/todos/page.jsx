import clientPromise from "../lib/mongodb";
import CreateTodoModal from "../components/CreateTodoModal";
import { getServerSession } from "next-auth";

const session = await getServerSession();

export default function Todos() {
  async function handleSubmit(data) {
    "use server";
  }

  return (
    <>
      <div className="topbar">
        <h1>Todos</h1>
        <CreateTodoModal handleSubmit={handleSubmit} />
      </div>
      <div className="todoscontainer"></div>
    </>
  );
}
