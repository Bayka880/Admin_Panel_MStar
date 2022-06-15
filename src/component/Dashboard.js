import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import ControlPanel from "./SideMenu/ControlPanel";
import Orders from "./SideMenu/Orders";
import Invoices from "./SideMenu/Invoices";
import FoodMenu from "./SideMenu/FoodMenu";
import Users from "./SideMenu/Users";
import Deliverymen from "./SideMenu/Deliverymen";
import "antd/dist/antd.css";
import "../style/main.css";
import { Layout, Menu, Dropdown, Space, Button, Drawer } from "antd";
import Icons from "../pictures/icons/icons.js";
import { MENU } from "../util/constants";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  const { Header, Content, Footer, Sider } = Layout;
  const [user, setUser] = useUser();
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
                <form>
                  <label htmlFor="email">И-мэйл хаяг</label>
                  <div>
                    <input type="text" />
                  </div>
                  <label htmlFor="email">Нууц үг </label>
                  <div>
                    <input type="text" />
                  </div>
                  <label htmlFor="email">Нууц үг</label>
                  <div>
                    <input type="text" />
                  </div>
                  <button>Хадгалах</button>
                </form>
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

          <Content style={{ margin: "0 16px" }}>
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

              bottom: 0,
              float: "right",
            }}
          >
            <span className="fooder">
              Andy Design ©2022 Created by Andy's Code
            </span>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
