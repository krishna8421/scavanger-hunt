import { useAuth } from "../context/AuthContext";
import Auth from "../components/Auth";
import { AiOutlineLogout } from "react-icons/ai";
import Loading from "../components/Loading";
import Questions from "../components/Questions";
import Head from "next/head";

export default function Home() {
  const { loading, isAuth, signOutUser, user, questionsNum } = useAuth();
  if (loading) {
    return <Loading />;
  }
  console.log({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  });
  return (
    <div className="flex  flex-col overflow-y-auto overflow-x-hidden text-slate-200 items-center bg-black w-screen min-h-screen pt-12">
      {isAuth && (
        <AiOutlineLogout
          onClick={signOutUser}
          color="#ff3526"
          size={25}
          className="cursor-pointer absolute top-0 right-0 m-4"
        />
      )}
      <Head>
        <title>Scavenger Hunt</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {user && questionsNum !== 7 ? (
        <p className="mb-6 font-Oxygen text-lg">Hello, {user.displayName}</p>
      ) : (
        ""
      )}
      {isAuth ? <Questions /> : <Auth />}
    </div>
  );
}
