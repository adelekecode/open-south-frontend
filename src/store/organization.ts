import { create } from "zustand";

type State = {
  verificationModal: {
    open: boolean;
    data: Organization | null;
  };
  deleteConfirmationModal: {
    open: boolean;
    data: Organization | null;
  };
  pendingModal: {
    open: boolean;
  };
  rejectedModal: {
    open: boolean;
  };
};

type Action = {
  setVerificationModal: (obj: State["verificationModal"]) => void;
  setDeleteConfirmationModal: (obj: State["deleteConfirmationModal"]) => void;
  setPendingModal: (obj: State["pendingModal"]) => void;
  setRejectedModal: (obj: State["rejectedModal"]) => void;
};

const useOrganizationStore = create<State & Action>()((set) => ({
  verificationModal: {
    open: false,
    data: null,
  },
  setVerificationModal: (obj) =>
    set({
      verificationModal: obj,
    }),
  deleteConfirmationModal: {
    open: false,
    data: null,
  },
  setDeleteConfirmationModal: (obj) =>
    set({
      deleteConfirmationModal: obj,
    }),
  pendingModal: {
    open: false,
  },
  setPendingModal: (obj) =>
    set({
      pendingModal: obj,
    }),
  rejectedModal: {
    open: false,
  },
  setRejectedModal: (obj) =>
    set({
      rejectedModal: obj,
    }),
}));

export default useOrganizationStore;
