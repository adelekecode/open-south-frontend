import { lazy } from "react";

export const Dashboard = lazy(() => import("./dashboard"));
export const Dataset = lazy(() => import("./dataset"));
export const CreateDataset = lazy(() => import("./create-dataset"));
export const CreateOrg = lazy(() => import("./create-organization"));
export const DatasetDetails = lazy(() => import("./dataset-details"));
export const OrgDashboard = lazy(() => import("./organization/dashboard"));
export const OrgDataset = lazy(() => import("./organization/dataset"));
