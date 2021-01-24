// @flow
import React, { Component } from 'react';
import './ProductHero.scss';
import Saly from '../../../assets/images/Saly-15.png';
import { TITLES } from '../../../components/views/Quiz/Questions';

type Props = {
  title: string,
  subtitle: string,
  mode: number,
  scoreType: string,
};

export default class ProductHero extends Component<Props> {
  render() {
    const {
      title,
      subtitle,
      viewType,
      scoreType,
    } = this.props;

    console.debug('>>> yo: ', scoreType)
    console.debug('>>> TTT: ', TITLES[scoreType])

    console.debug('>>> viewType: ', viewType)

    return (
      <div className="productHero">
        <div className="productHero__header">
          <img alt="logo" src={Saly} className="productHero__logo" />
          {viewType === 1 && <p>{subtitle}</p>}
          <h1>{title}</h1>
        </div>
      </div>
    );
  }
}
