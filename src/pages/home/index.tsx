import Seo from "~/components/seo";
import Panel from "./panel";
import Banner from "./banner";
import Map from "./map";

export default function Home() {
  return (
    <>
      <Seo title="Home" description="Welcome to open south a data storage platform" />
      <main>
        <Map />
        <Panel />
        <Banner />
      </main>
    </>
  );
}
