import React, { Component, lazy } from "react";
import { Menu, Input, Carousel } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "./menuList";
import top_back3 from "./img/banner1.png";
import top_back4 from "./img/banner3.png";
import "antd/dist/antd.css";
import "./index.css";
import logo from "./img/logo.png";
import axios from "axios";

class Head extends React.Component {
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    console.log(path);
    return menuList.map((item) => {
      console.log(path, item.key);
      const menu = (
        <Menu.Item
          key={item.key}
          className="home-menu-item"
          onClick={() => {
            this.props.history.push(item.key);
          }}
        >
          <span>{item.title}</span>
        </Menu.Item>
      );
      return menu;
    });
  };

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <div>
        <header className="home-header">
          <div className="home-top">
            <img src={logo} alt="" className="home-logo" />
            <p className="home-name">重庆长实钢结构有限公司</p>
            <span className="home-search">团结，务实，高效，奋进</span>
          </div>
          <Menu className="home-menu" SelectedKeys={[path]} theme="light">
            {this.menuNodes}
          </Menu>
          <Carousel autoplay={true} className="top_back4">
            <div>
              <img src={top_back4} alt="" className="imgs" />
            </div>
            <div>
              <img src={top_back3} alt="" className="imgs" />
            </div>
          </Carousel>
        </header>
      </div>
    );
  }
}

export default withRouter(Head);
