"use client"
import { createContext, useEffect, useState } from "react";

export interface Task{
  id: string;
  title: string;
  description: string;
}

interface props {
  children: React.ReactElement | React.ReactNode;
}

interface TasksContextProps {
  tasks: Task[];
  createTask: (newTask: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string,task: Task) => void;
}

const TaskContext = createContext<TasksContextProps>({} as TasksContextProps);

const initialTasks: Task[] = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [];

const TaskProvider = ({ children }: props) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  // console.log(tasks);

  //* Guardando en localStorage cada vez que haga una operacion en las tareas 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const createTask = (newTask: Task) => {
    newTask.id = crypto.randomUUID();
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const updateTask = (id: string, task: Task) => {
    const updatedTasks = tasks.map((taskState) =>
    taskState.id === id ? {...task,id} : taskState
    );
    setTasks(updatedTasks);
  
  }
  
  const data = {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };

  return (
    <TaskContext.Provider value={data}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
export {
  TaskProvider
};