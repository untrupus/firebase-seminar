import {initializeApp} from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
} from "firebase/auth";
import {getStorage} from 'firebase/storage';
import {useEffect, useState} from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDzaZv0wt9QHjU_a21RQdNCOhlPFBVZfkw",
  authDomain: "fir-auth-62f13.firebaseapp.com",
  projectId: "fir-auth-62f13",
  storageBucket: "fir-auth-62f13.appspot.com",
  messagingSenderId: "395005275744",
  appId: "1:395005275744:web:7e59a351a27020406add05"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);

export function logout() {
  return signOut(auth);
}

export const signUp = async (email, password) => {
  // создание юзера
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // отправка проверочного письма
  await sendEmailVerification(userCredential.user);
  // логаут чтобы избежать рекурсии
  await logout();
}


export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// кастомный хук для получения данных о залогиненном ползователе
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
     onAuthStateChanged(auth, user => setCurrentUser(user));
  }, [])

  return currentUser;
}

