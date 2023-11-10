import { Link, NavLink } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
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
      <div className="w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex items-center justify-between gap-4 p-4 px-6">
          <Link to={"/"} className="p-6 w-fit hover:bg-zinc-100">
            <Logo className="w-[10rem]" />
          </Link>
          <div className="flex flex-col items-end gap-4">
            <div className="flex item-center gap-4 [&_a]:rounded-full [&_a>p]:text-primary-700 [&_a]:p-2 [&_a]:py-1 [&_a>p]:text-sm [&_a>p]:font-medium [&_a]:flex [&_a]:items-center [&_a]:gap-2">
              <Link to="/login" className="hover:bg-zinc-100">
                <BiLock className="text-primary-700" />
                <p>To log in</p>
              </Link>
              <Link to="/signup" className="hover:bg-zinc-100">
                <IoPersonCircleOutline className="text-primary-700" />
                <p>Signup</p>
              </Link>
            </div>
            <SearchField placeholder="Research" className="w-[300px]" />
          </div>
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
