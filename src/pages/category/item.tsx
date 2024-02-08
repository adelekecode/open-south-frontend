import { Link } from "react-router-dom";

type ItemProps = Category;

export default function Item({ name, slug, image_url, description }: ItemProps) {
  return (
    <Link
      to={{
        pathname: "/datasets",
        search: `?${new URLSearchParams({
          category: slug,
        }).toString()}`,
      }}
      className="flex flex-col border-[1.5px] border-info-200 hover:bg-info-50"
    >
      <figure className="bg-primary-50 flex items-center justify-center p-4 w-full h-[200px] aspect-[1/0.1]">
        <img
          src={image_url || ""}
          alt={`${name} category`}
          className="object-contain w-full h-full"
        />
      </figure>
      <div className="flex flex-col items-start gap-4 p-4">
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-start text-sm largeMobile:text-xs">{description}</p>
      </div>
    </Link>
  );
}
