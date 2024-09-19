import { lazy } from "react";

export const Dashboard = lazy(() => import("./dashboard"));
export const Dataset = lazy(() => import("./dataset"));
export const CreateDataset = lazy(() => import("./create-dataset"));
export const DatasetDetails = lazy(() => import("./dataset-details"));
export const OrgDashboard = lazy(() => import("./organization/dashboard"));
export const OrgDataset = lazy(() => import("./organization/dataset"));
export const OrgDatasetDetails = lazy(() => import("./organization/dataset-details"));
export const CreateOrganization = lazy(() => import("./create-organization"));
export const Developer = lazy(() => import("./developer"));
export const ChangePassword = lazy(() => import("./settings/change-password"));
export const DeleteAccount = lazy(() => import("./settings/delete-account"));
