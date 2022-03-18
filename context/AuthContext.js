import {useEffect, useState, useContext, createContext} from "react";
import {auth} from "../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useRouter} from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const route = useRouter();
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
    };

    return (
        <AuthContext.Provider value={{user, loading, isAuth, signOutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
