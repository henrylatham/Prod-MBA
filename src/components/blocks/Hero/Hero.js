// @flow
import React, { Component } from 'react';
import './Hero.scss';

type Props = {
  title: string,
  subtitle: string,
};

export default class Hero extends Component<Props> {
  render() {
    const { title, subtitle } = this.props;

    return (
      <div className="hero">
        <div className="hero__header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="hero__featuredBlocks">
          <div className="hero__featuredBlocks_block">One</div>
          <div className="hero__featuredBlocks_block">Two</div>
          <div className="hero__featuredBlocks_block">Three</div>
        </div>
      </div>
    );
  }
}
