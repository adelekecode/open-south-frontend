import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiLock } from "react-icons/bi";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoMenu,
  IoSettingsOutline,
  IoGridOutline,
} from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { twMerge } from "tailwind-merge";
import Logo from "~/components/logo";
import SearchInput from "~/components/inputs/search-input";
import CurrentUserAvatar from "~/components/current-user-avatar";
import useAppStore from "~/store/app";
import { useCurrentUser } from "~/queries/user";
import ChangeLang from "~/components/change-lang";

type HeaderProps = {
  routes: { to: string; name: string }[];
  setRoutePath: (data: React.ReactNode[]) => void;
  setOpenSidebar: (bool: boolean) => void;
};

export default function Header({ routes, setRoutePath, setOpenSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const { t } = useTranslation("layout");

  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  function handleInputBlur() {
    setShowList(false);
  }

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        handleInputBlur();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { setDisplayLogoutModal } = useAppStore();

  const { data: currentUser } = useCurrentUser(undefined, {
    enabled: false,
  });

  return (
    <nav className="w-full shadow-appNavBar flex flex-col items-center">
      <div className="w-full border-b-[1.5px] border-zinc-200 flex items-center tablet:pb-2 justify-center">
        <div className=" w-full max-w-maxAppWidth flex items-start justify-between gap-4 p-4 px-6 tablet:pl-2 largeMobile:pr-4 largeMobile:!pl-0 tablet:grid tablet:grid-cols-[1fr,80px]">
          <Link to={"/"} className="p-6 px-4 w-fit hover:bg-zinc-100">
            <Logo className="w-[10rem] tablet:w-[8rem] mediumMobile:!w-[7rem]" />
          </Link>
          <IconButton
            className="w-fit !ml-auto !hidden tablet:!block"
            onClick={() => {
              setOpenSidebar(true);
            }}
          >
            <IoMenu className="text-zinc-800" />
          </IconButton>
          <div className="flex flex-col items-end gap-4 pr-4 tablet:pr-0 tablet:w-full tablet:col-span-2">
            <div className="flex item-center gap-4 flex-wrap [&_button]:rounded-full [&_button>p]:text-primary-700 [&_button]:p-2 [&_button]:py-1 [&_button>p]:text-sm [&_button>p]:font-medium [&_button]:flex [&_button]:items-center [&_button]:gap-2 tablet:hidden justify-end">
              <ChangeLang />
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3">
                    <CurrentUserAvatar />
                    <p className="capitalize text-sm font-medium">
                      <span>
                        {currentUser.first_name ||
                          currentUser.profile_data?.first_name ||
                          "-------"}
                      </span>{" "}
                      <span>
                        {currentUser.last_name || currentUser.profile_data?.last_name || "-------"}
                      </span>
                    </p>
                  </div>
                  <button
                    className="hover:bg-zinc-100 h-fit self-center"
                    onClick={() => {
                      navigate(
                        currentUser.role === "admin" ? "/admin/dashboard" : "/account/dashboard"
                      );
                    }}
                  >
                    <IoSettingsOutline className="text-primary-700" />
                    <p>{t("header.dashboard")}</p>
                  </button>
                  <button
                    className="hover:bg-zinc-100 h-fit self-center"
                    onClick={() => {
                      setDisplayLogoutModal(true);
                    }}
                  >
                    <IoLogOutOutline className="text-primary-700" />
                    <p>{t("header.logout")}</p>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:bg-zinc-100 h-fit self-center"
                    onClick={() => {
                      navigate("/login", {
                        state: {
                          from: pathname,
                        },
                      });
                    }}
                  >
                    <BiLock className="text-primary-700" />
                    <p>{t("header.login")}</p>
                  </button>
                  <button
                    className="hover:bg-zinc-100 h-fit self-center"
                    onClick={() => {
                      navigate("/signup", {
                        state: {
                          from: pathname,
                        },
                      });
                    }}
                  >
                    <IoPersonCircleOutline className="text-primary-700" />
                    <p>{t("header.signup")}</p>
                  </button>
                </>
              )}
            </div>
            <div className="w-[400px] tablet:w-full relative">
              <div className="tablet:pl-4">
                <SearchInput
                  placeholder={t("header.search.placeholder")}
                  value={search}
                  inputRef={searchInputRef}
                  onChange={(e) => {
                    if (!showList) {
                      setShowList(true);
                    }
                    setSearch(e.target.value);
                  }}
                  onFocus={(e) => {
                    if (e.target.value.trim()) {
                      setShowList(true);
                    }
                  }}
                  className="w-full"
                  wrapperClassName="tablet:w-full"
                />
              </div>
              <Box
                className={`!w-full absolute transition top-[41px] z-10 !bg-transparent ${showList ? "block" : "hidden"}`}
                ref={listRef}
              >
                <List className="tablet:!ml-4 bg-white shadow-md">
                  <ListItem
                    disablePadding
                    onClick={() => {
                      if (search.trim()) navigate(`/datasets?q=${search}`);

                      handleInputBlur();
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IoGridOutline className="text-info-950" />
                      </ListItemIcon>
                      <ListItemText
                        primary={t("header.search.dataset", { search })}
                        className="break-words"
                      />
                    </ListItemButton>
                  </ListItem>
                  <div className="w-full px-4">
                    <Divider />
                  </div>

                  <ListItem
                    disablePadding
                    onClick={() => {
                      if (search.trim()) navigate(`/organizations?q=${search}`);

                      handleInputBlur();
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <GoOrganization className="text-info-950" />
                      </ListItemIcon>
                      <ListItemText
                        primary={t("header.search.organization", { search })}
                        className="break-words"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 tablet:px-2 flex items-start w-full max-w-maxAppWidth tablet:hidden overflow-x-auto">
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
              <p className={twMerge(`text-sm text-nowrap`, isActive && "text-primary-700")}>
                {item.name}
              </p>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
