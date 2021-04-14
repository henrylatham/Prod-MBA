// @flow
import React, { Component } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

import { Mixpanel } from '../../../Mixpanel';

import './ProductHero.scss';

type Props = {
  title: string,
  type: Object,
  subtitle: string,
  typeImage: string,
  viewType: number,
};

export default class ProductHero extends Component<Props> {
  render() {
    const { title, type, subtitle, typeImage, viewType } = this.props;

    const emailTitle = `Check out my product leadership type: ${title}`;
    const shareUrl = `https://test.prod.mba/product-type/${type}`;
    const quote = `I got ${title} as my product leadership style!`;

    return (
      <div className="productHero">
        <div className="productHero__header">
          <img alt="logo" src={typeImage} className="productHero__img" />
          {viewType === 1 && <p className="productHero__caption">{subtitle}</p>}
          <h1>{title}</h1>
          <p className="productHero__top10">You are in the top 10%</p>
          <div className="social">
            <p>Share with your network:</p>
            <div className="share">
              <div className="FacebookWrapper share__icons">
                <FacebookShareButton
                  url={shareUrl}
                  quote={quote}
                  className="facebookShare"
                  onClick={this.handleClickFB}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>

              <div className="LinkedinWrapper share__icons">
                <LinkedinShareButton
                  url={shareUrl}
                  className="LinkedinShare"
                  onClick={this.handleClickLI}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>

              <div className="WhatsappWrapper share__icons">
                <WhatsappShareButton
                  url={shareUrl}
                  title={quote}
                  separator=":: "
                  className="WhatsappShare"
                  onClick={this.handleClickWhatsApp}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="emailWrapper share__icons">
                <EmailShareButton
                  url={shareUrl}
                  subject={emailTitle}
                  body="I just completed the Prod MBA Product Skills Assessment. Check out my product type: "
                  className="emailShare"
                  onClick={this.handleClickEmailShare}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClickFB = () => {
    Mixpanel.track(`Skills / HeroShare / FB`);
  };

  handleClickLI = () => {
    Mixpanel.track(`Skills / HeroShare / LI`);
  };

  handleClickWhatsApp = () => {
    Mixpanel.track(`Skills / HeroShare / Whatsapp`);
  };

  handleClickEmailShare = () => {
    Mixpanel.track(`Skills / HeroShare / Email`);
  };
}
