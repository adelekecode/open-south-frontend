import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "~/utils/api/logout";

export default function SideBar() {
  return (
    <>
      side-bar
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Button startIcon={<LogoutOutlined />} onClick={logout}>
        Log out
      </Button>
    </>
  );
}
