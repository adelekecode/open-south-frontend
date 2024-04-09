export const APP_MODE = import.meta.env.MODE;

export const API_URL = import.meta.env.VITE_API_URL;

export const REFRESH_TOKEN_KEY = "refresh_token";

export const VITE_PUBLIC_GOOGLE_CLIENT_ID = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID as string;

export const trafficLocationColors = {
  bgColors: [
    "bg-[#00a4ffcf]",
    "bg-[#ffa500cf]",
    "bg-[#008000cf]",
    "bg-[#ab2fabcf]",
    "bg-[#d64794]",
    "bg-[#d64794cf]",
  ],
  borderColors: [
    "border-[#00a4ffcf]",
    "border-[#ffa500cf]",
    "border-[#008000cf]",
    "border-[#ab2fabcf]",
    "border-[#d64794]",
    "border-[#d64794cf]",
  ],
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&£^#+-.])[A-Za-z\d@$!%*?&£^#+-.]{8,}$/;
