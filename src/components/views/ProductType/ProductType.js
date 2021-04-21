import React, { Component, Fragment } from 'react';
import { includes, camelCase, kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { Button, Modal, Chip } from '../../elements';
import { Mixpanel } from '../../../Mixpanel';
import { Header, ProductHero, Footer, RadarChart } from '../../blocks';
import { TITLES, TYPEIMAGES } from '../Quiz/Questions';
import TypesCopy from './TypesCopy';
import TipCopy from './TipCopy';
import ImproveCopy from './ImproveCopy';
import graphExample from '../../../assets/images/graph_example.png';
import modalImg from '../../../assets/images/modal_img.png';
import './ProductType.scss';

const KNOWN_TYPES = [
  'product-strategy',
  'execution',
  'influencer',
  'customer-insight',
  'all-rounder',
  'student',
];

export default class ProductType extends Component<any> {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isEmailSent: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const urlParams = this.props.match.params.typeId;
    const isKnownDefaultRoute = includes(KNOWN_TYPES, urlParams);
    const personalPage = urlParams && !isKnownDefaultRoute;
    if (personalPage) {
      setTimeout(() => this.setState({ isModalOpen: true }), 9000);
    }
  }

  takeQuiz = () => {
    return this.props.history.push('/home/take');
  };

  handleGoTo = strategy => {
    this.props.history.push(`/product-type/${kebabCase(strategy)}`);
  };

  handleAcceptEmailSend = () => {
    this.setState({ isEmailSent: true });
    Mixpanel.track(`Skills / Signup`);
  };

  handleCloseEmailModal = e => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
    Mixpanel.track(`Skills / Close Modal`);
  };

  handleBookCall = () => {
    Mixpanel.track(`Skills / Watch Video`);
  };

  render() {
    const { isModalOpen, isEmailSent } = this.state;

    // const calendlyUrl = 'https://calendly.com/henry_latham/skills-assessment';
    const mvoVideo = 'https://share.vidyard.com/watch/DobRxYeKq2UiHKGsAAEua5?';

    // Get URL params
    const urlParams = this.props.match.params.typeId;
    const isKnownDefaultRoute = includes(KNOWN_TYPES, urlParams);

    let mode = 0;
    let typeResult = 0;
    let scoreType = '';
    let scoreData = [];
    let userData = {};
    const personalPage = urlParams && !isKnownDefaultRoute;
    // Check if rote has user hash or is default product route
    if (personalPage) {
      // User route
      const decodedUrlParams = atob(urlParams);
      const data = decodedUrlParams.split('$-$');
      // Parse
      scoreData = JSON.parse(data[0]);
      userData = JSON.parse(data[1]);
      mode = parseInt(data[2], 10); // 0 - view, 1 - personal (score) view
      // Isolated data
      const { overal } = scoreData;
      scoreType = scoreData.type;
      typeResult = overal ? overal[scoreType] : 0;
      // HENRY - HERE (1) - for URL: "/product-type/dgasuifguaisgfiuasgfiugasiufgsauigf"
      Mixpanel.track(`Skills / Result / ${scoreType}`);
    } else {
      // Default Product Routr
      mode = 0; // viewer mode
      typeResult = 0; // default type e.g instead copy P1 or P2, default is used
      scoreType = camelCase(urlParams); // e.g. allRounder
      // HENRY - HERE (2) - for URL: "/product-type/allRounder"
      Mixpanel.track(`Skills / ${urlParams}`);
    }

    const modalTitle = 'Become A World-Class Product Leader'; // `Want tips for ${TITLES[scoreType]}?`;

    const shareLink = `https://test.prod.mba/product-type/${kebabCase(
      scoreType
    )}`;
    // const shareTitle = `${TITLES[scoreType]} | Product Skills Test`;

    // @TODO - Tomi
    // if (top) {
    //   Mixpanel.track(`Skills / Top`);
    // }
    // if (!top) {
    //   Mixpanel.track(`Skills / Bottom`);
    // }

    return (
      <div>
        <Helmet>
          <title>Product Skills Test</title>
          <meta
            property="og:description"
            content="Try the Prod MBA Product Skills Test for Product Managers or Owners"
          />
          <meta property="og:image" content={TYPEIMAGES[scoreType]} />
          <meta property="og:url" content={shareLink} />
          <meta name="twitter:title" content="Product Skills Test" />
          <meta name="twitter:image" content={TYPEIMAGES[scoreType]} />
          <meta name="twitter:card" content={TYPEIMAGES[scoreType]} />
          <meta name="twitter:image:alt" content="What is your product type?" />
        </Helmet>
        <div className="homePageWrapper">
          <Header
            dark
            onDefaultClick={this.takeQuiz}
            onGoTo={this.handleGoTo}
            showQuiz={!personalPage}
          />
          <ProductHero
            viewType={mode}
            scoreType={scoreType}
            title={TITLES[scoreType]}
            typeImage={TYPEIMAGES[scoreType]}
            subtitle="Your Product Type is:"
            top={false} // @TODO
            score="10%" // @TODO
          />
          <div className="productContent">
            <div className="left">
              <TypesCopy type={scoreType} typeResult={typeResult} />
              <div className="left__cta">
                <h3>How To Improve As {TITLES[scoreType]}</h3>
                <ImproveCopy type={scoreType} typeResult={typeResult} />
                <div>
                  <a href={mvoVideo} target="_blank" rel="noopener noreferrer">
                    <Button
                      type="primary"
                      label="Join Free Workshop"
                      onClick={this.handleBookCall.bind(this)}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <Chip
                top={false} // @TODO
                score="10%" // @TODO
              />
              {mode === 1 || personalPage ? ( // User TIPs
                <Fragment>
                  <RadarChart scoreData={scoreData} />
                  <div className="tipsBlock">
                    <p className="label">{`Tip for "${TITLES[scoreType]}"`}</p>
                    <TipCopy type={scoreType} typeResult={typeResult} />
                  </div>
                </Fragment>
              ) : (
                // Default Route TIP
                <div>
                  <div className="newUser">
                    <img
                      alt="influencer"
                      src={graphExample}
                      className="newUser_img"
                    />
                    <h3 className="newUser_title">New here?</h3>
                    <p>
                      Assess your own product skills & unlock unique tips to
                      improve upon:
                    </p>
                    <Button label="Start Test" onClick={this.takeQuiz} />
                  </div>
                  <div className="tipsBlock">
                    <p className="label">{`Overview of "${TITLES[scoreType]}"`}</p>
                    <TipCopy type={scoreType} typeResult={typeResult} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer
            page="PRODUCT_TYPE"
            title={TITLES[scoreType]}
            type={kebabCase(scoreType)}
          />
          <div className="modalWrapper">
            <Modal
              img={modalImg}
              title={modalTitle}
              description="Join our free 7-day Mini MBA:"
              onAccept={this.handleAcceptEmailSend.bind(this)}
              onClose={this.handleCloseEmailModal.bind(this)}
              // productType={scoreType}
              isOpen={isModalOpen}
              isEmailSent={isEmailSent}
              email={userData.email}
            />
          </div>
        </div>
      </div>
    );
  }
}
