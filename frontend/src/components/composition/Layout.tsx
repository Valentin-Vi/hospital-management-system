import { Outlet } from "react-router";
import { Navbar01 } from "../ui/shadcn-io/navbar-01";

export default function Layout() {
  return (
    <div className="w-screen h-screen app-container flex flex-col">
      <nav
        className="flex justify-center mb-1"
      >
        <Navbar01 />
        {/* <NavBar /> */}
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
