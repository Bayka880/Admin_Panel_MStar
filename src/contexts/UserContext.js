import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext({});

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      setUser({
        userName: data.name,
        email: data.email,
        address: data.address,
        id: data._id,
        token: data.token,
      });
    }
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [user]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
