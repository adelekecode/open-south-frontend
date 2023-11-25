import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

type CardProps = Dataset;

export default function Card({
  slug,
  title,
  organization,
  user,
  updatedAt,
  description,
}: CardProps) {
  const navigate = useNavigate();

  const formattedTimestamp = moment(updatedAt).fromNow();

  return (
    <button
      onClick={() => {
        navigate(`./${slug}`, {
          state: {
            name: title,
          },
        });
      }}
      className="flex items-start gap-6 border-[1.5px] border-info-200 p-6 hover:bg-info-50"
    >
      <figure className="border border-zinc-300 w-[9.5rem] aspect-square bg-white">
        <img
          className="w-full h-full object-contain"
          src={organization ? organization.image : user ? user.image : ""}
          alt="organization or profile photo"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold text-start capitalize">{title}</h1>
        <p className="flex items-center text-sm gap-1">
          by
          {organization ? (
            <Link
              className="text-primary-600 capitalize hover:underline relative z-10"
              to={`/organization/${organization.slug}`}
            >
              {organization.name}
            </Link>
          ) : user ? (
            <span className="capitalize">{`${user.firstName} ${user.lastName}`}</span>
          ) : (
            "-------"
          )}
        </p>
        <p className="capitalize text-start">
          {description.length > 200
            ? description.substring(0, 200).split(" ").slice(0, -1).join(" ") + "..."
            : description}
        </p>
        <p className="text-sm text-end mt-4">
          - Updated <span>{formattedTimestamp}</span>
        </p>
      </div>
    </button>
  );
}
