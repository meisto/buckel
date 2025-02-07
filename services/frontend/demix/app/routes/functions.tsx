// author: meisto
// date: 2025-02-07 22:29:36

import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="w-screen h-screen overflow-scroll">
      <NavBar />
      <Outlet />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="w-full flex justify-center gap-6 bg-slate-800 border-b border-slate-300 p-2">
      <NavLink className="" to="./tool1">
        <span>Tool 1</span>
      </NavLink>
      <NavLink to="./rss">
        <span>RSS</span>
      </NavLink>
    </nav>
  );
}
