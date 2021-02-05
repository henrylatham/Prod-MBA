import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const shareUrl = window.location.href;
    const quote = `Skill Assessment - ${title}`;
    return (
      <div className="footer">

        <div className="FacebookWrapper share">
          <FacebookShareButton
            url={shareUrl}
            quote={quote}
            className="facebookShare"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="LinkedinWrapper share">
          <LinkedinShareButton
            url={shareUrl}
            className="LinkedinShare"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        <div className="WhatsappWrapper share">
          <WhatsappShareButton
            url={shareUrl}
            title={quote}
            separator=":: "
            className="WhatsappShare"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>

        <div className="emailWrapper share">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="emailShare"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    );
  }
}

export default Footer;
