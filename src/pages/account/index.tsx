import { lazy } from "react";

export const Dashboard = lazy(() => import("./dashboard"));
export const Dataset = lazy(() => import("./dataset"));
export const OrgDashboard = lazy(() => import("./organization/dashboard"));
export const OrgDataset = lazy(() => import("./organization/dataset"));
