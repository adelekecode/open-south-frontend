import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";
import { useChangeLang } from "~/mutations/lang";
import useAppStore from "~/store/app";
import Button from "./button";

const langs = [
  {
    value: "en",
    text: "English",
  },
  {
    value: "fr",
    text: "French",
  },
  {
    value: "pt",
    text: "Portuguese",
  },
  {
    value: "es",
    text: "Spanish",
  },
  {
    value: "sw",
    text: "Swahili",
  },
];

export default function ChangeLang() {
  const { lang, setLang } = useAppStore();

  const { i18n } = useTranslation("layout");

  const { mutateAsync: changeLang } = useChangeLang();

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Button loading={loading} variant="text" color="info">
          loading
        </Button>
      ) : (
        <Select
          value={lang}
          onChange={async (e) => {
            const value = e.target.value;

            setLoading(true);
            const response = await changeLang({
              lang: value,
            });

            if (response) {
              i18n.changeLanguage(value);
              setLang(value);
              window.location.reload();
              setLoading(false);
            }
          }}
          sx={{
            "& fieldset": {
              borderWidth: "0px !important",
              borderRadius: "0px",
            },
          }}
        >
          {langs.map(({ value, text }, index) => (
            <MenuItem key={index} value={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
}
