// @flow
import React, { Component } from 'react';

import google from '../../../assets/images/partners/partner_google.svg';
import insta from '../../../assets/images/partners/partner_insta.svg';
import linkedin from '../../../assets/images/partners/partner_linkedin.svg';
import netflix from '../../../assets/images/partners/partner_netflix.svg';
import twitter from '../../../assets/images/partners/partner_twitter.svg';

import './Featured.scss';

type Props = {
  header: string,
};

export default class Featured extends Component<Props> {
  render() {
    const { header } = this.props;

    return (
      <div className="featured">
        <p className="featured__header">{header}</p>
        <div className="featured__logos">
          <img alt="logo" src={google} className="featured__logos_img" />
          <img alt="logo" src={insta} className="featured__logos_img" />
          <img alt="logo" src={linkedin} className="featured__logos_img" />
          <img alt="logo" src={netflix} className="featured__logos_img" />
          <img alt="logo" src={twitter} className="featured__logos_img" />
        </div>
      </div>
    );
  }
}
