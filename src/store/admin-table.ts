import { create } from "zustand";

type State = {
  dataset: {
    search: string;
    filterBy: {
      status: "pending" | "rejected" | "published" | "further_review" | "unpublished" | null;
    };
    pagination: {
      pageSize: number;
      page: number;
    };
  };
  organization: {
    search: string;
    filterBy: {
      status: "reject" | "approve" | "block" | "unblock" | "delete" | null;
      isVerified: "true" | "false" | null;
      isActive: "true" | "false" | null;
    };
    pagination: {
      pageSize: number;
      page: number;
    };
  };
  news: {
    search: string;
    filterBy: {
      status: "draft" | "published" | "unpublished" | null;
    };
    pagination: {
      pageSize: number;
      page: number;
    };
  };
  user: {
    search: string;
    filterBy: {
      isActive: "true" | "false" | null;
    };
    pagination: {
      pageSize: number;
      page: number;
    };
  };
  category: {
    search: string;
    pagination: {
      pageSize: number;
      page: number;
    };
  };
};

type Action = {
  setDataset: (obj: State["dataset"]) => void;
  setOrganization: (obj: State["organization"]) => void;
  setNews: (obj: State["news"]) => void;
  setUser: (obj: State["user"]) => void;
  setCategory: (obj: State["category"]) => void;
};

const useAdminTableStore = create<State & Action>()((set) => ({
  dataset: {
    search: "",
    filterBy: {
      status: null,
    },
    pagination: {
      pageSize: 10,
      page: 0,
    },
  },
  setDataset: (dataset) => {
    return set({
      dataset,
    });
  },
  organization: {
    search: "",
    filterBy: {
      status: null,
      isVerified: null,
      isActive: null,
    },
    pagination: {
      pageSize: 10,
      page: 0,
    },
  },
  setOrganization: (organization) =>
    set({
      organization,
    }),
  news: {
    search: "",
    filterBy: {
      status: null,
    },
    pagination: {
      pageSize: 10,
      page: 0,
    },
  },
  setNews: (news) =>
    set({
      news,
    }),
  user: {
    search: "",
    filterBy: {
      isActive: null,
    },
    pagination: {
      pageSize: 10,
      page: 0,
    },
  },
  setUser: (user) =>
    set({
      user,
    }),
  category: {
    search: "",
    pagination: {
      pageSize: 10,
      page: 0,
    },
  },
  setCategory: (category) =>
    set({
      category,
    }),
}));

export default useAdminTableStore;
