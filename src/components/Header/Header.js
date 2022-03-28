import React from 'react';
import {NavLink} from "react-router-dom";
import {useAuth, logout} from "../../firebase";
import {LogoutOutlined} from "@ant-design/icons";
import './style.css';

const Header = () => {
  const currentUser = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='header'>
      <div className="headerContainer container">
        <div className="logoContainer">
          <img src={require('../../assets/firebase-1-logo.png')} alt="" className='logo'/>
          <p>Firebase Auth</p>
        </div>
        {currentUser && <div className="links">
          <NavLink to='/home' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Home
          </NavLink>
          <span style={{color: 'white'}}>/</span>
          <NavLink to='/chat' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Chat
          </NavLink>
          <span style={{color: 'white'}}>/</span>
          <NavLink to='/products' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Products
          </NavLink>
          <span style={{color: 'white'}}>/</span>
          <NavLink to='/todolist' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Todo list
          </NavLink>
          <span style={{color: 'white'}}>/</span>
          <NavLink to='/countries' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Countries
          </NavLink>
          <span style={{color: 'white'}}>/</span>
          <NavLink to='/profile' className={({isActive}) => isActive ? "linkActive" : "link"}>
            Profile
          </NavLink>
        </div>}
        {currentUser ? <LogoutOutlined onClick={handleLogout} style={{color: 'white', cursor: 'pointer'}}/> : null}
      </div>
    </div>
  );
};

export default Header;
