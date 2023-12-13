import Button from "~/components/button";

type ResourceProps = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Resource({ setActiveIndex }: ResourceProps) {
  return (
    <div className="pt-4 flex flex-col gap-10">
      <footer className="border-t p-4 py-2 flex items-center justify-between">
        <Button
          color="info"
          className="!py-2"
          onClick={() => {
            setActiveIndex((prev) => prev - 1);
          }}
        >
          Previous
        </Button>
        <Button
          className="!py-2"
          onClick={() => {
            setActiveIndex((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}
