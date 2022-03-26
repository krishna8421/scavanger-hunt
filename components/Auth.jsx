import { BsGoogle } from "react-icons/bs";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function Auth() {
  const router = useRouter();
  const { setLoading } = useAuth();

  const authWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      const uid = data.user.uid;
      if (uid) {
        const AnsDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(AnsDocRef);
        if (!docSnap.exists()) {
          await setDoc(AnsDocRef, {
            name: data.user.displayName,
            email: data.user.email,
            qNum: 0,
            score: 0,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    await router.reload();
  };
  return (
    <>
      <p className="font-Poppins py-2 mb-4 text-lg flex justify-center text-center text-sky-400 w-11/12">
        You can not give up because life is a riddle
      </p>
      <Image
        src={"/msc.png"}
        className="absolute"
        objectFit="cover"
        width={150}
        height={150}
        alt="MSC"
      />
      <p className="font-Poppins py-2 my-4 mt-2 md:text-5xl text-4xl text-center">
        Microsoft Student Community
        <br /> KIIT Chapter
      </p>
      <p className="font-light  text-lg my-2 mb-8 font-Open-Sans text-slate-300">Presents</p>
      <h1 className="text-4xl text-slate-300 font-Righteous md:text-5xl name-style  mb-4 flex justify-center text-center">
        Frontend with Benefits
      </h1>
      <p className="my-2 text-slate-300 font-semibold name-style font-Righteous">x</p>
      <h1 className="text-4xl text-slate-300 md:text-5xl mb-8 name-style font-Righteous">
        Scavenger Hunt
      </h1>
      <div
        onClick={authWithGoogle}
        className="flex p-2 mb-20 cursor-pointer px-6 items-center justify-center border text-lg bg-indigo-600 text-slate-200 border-slate-900 rounded-lg mt-8"
      >
        <BsGoogle />
        <div className="pl-4 font-Poppins">Play Now</div>
      </div>
    </>
  );
}
