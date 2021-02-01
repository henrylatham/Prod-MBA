import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map, size } from 'lodash';
import { Button } from '../../elements';
import { TITLES } from '../../views/Quiz/Questions';
import LogoLight from '../../../assets/images/logoWhite.svg';
import LogoDark from '../../../assets/images/logoDark.svg';

import './Header.scss';

export default class Header extends Component {
  onDefaultClick = () => {
    this.props.onDefaultClick();
  };
  onGoTo = (strategy) => {
    this.props.onGoTo(strategy);
  };

  render() {
    const { light, dark, showQuiz } = this.props;

    const noOfItems = size(TITLES);
    const position = (noOfItems * 40) + (noOfItems * 30);

    return (
      <div className="header">
        <div className="menu">
          <div className='secondary btn personalities'>
            Personality Types
            <div className='menuItems' style={{ bottom: `-${position}px`}}>
              <div className='break' />
              {map(TITLES, (title, key) => (
                <div
                  className='menuItem'
                  onClick={this.onGoTo.bind(this, key)}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
          {showQuiz &&
            <div className='primary btn' onClick={this.onDefaultClick.bind(this)}>
              Take The test
            </div>
          }
        </div>
      </div>
    );
  }
}
