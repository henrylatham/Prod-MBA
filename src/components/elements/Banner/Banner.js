// @flow
import React, { Component } from 'react';
import { Mixpanel } from '../../../Mixpanel';
import { Button } from '..';

import './Banner.scss';

type Props = {
  onClick: Function,
  children: string,
};

export default class Banner extends Component<Props> {
  render() {
    const { onClick } = this.props;

    return (
      <div onClick={onClick} className="banner">
        <div className="banner__inner">
          <p>Start fast-tracking your product career with our free Mini MBA:</p>
          <Button
            type="secondary"
            label="Sign Up"
            onClick={this.handleMiniMbaSignUp}
          />
        </div>
      </div>
    );
  }

  handleMiniMbaSignUp = () => {
    Mixpanel.track(`Skills / Quiz / Mini MBA`);
    window.open('https://productmastery.activehosted.com/f/1');
  };
}
