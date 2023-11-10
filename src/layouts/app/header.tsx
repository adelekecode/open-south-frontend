import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Logo from "~/components/logo";
import SearchField from "~/components/search-field";

export default function Header() {
  const routes = [
    {
      to: "/datasets",
      name: "Data",
    },
    {
      to: "/categories",
      name: "Categories",
    },
    {
      to: "/organizations",
      name: "Organizations",
    },
    {
      to: "/contact-us",
      name: "Contact Us",
    },
  ];

  return (
    <nav className="w-full shadow-appNavBar flex flex-col items-center">
      <div className="border-b-[1.5px] border-zinc-200 w-full max-w-maxAppWidth flex items-center justify-between gap-4 p-4 px-6">
        <Link to={"/"} className="p-6 w-fit hover:bg-zinc-100">
          <Logo className="w-[10rem]" />
        </Link>
        <div>
          <SearchField />
        </div>
      </div>
      <div className="px-6 flex items-start w-full max-w-maxAppWidth">
        {routes.map((item, index) => (
          <NavLink
            to={item.to}
            key={index + 1}
            className={({ isActive }) =>
              twMerge(
                `p-4 hover:bg-zinc-100 border-b-2 border-transparent`,
                isActive && "border-primary-700"
              )
            }
          >
            {({ isActive }) => (
              <p className={twMerge(`text-sm`, isActive && "text-primary-700")}>{item.name}</p>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
