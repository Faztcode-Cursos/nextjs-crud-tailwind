import { useContext } from "react"
import TaskContext from "@/context/TaskContext";

const useTasks = () => {
  const context = useContext(TaskContext);

  //* Si no hay contexto, lanzamos un error
  if (!context) throw new Error("useTasks must used within a provider");

  return context;
}

export default useTasks;