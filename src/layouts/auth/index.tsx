import { Link, Outlet } from "react-router-dom";
import Footer from "~/components/footer";
import Logo from "~/components/logo";

export default function Auth() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className={"grid authTablet:grid-cols-1 flex-grow"}>
        <div className="w-full flex justify-center items-center py-20 authTablet:justify-center authTablet:pb-12 relative">
          <Link to={"/"} className="absolute top-0 left-0 p-6">
            <Logo className="largeMobile:w-[6rem]" />
          </Link>
          <div className="authDesktop:!max-w-[700px] w-full flex flex-col justify-center items-center largeMobile:px-4 largeMobile:pt-12">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
