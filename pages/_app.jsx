import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
// import { useEffect } from "react";
// import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const pageNum = Cookies.get("questionsNum");
  //   if (!pageNum) {
  //     Cookies.set("questionsNum", 0);
  //   }
  // }, []);

  return (
    <AuthProvider>
      <div className="bg-black overflow-hidden w-screen min-h-screen">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
