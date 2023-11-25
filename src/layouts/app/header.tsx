import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import Logo from "~/components/logo";
import SearchInput from "~/components/search-input";
// import { useQueryClient } from "@tanstack/react-query";

type HeaderProps = {
  setRoutePath: (data: React.ReactNode[]) => void;
};

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
    to: "/about",
    name: "About Us",
  },
  {
    to: "/news",
    name: "News",
  },
  {
    to: "/contact",
    name: "Contact Us",
  },
];

export default function Header({ setRoutePath }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  useEffect(() => {
    const route = routes.find((item) => pathname.startsWith(item.to));

    if (route) {
      const arr = [];

      arr[0] = state ? (
        <Link to={`${route.to}`} key="2" className={`hover:underline`}>
          {route.name}
        </Link>
      ) : (
        <p key="2">{route.name}</p>
      );

      if (state) {
        arr[1] = <p key="3">{state.name}</p>;
      }
      setRoutePath(arr);
    }

    return () => {
      setRoutePath([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // const queryClient = useQueryClient();
  // const currentUser = queryClient.getQueryData(["/auth/users/me"]);

  return (
    <nav className="w-full shadow-appNavBar flex flex-col items-center">
      <div className="w-full border-b-[1.5px] border-zinc-200 flex items-center justify-center">
        <div className=" w-full max-w-maxAppWidth flex items-center justify-between gap-4 p-4 px-6 tablet:pl-2">
          <Link to={"/"} className="p-6 px-4 w-fit hover:bg-zinc-100">
            <Logo className="w-[10rem]" />
          </Link>
          <div className="flex flex-col items-end gap-4 pr-4 tablet:pr-0">
            <div className="flex item-center gap-4 [&_button]:rounded-full [&_button>p]:text-primary-700 [&_button]:p-2 [&_button]:py-1 [&_button>p]:text-sm [&_button>p]:font-medium [&_button]:flex [&_button]:items-center [&_button]:gap-2">
              <button
                className="hover:bg-zinc-100"
                onClick={() => {
                  navigate("/login", {
                    state: {
                      from: pathname,
                    },
                  });
                }}
              >
                <BiLock className="text-primary-700" />
                <p>Log In</p>
              </button>
              <button
                className="hover:bg-zinc-100"
                onClick={() => {
                  navigate("/signup", {
                    state: {
                      from: pathname,
                    },
                  });
                }}
              >
                <IoPersonCircleOutline className="text-primary-700" />
                <p>Sign Up</p>
              </button>
            </div>
            <SearchInput placeholder="Search" className="w-[300px]" />
          </div>
        </div>
      </div>
      <div className="px-6 tablet:px-2 flex items-start w-full max-w-maxAppWidth">
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
