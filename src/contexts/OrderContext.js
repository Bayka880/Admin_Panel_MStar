import { createContext, useState, useContext } from "react";

export const OrderContext = createContext({});

export function useOrder() {
  return useContext(OrderContext);
}

export const OrderProvider = (props) => {
  const [order, setOrder] = useState();
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {props.children}
    </OrderContext.Provider>
  );
};
