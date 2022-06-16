import React, { useEffect } from "react";
import { otherServices } from "../../services/otherServices";
import { useOrder } from "../../contexts/OrderContext";
import { List, Row, Col, Divider } from "antd";
import "../../style/menuStyle/orders.css";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useState } from "react";
const { Option } = Select;

export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();
  const [filterOrder, setFilterOrder] = useState();
  console.log("usestat garj bga", filterOrder);
  useEffect(() => {
    otherServices
      .getAllOrders({ token: user.token })
      .then((res) => res.json())
      .then((res) => setOrder(res.data));
  }, [user]);
  useEffect(() => {}, []);
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setFilterOrder(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div>
      <div>
        <Select
          showSearch
          optionFilterProp="children"
          defaultValue="Бүгд"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          <Option value="Хүлээн авсан">Хүлээн авсан</Option>
          <Option value="Амжилттай">Амжилттай</Option>
          <Option value="Цуцлагдсан">Цуцлагдсан</Option>
        </Select>
      </div>
      <Divider orientation="left">Захиалгууд</Divider>
      <List
        header={
          <div className="header">
            <span>Он сар өдөр</span>
            <span>Захиалга #</span>
            <span>Хэрэглэгч</span>
            <span>Захиалга</span>
            <span>Нийт дүн</span>
            <span>Төлбөр</span>
            <span>Утас</span>
            <span>Төлөв</span>
          </div>
        }
        footer={<div>Footer</div>}
        bordered
        dataSource={order}
        renderItem={(item) => {
          return (
            <>
              <List.Item className="listItems">
                <Row
                  className="rowss"
                  style={{
                    width: "1400px",
                  }}
                >
                  <Col span={3}>
                    {moment(item.created_date).format("YYYY/MM/DD h:mm")}
                  </Col>
                  <Col span={2}>{item.number}</Col>
                  <Col span={4}>{item.user_id.slice(20)}</Col>
                  <Col span={2}>{item.orderDetails}</Col>
                  <Col span={4}>{`${item.total_price}₮`}</Col>
                  <Col span={2}>
                    {item.payment_type === "CARD" ? "Картаар" : "Бэлнээр"}
                  </Col>
                  <Col span={4}>{item.phone}</Col>
                  <Col span={2}>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      defaultValue={
                        item.status === "waiting"
                          ? "Хүлээн авсан"
                          : "Амжилттай" || item.status === ""
                          ? "Цуцлагдсан"
                          : ""
                      }
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      <Option value="Хүлээн авсан">
                        {item.status === "waiting" ? "Хүлээн авсан" : ""}
                      </Option>
                      <Option value="Амжилттай">
                        {item.status === "success" && "Амжилттай"}
                      </Option>
                      <Option value="Цуцлагдсан">
                        {item.status === "" && "Цуцлагдсан"}
                      </Option>
                    </Select>
                  </Col>
                </Row>
              </List.Item>
            </>
          );
        }}
      />
    </div>
  );
}
