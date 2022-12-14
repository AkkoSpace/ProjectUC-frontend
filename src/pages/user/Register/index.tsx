import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {Divider, message, Space, Tabs, Tooltip} from 'antd';
import React, {useState} from 'react';
import {history, Link} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Footer from "@/components/Footer";
import {register} from "@/services/ant-design-pro/api";

const Register: React.FC = () => {
    const [type, setType] = useState<string>('account');

    const handleSubmit = async (values: API.RegisterParams) => {
      const {userPassword, checkPassword} = values;
      if (userPassword !== checkPassword) {
        message.error('两次密码不一致');
        return;
      }
      try {
        // 注册
        const id = await register(values);
        if (id) {
          const defaultLoginSuccessMessage = '注册成功！';
          message.success(defaultLoginSuccessMessage);
          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!history) return;
          const {query} = history.location;
          history.push({
            pathname: '/user/login',
            query,
          });
          return;
        }
      } catch (error: any) {
        const defaultLoginFailureMessage = '注册失败，请重试！';
        message.error(defaultLoginFailureMessage);
      }
    };
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <LoginForm
            submitter={{
              searchConfig: {
                submitText: '注册'
              }
            }}
            logo={<img alt="logo" src={SYSTEM_LOGO}/>}
            title="Akko Center"
            subTitle={'元宇宙的起点'}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.RegisterParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="account" tab={'注册账号'}/>
            </Tabs>

            {type === 'account' && (
              <>
                <ProFormText
                  name="userAccount"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请输入账号'}
                  rules={[
                    {
                      required: true,
                      message: '账号是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="userPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: '密码长度不能小于8位！',
                    }
                  ]}
                />
                <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请再次输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '确认密码是必填项！',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: '密码长度不能小于8位！',
                    }
                  ]}
                />
                <ProFormText
                  name="lazyKey"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'请输入专属密钥'}
                  rules={[
                    {
                      required: true,
                      message: '专属密钥是必填项！',
                    },
                  ]}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Space split={<Divider type={"vertical"}/>}>
                <Link to="/user/login">已有账号, 去登录</Link>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  <Tooltip placement="right" title="请联系管理员">
                    <span>忘记密码 ?</span>
                  </Tooltip>
                </a>
              </Space>
            </div>
          </LoginForm>
        </div>
        <Footer/>
      </div>
    );
  }
;
export default Register;
