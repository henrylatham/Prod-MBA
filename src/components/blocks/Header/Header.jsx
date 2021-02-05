import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="menu">
          <div className="tertiary btn personalities">
            Product Types
            <Icon
              className="dropdownIcon"
              icon="arrow_drop_down"
              inactive24="inactive24"
              classOverride="icon"
            />
            <div className="menuItems" style={{ bottom: `-${position}px` }}>
              <div className="menu" />
              {map(TITLES, (title, key) => (
                <div className="menuItem" onClick={this.onGoTo.bind(this, key)}>
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
