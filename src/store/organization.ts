import { create } from "zustand";

type State = {
  organizationVerificationModal: {
    open: boolean;
    data: Organization | null;
  };
  organizationDeleteConfirmationModal: {
    open: boolean;
    data: Organization | null;
  };
};

type Action = {
  setOrganizationVerificationModal: (obj: State["organizationVerificationModal"]) => void;
  setOrganizationDeleteConfirmationModal: (
    obj: State["organizationDeleteConfirmationModal"]
  ) => void;
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
  organizationDeleteConfirmationModal: {
    open: false,
    data: null,
  },
  setOrganizationDeleteConfirmationModal: (obj) =>
    set({
      organizationDeleteConfirmationModal: obj,
    }),
}));

export default useOrganizationStore;
