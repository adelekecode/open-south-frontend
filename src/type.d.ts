type CurrentUser = {
  id: string;
  email: string;
  role: "user" | "admin";
  profile_data: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  image: string | null;
};
