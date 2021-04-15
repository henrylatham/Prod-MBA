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

import { Chip, Button } from '../../elements';
import { Mixpanel } from '../../../Mixpanel';

import './ProductHero.scss';

type Props = {
  title: string,
  type: Object,
  subtitle: string,
  typeImage: string,
  viewType: number,
  score: string,
  top?: boolean,
};

export default class ProductHero extends Component<Props> {
  render() {
    const {
      title,
      type,
      subtitle,
      typeImage,
      viewType,
      top,
      score,
    } = this.props;

    const emailTitle = `What's your product type? Mine's ${title}`;
    const shareUrl = `https://test.prod.mba/product-type/${type}`;
    const quote = `I got ${title} as my product leadership style. What's yours?`;

    return (
      <div className="productHero">
        <div className="productHero__header">
          <img alt="logo" src={typeImage} className="productHero__img" />
          {viewType === 1 && <p className="productHero__caption">{subtitle}</p>}
          <h1>{title}</h1>
          <Chip top={top} score={score} />
          {top && (
            <div className="social">
              <p>Compare with your team & network:</p>
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
          )}
          {!top && (
            <div className="productHero__bottom">
              <p>
                You could be enjoying more autonomy, more purpose & earning
                £27,500 more per year with better product skills.
              </p>
              <br />
              <p>
                Act now to fast-track your path to Head of Product with a free
                Career Strategy Session:
              </p>
              <Button
                label="Book Free Session"
                onClick={this.handleBookStrategySession}
              />
            </div>
          )}
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

  handleBookStrategySession = () => {
    Mixpanel.track(`Skills / Bottom / Book Strategy Session`);
    console.log(`Skills / Bottom / Book Strategy Session`);
    window.open('https://calendly.com/henry_latham/prod-mba');
  };
}
