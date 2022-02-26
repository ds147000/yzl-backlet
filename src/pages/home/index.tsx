import React from 'react';
import type { RouteComponentProps } from 'react-router';
import { Button } from 'antd';
import logo from '../../assets/img/logo.svg';
import './style.scss';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const onGo = () => {
    history.push('/quire');
  };

  return (
    <div className="page home flex flex-ac flex-jc flex-col">
      <img className="logo" alt="logo" src={logo} />
      <h1 className="title">hash Block查询器</h1>
      <div className="floor">
        <Button type="primary" size="large" block onClick={onGo}>
          立即查询
        </Button>
      </div>
    </div>
  );
};

export default Home;
