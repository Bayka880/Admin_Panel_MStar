import React from "react";
import { Drawer } from "antd";
import { useState } from "react";
import { useOrder } from "../contexts/OrderContext";

export default function Offcanvas(props) {
  const [order, setOrder] = useOrder();

  return (
    <>
      <div>
        <div>Дэлгэрэнгүй </div>
        <div className="order-offcanvas">
          <div>Захиалга</div>
          <hr />
          <div>
            <div>
              {order
                .filter((order) => order._id == props.orderId)
                .map((orderDetail) => {
                  return <div>{orderDetail.total_price}</div>;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
