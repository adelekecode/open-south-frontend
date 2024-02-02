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
  CreateOrganization,
} from "./pages/account";
import News from "./pages/news";
import NewsDetails from "./pages/news-details";
import Partner from "./pages/partner";
import { dashboardLoader } from "./utils/routes-addons/dashboard";
import { appLoader } from "./utils/routes-addons/app";
import Contact from "./pages/contact";
import AppLoader from "./components/loader/app-loader";
import UserRestricted from "./layouts/user-restricted";
import AdminRestricted from "./layouts/admin-restricted";
import {
  User,
  Category as AdminCategory,
  Dashboard as AdminDashboard,
  Dataset as AdminDataset,
  Organization as AdminOrganization,
  OrganizationDetails as AdminOrganizationDetails,
  News as AdminNews,
} from "./pages/admin";
import Profile from "./pages/account/profile";
import EditOrganization from "./pages/account/edit-organization";
import UserOrganization from "./layouts/user-organization";
import PublicProfile from "./pages/public-profile";
import AppLayoutWrapper from "./layouts/app-wrapper";

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
          <Route element={<AppLayoutWrapper />}>
            <Route
              element={
                <>
                  <UserRestricted />
                </>
              }
            >
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
              <Route path="/account/datasets/:id" element={<AccountDatasetDetails />} />
              <Route element={<UserOrganization />}>
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
                <Route path="/account/:slug/edit" element={<EditOrganization />} />
              </Route>
              <Route path="/account/organizations/new" element={<CreateOrganization />} />
              <Route
                path="/account/profile"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <Profile />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<AdminRestricted />}>
              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="/admin/datasets"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <AdminDataset />
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
                path="/admin/users"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <User />
                  </Suspense>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/admin/news"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <AdminNews />
                  </Suspense>
                }
              />
              <Route
                path="/admin/organizations"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <AdminOrganization />
                  </Suspense>
                }
              />
              <Route
                path="/admin/organizations/:id"
                element={
                  <Suspense fallback={<DashboardLoader />}>
                    <AdminOrganizationDetails />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route loader={appLoader}>
        <Route element={<GetCurrentUser />}>
          <Route element={<AppLayoutWrapper />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/datasets" element={<Dataset />} />
              <Route path="/datasets/:slug" element={<DatasetDetails />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/users/:id" element={<PublicProfile />} />
              <Route path="/organizations" element={<Organization />} />
              <Route path="/organizations/:slug" element={<OrganizationDetails />} />
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
