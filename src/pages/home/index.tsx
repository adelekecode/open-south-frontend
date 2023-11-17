import Seo from "~/components/seo";
import Banner from "./banner";

export default function Home() {
  return (
    <>
      <Seo title="Home" description="Welcome to open south a data storage platform" />
      <main>
        <Banner />
      </main>
    </>
  );
}
