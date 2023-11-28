type CurrentUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: "user" | "admin";
  profile_data: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  image: string | null;
};

type Dataset = {
  title: string;
  organization: {
    name: string;
    image: string;
    slug?: string;
  } | null;
  user: {
    firstName: string;
    lastName: string;
    image: string;
  } | null;
  description: string;
  slug: string;
  updatedAt: string;
};
