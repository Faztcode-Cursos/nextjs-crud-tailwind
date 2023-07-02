"use client"
import { useEffect } from "react";
import { Task } from "@/context/TaskContext";
import useTasks from "@/hooks/useTasks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Params{
  params: {
    id: string
  }
}


const Page = ({ params }: Params) => {
  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>();

  useEffect(() => {
    //* Si existe un id en el query params
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);

      //* Si se encuentra la tarea...
      if (taskFound) {
        //* Seteando el state del formulario con react-hook-form 
        setValue('title', taskFound.title);
        setValue('description', taskFound.description);
      }
    }
  }, [tasks,params,setValue]);

  const onSubmit = (data: Task) => {

    //* Si existe un id en el query params se edita 
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Task updated successfully");
    } else { //* sino se crea
      createTask(data);
      toast.success("Task created successfully");
    }
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-700 p-10 md:w-4/6 lg:w-3/6"
      >
        <h2 className="text-xl uppercase text-gray-300 tracking-wider mb-2 font-bold">
          {params.id ? "Edit Task" : "New Task"}
        </h2>

        <input
          type="text"
          className="bg-gray-800 py-3 px-4 mb-2 block w-full focus:outline-none"
          placeholder="Write a title"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="block my-2">This field is required</span>}

        <textarea
          className="bg-gray-800 py-3 px-4 mb-2 block w-full resize-none focus:outline-none"
          placeholder="Write a description"
          rows={5}
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span className="block my-2">This field is required</span>}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 py-2 px-5 rounded-sm transition-all disabled:opacity-30"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Page;
