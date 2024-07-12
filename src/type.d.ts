type CurrentUser = {
  id: string;
  email: string;
  bio: string | null;
  first_name?: string;
  last_name?: string;
  role: "user" | "admin";
  is_active: boolean;
  profile_data: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  image_url: string | null;
  date_joined: string;
  organisations: {
    id: string;
    name: string;
    slug: string;
  }[];
  meta: {
    developer_enabled: boolean;
  } | null;
  api_: {
    is_active: boolean;
  } | null;
};

type Dataset = {
  id: string;
  title: string;
  slug: string;
  description: string;
  updated_at: string;
  created_at: string;
  files: DatasetFile[];
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
    name: string;
    logo_url;
    last_name: string;
    role: string;
    slug: string;
    image_url: string;
    type: "individual" | "organisation";
    id: string;
  };
  category: string;
  geojson: {
    country: string;
    coordinates: string;
  };
  user: string;
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

type DatasetFile = {
  format: string;
  sha256: string;
  size: string;
  file_url: string;
  id: string;
  created_at: string;
  updated_at: string;
  file_name: string;
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
  is_active: boolean;
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
  state: "create" | "edit" | "view" | null;
  data: News | null;
};

type PaginatedResponse<T> = {
  count: number;
  next: boolean | null;
  previous: boolean | null;
  results: T;
};

type OrganizationRequest = {
  id: string;
  status: "pending" | "denied";
  is_accepted: boolean;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
  organisation: string;
  user: string;
  user_data: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    image_url: string;
  };
};

type Pagination = { pageSize: number; page: number };

type OrganizationModalProps = {
  onClose: () => void;
  data: Organization;
  pagination: Pagination;
  queryParams: {
    search: string;
    filter: {
      isActive: string;
      isVerified: string;
      status: string;
    };
  };
};
