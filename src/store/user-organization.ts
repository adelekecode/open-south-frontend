import { create } from "zustand";

type State = {
  verificationModal: {
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
  setPendingModal: (obj: State["pendingModal"]) => void;
  setRejectedModal: (obj: State["rejectedModal"]) => void;
};

const useUserOrganizationStore = create<State & Action>()((set) => ({
  verificationModal: {
    open: false,
    data: null,
  },
  setVerificationModal: (obj) =>
    set({
      verificationModal: obj,
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

export default useUserOrganizationStore;
