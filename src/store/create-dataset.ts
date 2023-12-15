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
};

type Action = {
  setDataset: (data: State["dataset"]) => void;
};

const useCreateDatasetStore = create<State & Action>()((set) => ({
  dataset: null,
  setDataset: (dataset) => set({ dataset }),
}));

export default useCreateDatasetStore;
