export default function Panel() {
  return (
    <div className="w-full max-w-maxAppWidth p-6 largeMobile:px-4 mx-auto">
      <div className="shadow-md rounded-lg w-full p-6 gap-5 flex flex-col">
        <h3 className="text-base font-semibold">Open South</h3>
        <div className="flex justify-between flex-wrap gap-8 [&>div]:flex [&>div]:gap-3 [&>div>span]:bg-primary-700 [&>div>span]:rounded-full [&>div>span]:w-1 [&>div>div]:flex [&>div>div]:items-start [&>div>div]:flex-col [&>div>div]:gap-1 [&>div>div>h1]:text-3xl [&>div>div>h1]:font-semibold [&>div>div>p]:text-zinc-700">
          <div>
            <span></span>
            <div>
              <h1>46,897</h1>
              <p>Datasets</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>201,475</h1>
              <p>Files</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>26,897</h1>
              <p>Categories</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>123,567</h1>
              <p>Users</p>
            </div>
          </div>
          <div>
            <span></span>
            <div>
              <h1>4,666</h1>
              <p>Organizations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
