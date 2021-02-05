import React, { Component, Fragment } from 'react';
import { includes, camelCase, kebabCase } from 'lodash';
import { Button, Modal } from '../../elements';
import { Mixpanel } from '../../../Mixpanel';
import { Header, ProductHero, Footer, RadarChart } from '../../blocks';
import { TITLES, TYPEIMAGES } from '../../views/Quiz/Questions';
import TypesCopy from './TypesCopy';
import TipCopy from './TipCopy';
import './ProductType.scss';

const KNOWN_TYPES = [
  'product-strategy',
  'execution',
  'influencer',
  'customer-insight',
  'all-rounder',
  'student',
];

export default class ProductType extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
  }

  componentDidMount() {
    const urlParams = this.props.match.params.typeId;
    const isKnownDefaultRoute = includes(KNOWN_TYPES, urlParams);
    const personalPage = urlParams && !isKnownDefaultRoute;
    if (personalPage) {
      setTimeout(() => this.setState({ isModalOpen: true }), 4000);
    }

    Mixpanel.track(`Test / ${urlParams} / ${this.state.isModalOpen}`);
  }

  takeQuiz = () => {
    return this.props.history.push('/home/take');
  };

  handleGoTo = strategy => {
    this.props.history.push(`/product-type/${kebabCase(strategy)}`);
  };

  handleAcceptEmailSend = () => {
    this.setState({ isModalOpen: false });
  };

  handleDeclineEmailSend = e => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;

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
      mode = parseInt(data[2]); // 0 - view, 1 - personal (score) view
      // Isolated data
      const { overal } = scoreData;
      scoreType = scoreData.type;
      typeResult = overal ? overal[scoreType] : 0;
    } else {
      // Default Product Routr
      mode = 0; // viewer mode
      typeResult = 0; // default type e.g instead copy P1 or P2, default is used
      scoreType = camelCase(urlParams); // e.g. allRounder
    }

    return (
      <div className="homePageWrapper">
        <Header
          light
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
        />
        <div className="productContent">
          <div className="left">
            <TypesCopy type={scoreType} typeResult={typeResult} />
          </div>
          <div className="right">
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
              <div className="newUser">
                <h3 className="title">New here?</h3>
                <Button label="Take the test" onClick={this.takeQuiz} />
              </div>
            )}
          </div>
        </div>
        <Footer page="PRODUCT_TYPE" title={scoreType} />
        <div className="modalWrapper">
          <Modal
            title="Copy of your results?"
            description="Would you like a copy of your results emailed to you?"
            onAccept={this.handleAcceptEmailSend.bind(this)}
            onDecline={this.handleDeclineEmailSend.bind(this)}
            productType={scoreType}
            isOpen={isModalOpen}
            email={userData.email}
          />
        </div>
      </div>
    );
  }
}
