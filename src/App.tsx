import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Protected from "./layouts/protected";
import { fetchUserIfTokenExists } from "./utils/api";
import { Login, Signup } from "./pages/auth";
import NotFound from "./pages/404";
import ErrorBoundary from "./components/error-boundary";
import DashboardLoader from "./components/loader/dashboard-loader";
import DashboardLayout from "./layouts/protected/dashboard";
import Auth from "./layouts/auth";

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
          <Route path="/" element={<DashboardLoader />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<DashboardLoader />} />;
}

export default App;
