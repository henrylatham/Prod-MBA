import React, { Component } from 'react';
import { map, size } from 'lodash';
import { Icon } from '../../elements';
import { TITLES } from '../../views/Quiz/Questions';
import LogoLight from '../../../assets/images/logoWhite.svg';
import LogoDark from '../../../assets/images/logoDark.svg';

import './Header.scss';

export default class Header extends Component {
  onDefaultClick = () => {
    this.props.onDefaultClick();
  };
  onGoTo = strategy => {
    this.props.onGoTo(strategy);
  };

  render() {
    const { light, dark, showQuiz } = this.props;

    const noOfItems = size(TITLES);
    const position = noOfItems * 40 + noOfItems * 30;

    return (
      <div className="header">
        {light && (
          <a href="https://prod.mba">
            <img alt="logo" src={LogoLight} className="header__logo" />
          </a>
        )}
        {dark && (
          <a href="https://prod.mba">
            <img alt="logo" src={LogoDark} className="header__logo" />
          </a>
        )}
        <div className="menu">
          <div className="tertiary btn personalities">
            Product Types
            <Icon
              key="icon"
              className="dropdownIcon"
              icon="arrow_drop_down"
              inactive24="inactive24"
              classOverride="icon"
            />
            <div
              key="menuItems"
              className="menuItems"
              style={{ bottom: `-${position}px` }}
            >
              <div key="menu" className="menu" />
              {map(TITLES, (title, key) => (
                <div
                  key={key}
                  className="menuItem"
                  onClick={this.onGoTo.bind(this, key)}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
          {showQuiz && (
            <div
              className="primary btn test"
              onClick={this.onDefaultClick.bind(this)}
            >
              Start Test
            </div>
          )}
        </div>
      </div>
    );
  }
}
