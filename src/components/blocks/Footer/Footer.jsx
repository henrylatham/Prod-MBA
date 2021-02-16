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

import './Footer.scss';

class Footer extends Component {
  render() {
    const { title, type } = this.props;

    const emailTitle = `Check out my product leadership type: ${title}`;
    const shareUrl = `https://test.prod.mba/product-type/${type}`;
    const quote = `I got ${title} as my product leadership style!`;
    return (
      <div className="footer">
        <h3>Share your product type with your team:</h3>

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
    );
  }

  handleClickFB = () => {
    Mixpanel.track(`Skills / Share / FB`);
  };

  handleClickLI = () => {
    Mixpanel.track(`Skills / Share / LI`);
  };

  handleClickWhatsApp = () => {
    Mixpanel.track(`Skills / Share / Whatsapp`);
  };

  handleClickEmailShare = () => {
    Mixpanel.track(`Skills / Share / Email`);
  };
}

export default Footer;
