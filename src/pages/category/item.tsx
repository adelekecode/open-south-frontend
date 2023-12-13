import { Link } from "react-router-dom";

type ItemProps = {
  label: string;
  slug: string;
  illustration: string;
  description: string;
};

export default function Item({ label, slug, illustration, description }: ItemProps) {
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
      <figure className="bg-primary-50 flex items-center justify-center p-4 w-full max-h-[200px] aspect-[1/0.1]">
        <img
          src={illustration}
          alt={`${label} category`}
          className="object-contain w-full h-full"
        />
      </figure>
      <div className="flex flex-col items-start gap-4 p-4">
        <h2 className="text-base font-semibold">{label}</h2>
        <p className="text-start text-sm">{description}</p>
      </div>
    </Link>
  );
}
