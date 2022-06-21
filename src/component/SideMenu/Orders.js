import React, { useEffect } from "react";
import { otherServices } from "../../services/otherServices";
import { useOrder } from "../../contexts/OrderContext";
import {
  List,
  Row,
  Col,
  Divider,
  Pagination,
  Dropdown,
  Menu,
  Space,
  Button,
  Drawer,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import "../../style/menuStyle/orders.css";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import { Select, Checkbox } from "antd";
import { useState } from "react";
import Offcanvas from "../Offcanvas";
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

export default function Orders() {
  const [order, setOrder] = useOrder();
  const [user, setUser] = useUser();
  const [filterOrder, setFilterOrder] = useState();
  const [pagenumber, setPageNumber] = useState(1);
  const [orderId, setOrderId] = useState();
  const [visible, setVisible] = useState(false);
  const plainOptions = [];
  // console.log("usestat garj bga", filterOrder);
  const getAllOrders = async (orders) => {
    return await fetch(
      `https://dev-api.mstars.mn/api/orders?page=${pagenumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      }
    );
  };
  useEffect(() => {
    getAllOrders({ token: user.token })
      .then((res) => res.json())
      .then((res) => setOrder(res.data.docs));
  }, [pagenumber]);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <>
              <button className="button-more" onClick={showDrawer}>
                Харах
              </button>
              <Drawer
                title="#001"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <Offcanvas orderId={orderId} />
              </Drawer>
            </>
          ),
          key: "0",
        },
        {
          label: (
            <button
              className="button-delete"
              onClick={(e) => {
                console.log(e);
              }}
            >
              Устгах
            </button>
          ),
          key: "1",
        },
      ]}
    />
  );

  const onChangeSelected = (value) => {
    console.log(value);
    setOrder(order.filter((status) => status.status === value));
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  function pagechange(e) {
    setPageNumber(e);
  }
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  let selectedOption = [];

  function onSelectedValue(e) {
    console.log(e.target.checked);
    let arr = [];
    if (e.target.checked == true) {
      arr = "ture";
    }
    arr = selectedOption;
  }
  function orderRemove(e) {
    setOrderId(e);
  }
  console.log(order);
  return (
    <div>
      <div>
        <Select defaultValue="Бүгд" onChange={(e) => onChangeSelected(e)}>
          <Option value="waiting">Хүлээн авсан</Option>
          <Option value="success">Амжилттай</Option>
          <Option value="canceled">Цуцлагдсан</Option>
        </Select>
      </div>
      <Divider orientation="left">Захиалгууд</Divider>
      <List
        className="header-section"
        header={
          <div className="order-header">
            <span>
              <span>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                ></Checkbox>
              </span>
              Он сар өдөр
            </span>
            <span>Захиалга #</span>
            <span>Хэрэглэгч</span>
            <span>Захиалга</span>
            <span>Нийт дүн</span>
            <span>Төлбөр</span>
            <span>Утас</span>
            <span>Төлөв</span>
            <span>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={orderRemove}>
                  <Space>
                    <img src="../pictures/3dot.svg" alt="" />
                  </Space>
                </a>
              </Dropdown>
            </span>
          </div>
        }
        // footer={<div>Footer</div>}
        bordered
        dataSource={order}
        renderItem={(item) => {
          return (
            <>
              <List.Item className="listItems">
                <Row
                  className="rowss"
                  style={{
                    width: "100%",
                  }}
                >
                  <Col span={3}>
                    <Checkbox onClick={onSelectedValue}></Checkbox>
                    <CheckboxGroup
                      options={selectedOption}
                      value={checkedList}
                      onChange={onChange}
                    />

                    {moment(item.created_date).format("YYYY/MM/DD h:mm")}
                  </Col>
                  <Col span={2}>001</Col>
                  <Col span={2}>{item.user_id.slice(20)}</Col>
                  <Col span={2}>{item.orderDetails}</Col>
                  <Col span={2}>{`${item.total_price}₮`}</Col>
                  <Col span={2}>
                    {item.payment_type === "CARD" ? "Картаар" : "Бэлнээр"}
                  </Col>
                  <Col span={2}>{item.phone}</Col>
                  <Col span={2}>
                    <select
                      className="selecting-field"
                      defaultValue={
                        item.status === "waiting"
                          ? "Хүлээн авсан"
                          : "Амжилттай" || item.status === ""
                          ? "Цуцлагдсан"
                          : ""
                      }
                      onChange={onChange}
                    >
                      <option
                        value={item.status === "waiting" ? "Хүлээн авсан" : ""}
                      >
                        Хүлээн авсан
                      </option>
                      <option value={item.status === "success" && "Амжилттай"}>
                        Амжилттай
                      </option>
                      <option value={item.status === "1" && "Цуцлагдсан"}>
                        Цуцлагдсан
                      </option>
                    </select>
                  </Col>
                  <Col>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a onClick={() => orderRemove(item._id)}>
                        <Space>
                          <img src="../pictures/3dot.svg" alt="" />
                        </Space>
                      </a>
                    </Dropdown>
                  </Col>
                </Row>
              </List.Item>
            </>
          );
        }}
      />
      <Pagination
        className="pagiantion"
        defaultCurrent={1}
        total={50}
        onChange={pagechange}
      />
    </div>
  );
}
