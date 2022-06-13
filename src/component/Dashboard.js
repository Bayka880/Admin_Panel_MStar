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
import { Layout, Menu } from "antd";
import Icons from "../pictures/icons/icons.js";
import { MENU } from "../util/constants";

export default function Dashboard() {
  const { Header, Content, Footer, Sider } = Layout;
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
          <Header className="header" />
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
