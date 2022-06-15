import React from "react";
import { Form, Input, Button } from "antd";
import "../style/login.css";
import { userService } from "../services/userService";
import { useUser } from "../contexts/UserContext";
export default function Login() {
  const [user, setUser] = useUser();
  const onFinish = (values) => {
    console.log(values);
    userService
      .loginUser(values)
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser({
            userName: res.data.name,
            email: res.data.email,
            address: res.data.address,
            id: res.data.id,
          });
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-left-section"></div>
      <div className="login-right">
        <div className="form-section">
          <Form
            className="loginForm"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="name-and-logo">
              <div>
                <img src="./pictures/logo.svg" alt="" />
              </div>
              <div className="company-name">MStart Food Delivery</div>
            </div>
            <Form.Item
              label="Имэйл"
              name="email"
              className="username-input"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="И-мэйл хаягаа оруулна уу." id="input-field" />
            </Form.Item>

            <Form.Item
              label="Нууц үг"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Нууц үгээ оруулна уу."
                id="pass-section"
                style={{
                  width: "200px",
                  boxShadow: " 0px 0px 6.31443px rgba(0, 0, 0, 0.05)",
                  borderRadius: "25.2577px",
                  marginTop: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 16,
                span: 20,
              }}
            >
              <Button className="forget-pass">Нууц үг мартсан?</Button>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="log-in-button">
                Нэвтрэх
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
