import { Task } from "@/context/TaskContext";
import useTasks from "@/hooks/useTasks";
import { useRouter } from 'next/navigation';
import { MouseEvent } from "react";
import { toast } from 'react-hot-toast';

interface AppProps {
  task: Task;
}

type ButtonEvent = MouseEvent<HTMLButtonElement>;


export const TaskCard = ({ task }: AppProps) => {
  const router = useRouter();
  const { deleteTask } = useTasks();

  const { id, title, description } = task;  
  
  const handleButton = (e: ButtonEvent) => {
    e.stopPropagation();
    const accept = window.confirm("Are you sure you want to delete this task?");
    
    if (accept) {
      deleteTask(id);
      toast.success("Task deleted successfully");
    }

  };

  return (
    <div
      onClick={() => router.push(`/edit/${id}`)}
      className=" bg-gray-700 hover:bg-slate-600 rounded-md px-20 py-5 m-2 
      cursor-pointer transition-colors"
    >
      <div className="flex lg:flex-row flex-col justify-between gap-2">
        <h1 className="text-center">{title}</h1>
        <button
          type="button"
          onClick={handleButton}
          className="bg-red-700 hover:bg-red-600 transition-colors px-3 py-1 text-center"
        >
          Delete
        </button>
      </div>
      <p className="text-gray-300 mt-3">{description}</p>
      <span className="text-gray-400 text-xs">{id}</span>
    </div>
  );
}
