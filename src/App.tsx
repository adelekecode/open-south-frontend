import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Protected from "./layouts/protected";
import { ForgotPassword, Login, ResetPassword, Signup } from "./pages/auth";
import NotFound from "./pages/404";
import ErrorBoundary from "./components/error-boundary";
import DashboardLoader from "./components/loader/dashboard-loader";
import Auth from "./layouts/auth";
import AppLayout from "./layouts/app";
import Home from "./pages/home";
import Dataset from "./pages/dataset";
import About from "./pages/about";
import Terms from "./pages/terms";
import Category from "./pages/category";
import Organization from "./pages/organization";
import DatasetDetails from "./pages/dataset-details";
import OrganizationDetails from "./pages/organization-details";
import PrivacyPolicy from "./pages/privacy-policy";
import GetCurrentUser from "./layouts/get-current-user";
import Faq from "./pages/faq";
import {
  Dashboard,
  Dataset as AccountDataset,
  DatasetDetails as AccountDatasetDetails,
  OrgDashboard,
  OrgDataset,
  CreateDataset,
  CreateOrg,
} from "./pages/account";
import GetUserDataset from "./layouts/get-user-dataset";
import News from "./pages/news";
import NewsDetails from "./pages/news-details";
import Partner from "./pages/partner";
import { dashboardLoader } from "./utils/routes-addons/dashboard";
import { appLoader } from "./utils/routes-addons/app";
import Contact from "./pages/contact";
import { organizationDetailsLoader } from "./utils/routes-addons/organization-details";
import { datasetDetailsLoader } from "./utils/routes-addons/dataset-details";
import AppLoader from "./components/loader/app-loader";
import UserRestricted from "./layouts/user-restricted";
import AdminRestricted from "./layouts/admin-restricted";
import { User, Category as AdminCategory, CreateCategory } from "./pages/admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token/:uuid" element={<ResetPassword />} />
      </Route>
      <Route loader={dashboardLoader}>
        <Route element={<Protected />}>
          <Route element={<UserRestricted />}>
            <Route
              path="/account/dashboard"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/account/datasets"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <AccountDataset />
                </Suspense>
              }
            />
            <Route
              path="/account/datasets/new"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <CreateDataset />
                </Suspense>
              }
            />
            <Route element={<GetUserDataset />}>
              <Route path="/account/datasets/:id" element={<AccountDatasetDetails />} />
            </Route>
            <Route
              path="/account/:slug/dashboard"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <OrgDashboard />
                </Suspense>
              }
            />
            <Route
              path="/account/:slug/datasets"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <OrgDataset />
                </Suspense>
              }
            />
            <Route
              path="/account/organizations/new"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <CreateOrg />
                </Suspense>
              }
            />
          </Route>
          <Route element={<AdminRestricted />}>
            <Route
              path="/admin/dashboard"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <AdminCategory />
                </Suspense>
              }
            />
            <Route
              path="/admin/categories/new"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <CreateCategory />
                </Suspense>
              }
            />
            <Route
              path="/admin/users"
              element={
                <Suspense fallback={<DashboardLoader />}>
                  <User />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route loader={appLoader}>
        <Route element={<GetCurrentUser />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/datasets" element={<Dataset />} />
            <Route
              path="/datasets/:slug"
              element={<DatasetDetails />}
              loader={datasetDetailsLoader}
            />
            <Route path="/datasets/:slug/resources/:id" element={<div>File Preview</div>} />
            <Route path="/categories" element={<Category />} />
            <Route path="/organizations" element={<Organization />} />
            <Route
              path="/organizations/:slug"
              element={<OrganizationDetails />}
              loader={organizationDetailsLoader}
            />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetails />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<Partner />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <div className="min-h-screen flex">
            <NotFound />
          </div>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<AppLoader />} />;
}

export default App;
