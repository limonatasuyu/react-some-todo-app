import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="gradient-background h-full min-h-screen w-screen">
      <Outlet />
    </div>
  );
}
