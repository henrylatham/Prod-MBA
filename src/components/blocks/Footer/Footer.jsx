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

import './Footer.scss';

class Footer extends Component {
  render() {
    const { title } = this.props;

    const emailTitle = `Check out my product leadership type: ${title}`;
    const shareUrl = window.location.href;
    const quote = `Skill Assessment - ${title}`;
    return (
      <div className="footer">
        <h3>Share your product type with your team:</h3>

        <div className="share">
          <div className="FacebookWrapper share__icons">
            <FacebookShareButton
              url={shareUrl}
              quote={quote}
              className="facebookShare"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <div className="LinkedinWrapper share__icons">
            <LinkedinShareButton url={shareUrl} className="LinkedinShare">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className="WhatsappWrapper share__icons">
            <WhatsappShareButton
              url={shareUrl}
              title={quote}
              separator=":: "
              className="WhatsappShare"
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
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
