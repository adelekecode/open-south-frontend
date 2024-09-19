import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    to: "/account/settings/change-password",
    text: "Change Password",
  },
  {
    to: "/account/settings/delete-account",
    text: "Delete Account",
  },
];

export default function SettingsLayout() {
  return (
    <main className="p-6 px-8 tablet:px-6 largeMobile:!px-4 pb-16 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold largeMobile:text-xl">{"Settings"}</h1>
        <div className="bg-white w-full border flex items-center gap-4 border-info-100 p-4 rounded-md overflow-x-auto">
          {links.map(({ to, text }, index) => (
            <NavLink
              to={to}
              key={index}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center border border-transparent w-fit ${isActive ? "bg-zinc-500/5 border-black/10" : ""}`
              }
            >
              <small className="whitespace-nowrap">{text}</small>
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </main>
  );
}
