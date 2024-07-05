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
  OrgDatasetDetails,
  CreateDataset,
  CreateOrganization,
  Developer as AccountDeveloper,
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
  DatasetDetails as AdminDatasetDetails,
  AdminDevelopers,
} from "./pages/admin";
import Profile from "./pages/account/profile";
import EditOrganization from "./pages/account/edit-organization";
import UserOrganization from "./layouts/user-organization";
import PublicProfile from "./pages/public-profile";
import AppLayoutWrapper from "./layouts/app-wrapper";
import EditDataset from "./pages/account/edit-dataset";
import CheckLocationPermission from "./layouts/check-location-permission";
import Paginated from "./layouts/paginated";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token/:uuid" element={<ResetPassword />} />
      </Route>
      <Route element={<CheckLocationPermission />}>
        <Route loader={dashboardLoader}>
          <Route element={<Protected />}>
            <Route element={<AppLayoutWrapper />}>
              <Route element={<UserRestricted />}>
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/datasets" element={<AccountDataset />} />
                <Route path="/account/datasets/new" element={<CreateDataset />} />
                <Route path="/account/datasets/:id" element={<AccountDatasetDetails />} />
                <Route path="/account/datasets/:id/edit" element={<EditDataset />} />
                <Route element={<UserOrganization />}>
                  <Route path="/account/:slug/dashboard" element={<OrgDashboard />} />
                  <Route path="/account/:slug/datasets" element={<OrgDataset />} />
                  <Route path="/account/:slug/datasets/:id" element={<OrgDatasetDetails />} />
                  <Route path="/account/:slug/edit" element={<EditOrganization />} />
                </Route>
                <Route path="/account/organizations/new" element={<CreateOrganization />} />
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/developer" element={<AccountDeveloper />} />
              </Route>
              <Route element={<AdminRestricted />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/datasets" element={<AdminDataset />} />
                <Route path="/admin/datasets/:id" element={<AdminDatasetDetails />} />
                <Route path="/admin/categories" element={<AdminCategory />} />
                <Route path="/admin/users" element={<User />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route element={<Paginated />}>
                  <Route path="/admin/developers" element={<AdminDevelopers />} />
                  <Route path="/admin/news" element={<AdminNews />} />
                </Route>
                <Route path="/admin/organizations" element={<AdminOrganization />} />
                <Route path="/admin/organizations/:id" element={<AdminOrganizationDetails />} />
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
