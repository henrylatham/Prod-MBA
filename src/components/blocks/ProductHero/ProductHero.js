// @flow
import React, { Component } from 'react';
import './ProductHero.scss';

type Props = {
  title: string,
  subtitle: string,
  typeImage: string,
  viewType: number,
};

export default class ProductHero extends Component<Props> {
  render() {
    const { title, subtitle, typeImage, viewType } = this.props;

    return (
      <div className="productHero">
        <div className="productHero__header">
          <img alt="logo" src={typeImage} className="productHero__img" />
          {viewType === 1 && <p>{subtitle}</p>}
          <h1>{title}</h1>
        </div>
      </div>
    );
  }
}
