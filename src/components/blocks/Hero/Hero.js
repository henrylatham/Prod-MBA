// @flow
import React, { Component } from 'react';
import './Hero.scss';
import influencer from '../../../assets/images/hero/type_influencer.png';
import strategist from '../../../assets/images/hero/type_strategist.png';
import allRounder from '../../../assets/images/hero/type_all_rounder.png';

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
          <div className="hero__featuredBlocks_container">
            <img
              alt="influencer"
              src={influencer}
              className="hero__featuredBlocks_img"
            />
            <h5>Complete the test</h5>
            <p>Answer honestly to get an accurate assessment</p>
          </div>
          <div className="hero__featuredBlocks_container">
            <img
              alt="influencer"
              src={allRounder}
              className="hero__featuredBlocks_img"
            />
            <h5>View Results</h5>
            <p>Learn your product type, as well as strengths & weaknesses</p>
          </div>
          <div className="hero__featuredBlocks_container">
            <img
              alt="influencer"
              src={strategist}
              className="hero__featuredBlocks_img"
            />
            <h5>Unlock Your Potential</h5>
            <p>
              Grow into the product leader you want to be with our career tips
            </p>
          </div>
        </div>
      </div>
    );
  }
}
