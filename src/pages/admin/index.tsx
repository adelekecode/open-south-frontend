import { lazy } from "react";

export const Dashboard = lazy(() => import("./dashboard"));
export const User = lazy(() => import("./user"));
export const Category = lazy(() => import("./category"));
export const News = lazy(() => import("./news"));
export const Dataset = lazy(() => import("./dataset"));
export const DatasetDetails = lazy(() => import("./dataset-details"));
export const Organization = lazy(() => import("./organization"));
export const OrganizationDetails = lazy(() => import("./organization-details"));
export const AdminDevelopers = lazy(() => import("./developers"));
