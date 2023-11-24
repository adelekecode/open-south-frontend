import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Protected from "./layouts/protected";
import { fetchUserIfTokenExists } from "./utils/api";
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

async function loader() {
  try {
    await fetchUserIfTokenExists();

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route loader={loader} element={<Protected />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/datasets/new" element={<div>Create new dataset</div>} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token/:uuid" element={<ResetPassword />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<Dataset />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<DashboardLoader />} />;
}

export default App;
