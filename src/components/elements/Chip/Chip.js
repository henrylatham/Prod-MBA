// @flow
import React, { Component } from 'react';

import { Icon } from '../';

import './Chip.scss';

// render with <Button secondary/tertiary /> for different style classes
// btnContainer used in instances where necessary e.g. ConfirmationModal

type Props = {
  score: string,
  top?: boolean,
};

export default class Chip extends Component<Props> {
  render() {
    const { top, score } = this.props;

    return (
      <div>
        {top && (
          <div>
            <p className="chip chip__top">
              <Icon
                className="chip__icon"
                icon="trending_up"
                inactive24="inactive16"
                classOverride="icon"
              />
              You are in the top {score}!
            </p>
          </div>
        )}
        {!top && (
          <div>
            <p className="chip chip__bottom">
              <Icon
                className="chip__icon"
                icon="trending_down"
                inactive24="inactive16"
                classOverride="icon"
              />
              You are in the bottom {score}...
            </p>
          </div>
        )}
      </div>
    );
  }
}
