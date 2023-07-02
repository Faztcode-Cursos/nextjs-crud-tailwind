"use client"
import useTasks from "@/hooks/useTasks";
import Link from "next/link"
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();
  const { tasks } = useTasks();

  return (
    <header className="flex items-center justify-between bg-gray-800 px-28 py-3 shadow-xl">
      <Link className="text-3xl text-white font-bold" href="/">
        Task App
        <span className="text-sm ml-5 text-slate-300">{tasks.length} tasks</span>
      </Link>

      <div>
        <button
          onClick={() => router.push("/new")}
          className="bg-green-500 hover:bg-green-400 text-gray-50 py-2 px-5 rounded-sm font-bold transition-all"
        >
          Add Task
        </button>
      </div>
    </header>
  )
}
