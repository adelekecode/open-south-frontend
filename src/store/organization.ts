import { create } from "zustand";

type State = {
  organizationVerificationModal: {
    open: boolean;
    data: Organization | null;
  };
};

type Action = {
  setOrganizationVerificationModal: (obj: State["organizationVerificationModal"]) => void;
};

const useOrganizationStore = create<State & Action>()((set) => ({
  organizationVerificationModal: {
    open: false,
    data: null,
  },
  setOrganizationVerificationModal: (obj) =>
    set({
      organizationVerificationModal: obj,
    }),
}));

export default useOrganizationStore;
