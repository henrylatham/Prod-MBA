import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logoWhite.svg';

import './Footer.scss';

class Footer extends Component {
  render() {
    const home = this.props.page === 'HOME' ? 'active' : 'inactive';
    // const about = this.props.page === 'ABOUT' ? 'active' : 'inactive';
    // const courses = this.props.page === 'COURSES' ? 'active' : 'inactive';
    const blog = this.props.page === 'BLOG' ? 'active' : 'inactive';
    // let privacy = this.props.page === 'PRIVACY POLICY' ? 'active' :'inactive'
    const terms =
      this.props.page === 'TERMS & CONDITIONS' ? 'active' : 'inactive';
    return (
      <div className="footer">
        <div className="`footer__list`">
          <div className="footer__list_item">
            <Link to="/home" className={home}>
              Home
            </Link>
          </div>
          <div className="footer__list_item">
            <Link to="/about" className={terms}>
              About
            </Link>
          </div>
          <div className="footer__list_item">
            <a
              className={blog}
              href="https://productmastery.substack.com/"
              onClick={this.goToBlog}
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </div>
          <div className="footer__list_item">
            <Link to="/legal" className={terms}>
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="footer__logo">
          <Link to="/home" className="footer__logo_img">
            <img alt="logo" src={Logo} className="footer__logo_imglogo" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
