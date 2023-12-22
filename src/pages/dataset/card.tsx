import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { stripHtml } from "string-strip-html";
import CurrentUserAvatar from "~/components/current-user-avatar";

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
      {publisher_data?.image_url ? (
        <figure className="border border-zinc-300 w-full aspect-square bg-white">
          <img
            className="w-full h-full object-contain"
            src={publisher_data.image_url || ""}
            alt="organization or profile photo"
          />
        </figure>
      ) : (
        <CurrentUserAvatar
          className="!w-full !h-[5rem] !bg-white !border"
          iconContainer={{
            icon: {
              className: "!text-info-700 !text-2xl",
            },
          }}
        />
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold text-start">{title}</h1>
        <p className="flex items-center text-xs gap-1">
          by
          <Link
            className="text-primary-600 capitalize hover:underline relative z-10"
            to={`/users/id`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {`${publisher_data?.first_name || "--"} ${publisher_data?.last_name || "--"}`}
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
