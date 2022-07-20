import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout, Radio } from 'antd';
import { BannerUser } from './components/banner-user';
import { AvatarUser } from './components/avatar-user';

export const SignupView = props => {
  const { manager = false } = props;
  const [userType, setUserType] = useState('cliente');
  const [url, setUrl] = useState();
  const [urlBanner, setUrlBanner] = useState();
  const onFinish = async (values: any) => {
    // console.log('url:',url);
    // console.log('url:',urlBanner);
    values['avatar'] = url;
    values['banner'] = urlBanner;
    if (!values.hasOwnProperty('userType')) values['userType'] = userType;
    console.log('Success:', values);

    let resp = await fetch('http://localhost:3012/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (resp.ok) {
      window.location.href;
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const selectUserType = () => {
    return (
      <Form.Item label="tipo de Usuario" name="userType">
        <Radio.Group>
          <Radio.Button value="cliente">Cliente</Radio.Button>
          <Radio.Button value="creador">Creador</Radio.Button>
        </Radio.Group>
      </Form.Item>
    );
  };

  return (
    <Layout style={{ margin: 0, marginTop: 64, paddingTop: 64 }}>
      <div className="form-signup">
        <BannerUser setUrlBanner={setUrlBanner} />
        <AvatarUser setUrl={setUrl} />
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="name"
            className="inputSignup"
            rules={[{ required: true, message: 'Please input your nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[
              { required: true, message: 'Please input your Description' },
            ]}
          >
            <Input />
          </Form.Item>
          {manager && selectUserType()}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type="primary"
              className="form-signup-btn"
              htmlType="submit"
              block
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
