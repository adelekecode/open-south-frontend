import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAppStore from "~/store/app";

export default function LangWrapper() {
  const { langId, setLangId, setLang, lang } = useAppStore();

  useEffect(() => {
    (async () => {
      if (lang === "pr") {
        setLang("pt");
      }

      if (!langId) {
        const { data } = await axios.get("/public/IP/");

        setLangId(data.instance.id);
        setLang(data.instance.lang);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
}
