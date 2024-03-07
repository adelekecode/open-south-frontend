import { GoogleOAuthProvider } from "@react-oauth/google";
import { VITE_PUBLIC_GOOGLE_CLIENT_ID } from "~/app-constants";

export function GoogleProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={VITE_PUBLIC_GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>
  );
}
