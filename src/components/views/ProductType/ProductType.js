import React, { Component, Fragment } from 'react';
import { includes, camelCase, kebabCase } from 'lodash';
import { Button } from '../../elements';
import { Header, ProductHero, Featured, Footer } from '../../blocks';
import { TITLES, TYPEIMAGES } from '../../views/Quiz/Questions';
import TypesCopy from './TypesCopy';
import './ProductType.scss';

export default class ProductType extends Component {
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
                  <p className="description">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.{' '}
                  </p>
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
        <Footer page="PRODUCT_TYPE" />
      </div>
    );
  }
}
