// @flow
import React, { Component } from 'react';
import './Card.scss';

type Props = {
  onClick: Function,
  children: string,
  cardActive?: boolean,
  cardModal?: boolean,
  cardDisabled?: boolean,
};

export default class Card extends Component<Props> {
  render() {
    const {
      onClick,
      children,
      cardActive,
      cardModal,
      cardDisabled,
    } = this.props;
    const cardType = cardActive || cardModal || cardDisabled || 'cardDefault';

    return (
      <div onClick={onClick} className="card" role="presentation">
        <div className={cardType}>{children}</div>
      </div>
    );
  }
}
