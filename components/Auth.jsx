import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

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
        const AnsDocRef = doc(db, "answers", uid);
        const docSnap = await getDoc(AnsDocRef);
        if (!docSnap.exists()) {
          await setDoc(AnsDocRef, {
            name: data.user.displayName,
            email: data.user.email,
            qNum: 0,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
    await router.reload();
  };
  return (
    <>
      <h1 className="text-4xl font-Gloria mb-12">Scavenger Hunt</h1>
      <div
        onClick={authWithGoogle}
        className="flex p-2 cursor-pointer px-6 items-center justify-center border text-lg bg-gray-100 text-slate-900 border-slate-500 rounded-lg mt-8"
      >
        <FcGoogle />
        <div className="pl-4">Login with Google</div>
      </div>
    </>
  );
}
