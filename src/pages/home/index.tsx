import Seo from "~/components/seo";
import Panel from "./panel";
import Banner from "./banner";
import Dataset from "./dataset";
import Category from "./category";

export default function Home() {
  return (
    <>
      <Seo title="Home" description="Welcome to open south a data storage platform" />
      <main>
        <Panel />
        <Dataset />
        <Category />
        <Banner />
      </main>
    </>
  );
}
