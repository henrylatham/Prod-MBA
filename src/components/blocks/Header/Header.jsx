import React, { Component } from 'react';
import { map, size } from 'lodash';
import { Icon } from '../../elements';
import { TITLES } from '../../views/Quiz/Questions';

import './Header.scss';

export default class Header extends Component {
  onDefaultClick = () => {
    this.props.onDefaultClick();
  };
  onGoTo = strategy => {
    this.props.onGoTo(strategy);
  };

  render() {
    const { showQuiz } = this.props;

    const noOfItems = size(TITLES);
    const position = noOfItems * 40 + noOfItems * 30;

    return (
      <div className="header">
        <div className="menu">
          <div className="tertiary btn personalities">
            Personality Types
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
              Take The test
            </div>
          )}
        </div>
      </div>
    );
  }
}
