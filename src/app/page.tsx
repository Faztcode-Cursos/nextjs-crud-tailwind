"use client"
import { TaskCard } from "@/components/TaskCard";
import useTasks from "@/hooks/useTasks";

const Page = () => {
  const { tasks } = useTasks();
  return (
    <div className="flex justify-center">
      {tasks.length === 0 ? (
        <div className="bg-gray-700 rounded-md py-2 m-2 text-2xl w-full uppercase tracking-widest">
          <p className="text-white font-extrabold text-center">Add a task..</p>
        </div>
      ) : (
        <div className="lg:w-7/12 w-full">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
