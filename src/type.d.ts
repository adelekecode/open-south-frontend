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
  id: string;
  title: string;
  slug: string;
  description: string;
  updated_at: string;
  created_at: string;
  files: File[];
  file_count: number;
  license: string;
  tags_data: {
    name: string;
  }[];
  update_frequency: string;
  temporal_coverage: string;
  spatial_coverage: string;
  views: number;
  status: "pending" | "published" | "rejected" | "further_review";
  publisher_data: {
    email: string;
    first_name: string;
    last_name: string;
    role: "user";
    image_url: string;
    type: "individual";
  };
};

type Category = {
  id: string;
  data_count: number;
  image_url: string | null;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type File = {
  file_url: string;
  format: string;
  sha256: string;
  size: string;
};

type Organization = {
  id: string;
  data_count: number;
  logo: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
};
