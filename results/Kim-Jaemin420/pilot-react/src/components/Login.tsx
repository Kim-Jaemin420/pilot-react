import useInputChange from '../hooks/useInputChange';
import { LoginData } from '../FetchData/LoginData';
import { useState } from 'react';
import HttpFetch from '../FetchData/HttpFetch';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CommonBtn from './common/CommonBtn';

const LoginWrapper = styled.form`
  width: 500px;
  height: 500px;
  margin: 200px auto;
  display: flex;
  flex-flow: column wrap;
  text-align: center;
`;


const Login = () => {
  const history = useHistory();

  const [account, accountChange] = useInputChange('');
  const [password, passwordChange] = useInputChange('');
  const [error, setError] = useState('');

  const PostFetch = new HttpFetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, new LoginData(account, password));

  const onClick = async () => {
    console.log('jo');
    const res = await PostFetch.PostFetch();
    if (res.code) setError(res.message);
    else {
      sessionStorage.setItem('token', res.accessToken);
      history.push('/');
    }
  };

  return (
    <LoginWrapper>
      <h1>로그인</h1>
      <Input
        placeholder='Enter your id'
        prefix={<UserOutlined className='site-form-item-icon' />}
        onChange={accountChange}
        style={{marginBottom: 20}}
      />
      <Input.Password
        placeholder='Enter your passwrod'
        prefix={<LockOutlined />}
        onChange={passwordChange}
        onPressEnter={onClick}
      />
      <CommonBtn onClick={onClick}>로그인</CommonBtn>
      <span>{error}</span>
    </LoginWrapper>
  );
};

export default Login;
