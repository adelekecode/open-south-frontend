import { create } from "zustand";

type State = {
  pagination: {
    pageSize: number;
    page: number;
  };
};

type Action = {
  setPagination: (obj: State["pagination"]) => void;
};

const useAdminOrganizationStore = create<State & Action>()((set) => ({
  pagination: {
    pageSize: 10,
    page: 1,
  },
  setPagination: (pagination) =>
    set({
      pagination,
    }),
}));

export default useAdminOrganizationStore;
