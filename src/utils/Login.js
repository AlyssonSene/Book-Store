import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const Login = async (userData) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  return userCredential.user;
};
