export default function DashboardLoader() {
  return (
    <div className="grid grid-rows-[60px,1fr] gap-6 p-6 h-screen">
      <div className="animate-pulse rounded-lg bg-gray-200" />
      <div className="grid grid-cols-[200px,1fr] gap-6">
        <div className="animate-pulse rounded-lg h-full bg-gray-200" />
        <div className="animate-pulse rounded-lg h-full bg-gray-200" />
      </div>
    </div>
    // <div className="flex items-center justify-center w-full h-screen">
    //   <span className="dashboardLoader"></span>
    // </div>
  );
}
