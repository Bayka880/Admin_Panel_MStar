import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ControlPanel from "./SideMenu/ControlPanel";
import Orders from "./SideMenu/Orders";
import Invoices from "./SideMenu/Invoices";
import FoodMenu from "./SideMenu/FoodMenu";
import Users from "./SideMenu/Users";
import Deliverymen from "./SideMenu/Deliverymen";
import "antd/dist/antd.css";
import "../style/main.css";
import {
  Layout,
  Menu,
  Dropdown,
  Space,
  Drawer,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import Icons from "../pictures/icons/icons.js";
import { MENU } from "../util/constants";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { userService } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOrder } from "../contexts/OrderContext";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Dashboard() {
  const { Header, Content, Footer, Sider } = Layout;
  const [user, setUser] = useUser();

  console.log(user);
  function hanler() {
    localStorage.removeItem("userInfo");
    setUser(null);
  }
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    userService
      .editUserInfo({
        email: user.email,
        name: values.username,
        password: values.confirm,
        phone: values.phone,
        token: user.token,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          onClose(setVisible(false));
          toast("Хэрэглэгчийн мэдээлэл амжилттай хадгалагдлаа");
        }
      });
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <>
              <button onClick={showDrawer} className="admin-button">
                Тохиргоо
              </button>
              <Drawer
                title="Тохиргоо"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <Form
                  {...formItemLayout}
                  form={form}
                  name="saveuser"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <Form.Item
                    name="username"
                    label="username"
                    rules={[
                      {
                        type: "name",
                        message: "Хэрэглэгчийн нэрээ оруулна уу!!",
                      },
                      {
                        required: true,
                        message: "Хэрэглэгчийн нэрээ оруулна уу !!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Утас"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <Input></Input>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Хадгалах
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </>
          ),
          key: "0",
        },
        {
          label: (
            <button onClick={hanler} className="log-out-button">
              Гарах
            </button>
          ),
          key: "1",
        },
      ]}
    />
  );
  return (
    <>
      <Layout style={{ margin: "0" }}>
        <Sider theme="light" className="sider">
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="10"
              icon={<img src={Icons.logo} />}
              style={{ margin: "0 0" }}
            >
              <div className="logo-name">
                <p>Food Delivery</p>
              </div>
            </Menu.Item>
            {MENU.map((e) => {
              return (
                <Menu.Item
                  key={e.id}
                  icon={<img src={Icons[e.page]} />}
                  style={{ margin: "26px 0" }}
                >
                  <span>{e.name}</span>
                  <Link to={`/${e.page}`} />
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout className="contentLay">
          <Header className="header">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  style={{
                    color: "#F17228",
                  }}
                >
                  <img src="./pictures/admin.svg" alt="" />
                  <div className="admin">Админ</div>
                </Space>
              </a>
            </Dropdown>
          </Header>

          <Content
            style={{
              marginLeft: "150px",
              minHeight: "100vh",
              minWidth: "90vh",
              marginRight: "150px",
            }}
          >
            <Routes
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<ControlPanel />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/foods" element={<FoodMenu />} />
              <Route path="/users" element={<Users />} />
              <Route path="/deliveryman" element={<Deliverymen />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "right",
              marginTop: "auto",

              float: "right",
            }}
          >
            <span className="fooder">
              Andy Design ©2022 Created by Andy's Code
            </span>
          </Footer>
        </Layout>
      </Layout>
      <ToastContainer />
    </>
  );
}
