import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import moment from "moment";
import { stripHtml } from "string-strip-html";

type CardProps = Dataset;

export default function Card({ slug, title, updated_at, description, publisher_data }: CardProps) {
  const navigate = useNavigate();

  const formattedTimestamp = moment(updated_at).fromNow();

  const stripedDescription = stripHtml(`${description}`, {
    stripTogetherWithTheirContents: ["style", "pre"],
  }).result;

  return (
    <button
      onClick={() => {
        navigate(`./${slug}`, {
          state: {
            name: title,
          },
        });
      }}
      className="grid grid-cols-[5rem,1fr] gap-6 border-[1.5px] border-info-200 p-6 hover:bg-info-50"
    >
      {publisher_data?.image_url || publisher_data?.logo_url ? (
        <figure className="border border-zinc-300 w-full aspect-square bg-white">
          <img
            className="w-full h-full object-contain"
            src={publisher_data.image_url || publisher_data.logo_url || ""}
            alt="organization or profile photo"
          />
        </figure>
      ) : (
        <Avatar variant="square" className="!w-[5rem] !h-[5rem]">
          <IoPerson className={`text-3xl`} />
        </Avatar>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold text-start">{title}</h1>
        <p className="flex items-center text-xs gap-1">
          by
          <Link
            className="text-primary-600 capitalize hover:underline relative z-10"
            to={
              publisher_data.type === "organisation"
                ? `/organizations/${publisher_data.slug}`
                : publisher_data.type === "individual"
                  ? `/users/${publisher_data.id}`
                  : ""
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {publisher_data.type === "organisation" ? (
              <span>{publisher_data.name}</span>
            ) : publisher_data.type === "individual" ? (
              <span>
                {`${publisher_data?.first_name || "--"} ${publisher_data?.last_name || "--"}`}
              </span>
            ) : (
              "-------"
            )}
          </Link>
        </p>
        <p className="text-start text-sm">
          {stripedDescription.length > 200
            ? stripedDescription.substring(0, 200).split(" ").slice(0, -1).join(" ") + "..."
            : stripedDescription}
        </p>
        <p className="text-xs text-end mt-4">
          - Updated <span>{formattedTimestamp}</span>
        </p>
      </div>
    </button>
  );
}
