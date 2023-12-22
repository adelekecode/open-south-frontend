import { lazy } from "react";

export const Dashboard = lazy(() => import("./dashboard"));
export const User = lazy(() => import("./user"));
export const Category = lazy(() => import("./category"));
export const CreateCategory = lazy(() => import("./create-category"));
