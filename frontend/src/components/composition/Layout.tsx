import { Outlet } from "react-router";
import { NavBar } from "@components/navigation";

export default function Layout() {
  return (
    <div className="w-full h-full app-container flex flex-col bg-slate-200 p-1">
      <nav
        className="flex justify-center mb-1"
      >
        <NavBar />
      </nav>
      <main
        className="
          rounded-md
          shadow-sm
          h-full
          flex-1
          p-1
          bg-white
          overflow-hidden"
      >
        <Outlet />
      </main>
    </div>
  );
};
