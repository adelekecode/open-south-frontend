export default function CreateDatasetLoader() {
  return (
    <div className="grid grid-rows-[150px,1fr] gap-4 flex-grow">
      <div className="grid grid-cols-4 gap-4">
        <div className="animate-pulse rounded-lg bg-gray-200 h-full" />
        <div className="animate-pulse rounded-lg bg-gray-200 h-full" />
        <div className="animate-pulse rounded-lg bg-gray-200 h-full" />
        <div className="animate-pulse rounded-lg bg-gray-200 h-full" />
      </div>
      <div className="animate-pulse rounded-lg h-full bg-gray-200" />
    </div>
  );
}
