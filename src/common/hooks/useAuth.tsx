import { auth } from "@/firebase";
import { createContext, useContext, useEffect, useState } from "react";

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpProps extends Credentials {}

export interface LoginProps extends Credentials {}

export const AuthContext = createContext(
  {} as {
    currentUser: IUser | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (credentials: SignUpProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
  }
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user)
        setCurrentUser({
          id: user.uid,
          name: user.displayName!,
          email: user.email!,
        });
      else setCurrentUser(null);

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect;

  const login = async ({ email, password }: LoginProps) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async ({ email, password }: SignUpProps) => {
    await auth.createUserWithEmailAndPassword(email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        currentUser,
        login,
        signUp,
        isLoggedIn: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
