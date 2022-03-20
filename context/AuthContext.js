import { useEffect, useState, useContext, createContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const route = useRouter();
  const [questionsNum, setQuestionsNum] = useState(0);

  const getPageFromFS = async () => {
    try {
      if (!loading && user) {
        const AnsDocRef = doc(db, "answers", user.uid);
        const res = await getDoc(AnsDocRef);
        const data = res.data();
        return data?.qNum || 0;
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    (async () => {
      const pageNum = await getPageFromFS();
      setQuestionsNum(pageNum);
    })();
  }, [loading]);

  useEffect(() => {
    Cookies.set("questionsNum", questionsNum);
  }, [questionsNum]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        setIsAuth(false);
        setLoading(false);
        return;
      }
      setUser(user);
      setIsAuth(true);
      setLoading(false);
    });
  }, [setUser]);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setIsAuth(false);
    await route.push("/");
    Cookies.set("questionsNum", 0);
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, setLoading, isAuth, signOutUser, questionsNum, setQuestionsNum }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
