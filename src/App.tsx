import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Protected from "./layouts/protected";
import { fetchAccessTokenIfRefreshTokenExists } from "./utils/api";
import { ForgotPassword, Login, ResetPassword, Signup } from "./pages/auth";
import NotFound from "./pages/404";
import ErrorBoundary from "./components/error-boundary";
import DashboardLoader from "./components/loader/dashboard-loader";
import DashboardLayout from "./layouts/dashboard";
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
} from "./pages/account";
import GetDataset from "./layouts/get-dataset";
import News from "./pages/news";
import NewsDetails from "./pages/news-details";
import Partner from "./pages/partner";

async function loader() {
  try {
    await fetchAccessTokenIfRefreshTokenExists();

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
}

async function appLoader() {
  try {
    await fetchAccessTokenIfRefreshTokenExists();

    return null;
  } catch (error) {
    return null;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token/:uuid" element={<ResetPassword />} />
      </Route>
      <Route loader={loader}>
        <Route element={<Protected />}>
          <Route element={<DashboardLayout />}>
            <Route path="/account/dashboard" element={<Dashboard />} />
            <Route path="/account/datasets" element={<AccountDataset />} />
            <Route element={<GetDataset />}>
              <Route path="/account/datasets/:id" element={<AccountDatasetDetails />} />
            </Route>
            <Route path="/account/:slug/dashboard" element={<OrgDashboard />} />
            <Route path="/account/:slug/datasets" element={<OrgDataset />} />
            <Route path="/account/datasets/new" element={<div>Create new dataset</div>} />
          </Route>
        </Route>
      </Route>
      <Route loader={appLoader}>
        <Route element={<GetCurrentUser />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/datasets" element={<Dataset />} />
            <Route path="/datasets/:slug" element={<DatasetDetails />} />
            <Route path="/datasets/:slug/resources/:id" element={<div>File Preview</div>} />
            <Route path="/categories" element={<Category />} />
            <Route path="/organizations" element={<Organization />} />
            <Route path="/organizations/:slug" element={<OrganizationDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetails />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/partners" element={<Partner />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<DashboardLoader />} />;
}

export default App;
