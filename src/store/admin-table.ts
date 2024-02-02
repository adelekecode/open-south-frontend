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
};

type Action = {
  setDataset: (obj: State["dataset"]) => void;
  setOrganization: (obj: State["organization"]) => void;
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
}));

export default useAdminTableStore;
