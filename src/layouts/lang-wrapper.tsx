import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAppStore from "~/store/app";

export default function LangWrapper() {
  const { langId, setLangId } = useAppStore();

  useEffect(() => {
    (async () => {
      if (!langId) {
        const { data } = await axios.get("/public/IP/");

        setLangId(data.instance.id);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
}
