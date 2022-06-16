import { createContext, useState, useContext, useEffect } from "react";

export const OrderContext = createContext({});

export function useOrder() {
  return useContext(OrderContext);
}

export const OrderProvider = (props) => {
  const [order, setOrder] = useState();

  // useEffect(() => {
  //   if (localStorage.getItem("order")) {
  //     setOrder(JSON.parse(localStorage.getItem("order") || "[]"));
  //   }
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("order")) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {props.children}
    </OrderContext.Provider>
  );
};
