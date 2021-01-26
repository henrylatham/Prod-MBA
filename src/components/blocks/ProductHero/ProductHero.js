// @flow
import React, { Component } from 'react';
import './ProductHero.scss';
// import Influencer from '../../../assets/images/type_influencer.png';
import { TITLES, TYPEIMAGES } from '../../../components/views/Quiz/Questions';

type Props = {
  title: string,
  subtitle: string,
  typeImage: string,
  mode: number,
  scoreType: string,
};

export default class ProductHero extends Component<Props> {
  render() {
    const { title, subtitle, typeImage, viewType, scoreType } = this.props;

    return (
      <div className="productHero">
        <div className="productHero__header">
          <img alt="logo" src={typeImage} className="productHero__logo" />
          {viewType === 1 && <p>{subtitle}</p>}
          <h1>{title}</h1>
        </div>
      </div>
    );
  }
}
