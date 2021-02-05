import React, { Component, Fragment } from 'react';
import { includes, camelCase, kebabCase } from 'lodash';
import { Button } from '../../elements';
import { Header, ProductHero, Footer } from '../../blocks';
import { TITLES, TYPEIMAGES } from '../Quiz/Questions';
import { Mixpanel } from '../../../Mixpanel';
import TypesCopy from './TypesCopy';
import TipCopy from './TipCopy';
import influencer from '../../../assets/images/graph_example.png';
import './ProductType.scss';

export default class ProductType extends Component {
  componentDidMount(scoreType) {
    // Mixpanel.track(`Skills / Type / ${TITLES[scoreType]}`);
  }

  takeQuiz = () => {
    return this.props.history.push('/home/take');
  };

  handleGoTo = strategy => {
    this.props.history.push(`/product-type/${kebabCase(strategy)}`);
  };

  render() {
    const { history } = this.props;

    // Get URL params
    const urlParams = this.props.match.params.typeId;
    const knownTypes = [
      'product-strategy',
      'execution',
      'influencer',
      'customer-insight',
      'all-rounder',
      'student',
    ];
    const isKnownDefaultRoute = includes(knownTypes, urlParams);

    let mode = 0;
    let typeResult = 0;
    let scoreType = '';

    const personalPage = urlParams && !isKnownDefaultRoute;

    // Check if rote has user hash or is default product route
    if (personalPage) {
      // User route
      const decodedUrlParams = atob(urlParams);
      const data = decodedUrlParams.split('-');
      // Parse
      const scoreData = JSON.parse(data[0]);
      const userData = JSON.parse(data[1]);
      mode = parseInt(data[2]); // 0 - view, 1 - personal (score) view
      // Isolated data
      const { type, score, overal } = scoreData;
      const { email, location } = userData;
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
                <div className="graph">Graph</div>
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
                    src={influencer}
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
                  <p className="label">{`Tip for "${TITLES[scoreType]}"`}</p>
                  <TipCopy type={scoreType} typeResult={typeResult} />
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer page="PRODUCT_TYPE" />
      </div>
    );
  }
}
