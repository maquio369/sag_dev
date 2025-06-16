import { createContext, use, useState } from "react";

interface UserCtxType {
  user: string;
  setuser: (user: string) => void;
}

export const UserCtx = createContext<UserCtxType>({
  user: "",
  setuser: () => {},
});

export function UserCtxProvider({ children }: { children: React.ReactNode }) {
  const [user, setuser] = useState("JC");
  
  return (
    <UserCtx.Provider value={{ user, setuser }}>{children}</UserCtx.Provider>
  );
}

export const useUser = () => {
  return use(UserCtx);
};
