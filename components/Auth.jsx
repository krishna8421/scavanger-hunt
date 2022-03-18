import {FcGoogle} from "react-icons/fc";
import {signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../firebase";

export default function Auth() {
    const authWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };
    return (<>
        <h1 className="text-4xl font-Gloria mb-12">Scavenger Hunt</h1>
        <div
            onClick={authWithGoogle}
            className="flex p-2 cursor-pointer px-6 items-center justify-center border text-lg bg-gray-100 text-slate-900 border-slate-500 rounded-lg mt-8"
        >
            <FcGoogle/>
            <div className="pl-4">Login with Google</div>
        </div>
    </>);
}
