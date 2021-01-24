import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoLight from '../../../assets/images/logoWhite.svg';
import LogoDark from '../../../assets/images/logoDark.svg';

import './Header.scss';

export default class Header extends Component {
  render() {
    const { light, dark } = this.props;

    return (
      <div className="header">
        {light && (
          <Link to="/home">
            <img alt="logo" src={LogoLight} className="header__logo" />
          </Link>
        )}
        {dark && (
          <Link to="/home">
            <img alt="logo" src={LogoDark} className="header__logo" />
          </Link>
        )}
      </div>
    );
  }
}
