import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <div className="w-full h-full app-container flex flex-col bg-slate-200 p-1">
      <nav
        className="flex justify-center mb-1"
      >
        <NavBar />
      </nav>
      <main
        className="rounded-md bg-white shadow-sm h-full"
      >
        <Outlet />
      </main>
    </div>
  );
};
