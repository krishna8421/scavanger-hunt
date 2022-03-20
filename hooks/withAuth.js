import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export function withAuth(Component) {
  return function WithAuth(props) {
    const { isAuth, loading } = useAuth();
    const router = useRouter();
    if (!loading && !isAuth && router.pathname !== "/") {
      typeof window !== "undefined" && router.push("/");
      return;
    }
    return <Component {...props} />;
  };
}
