import { create } from "zustand";

type State = {
  dataset: {
    id: string;
    title: string;
    description: string;
    license: string;
    tags: string[];
    updateFrequency: string;
    start: string;
    end: string;
    category: string;
    spatialCoverage: string;
  } | null;
  organization: Organization | null;
};

type Action = {
  setDataset: (data: State["dataset"]) => void;
  setOrganization: (data: State["organization"]) => void;
};

const useCreateDatasetStore = create<State & Action>()((set) => ({
  dataset: null,
  setDataset: (dataset) => set({ dataset }),
  organization: null,
  setOrganization: (organization) => set({ organization }),
}));

export default useCreateDatasetStore;
