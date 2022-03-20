import { useAuth } from "../context/AuthContext";
import Auth from "../components/Auth";
import { AiOutlineLogout } from "react-icons/ai";
import Loading from "../components/Loading";
import Questions from "../components/Questions";
import Image from "next/image";

export default function Home() {
  const { loading, isAuth, signOutUser } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div

      className="flex  flex-col overflow-y-auto overflow-x-hidden text-slate-200 items-center bg-black w-screen min-h-screen pt-32">
      <div
        className="absolute top-0 w-full h-16 shadow-2xl shadow-slate-900 border-b-2 border-indigo-500 flex justify-between px-4 items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={"/msc.png"}
            className="absolute"
            objectFit="cover"
            width={40}
            height={40}
            alt="MSC"
          />
          <h2 className="font-Poppins text-slate-100 ">MSC</h2>
        </div>
        {isAuth && (
          <AiOutlineLogout
            onClick={signOutUser}
            color="#ff3526"
            size={25}
            className="cursor-pointer"
          />
        )}
      </div>
      {isAuth ? <Questions /> : <Auth />}
    </div>
  );
}
