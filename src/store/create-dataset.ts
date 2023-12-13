import { create } from "zustand";

type State = {
  selectedOrg: string | null;
};

type Action = {
  setSelectedOrg: (val: State["selectedOrg"]) => void;
};

const useCreateDatasetStore = create<State & Action>()((set) => ({
  selectedOrg: null,
  setSelectedOrg: (val) =>
    set({
      selectedOrg: val,
    }),
}));

export default useCreateDatasetStore;
