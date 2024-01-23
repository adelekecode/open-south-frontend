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
  image_url: string | null;
  date_joined: string;
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
    type: "individual" | "organization";
  };
  geojson: {
    country: string;
    coordinates: string;
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
  email: string;
  linkedin: string;
  twitter: string;
  website: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  type: "cooperate_organisation" | "cooperate_society";
  downloads_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
};

type News = {
  id: string;
  image_url: string | null;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  updated_at: string;
  is_published: string;
  is_deleted: string;
  published_at: string;
};

type CategoyModal = {
  state: "create" | "edit" | "view" | "delete" | null;
  data: Category | null;
};

type NewsModal = {
  state: "create" | "edit" | "view" | "delete" | null;
  data: News | null;
};

type PaginationData<T> = {
  count: number;
  next: boolean | null;
  previous: boolean | null;
  results: T;
};
