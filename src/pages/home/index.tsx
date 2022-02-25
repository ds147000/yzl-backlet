import type React from 'react';
import logo from '../../assets/img/logo.svg';
import './style.scss';

const Home: React.FC = () => {
  return (
    <div className="page home flex flex-ac flex-jc">
      <img className="logo" alt="logo" src={logo} />
    </div>
  );
};

export default Home;
