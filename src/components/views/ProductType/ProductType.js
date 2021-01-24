import React, { Component, Fragment } from 'react';
import { includes } from 'lodash';
import { Button } from '../../elements';
import { Header, ProductHero, Featured, Footer } from '../../blocks';
import { TITLES } from '../../views/Quiz/Questions';
import './ProductType.scss';

export default class ProductType extends Component {
  render() {
    const { history } = this.props;
    console.debug('>>> PROPS: ', this.props);

    const urlParams = this.props.match.params.typeId;
    const knownTypes = ['aa', 'bb', 'cc'];

    const isKnownDefaultRoute = includes(knownTypes, urlParams);

    let mode = 0;
    let scoreType = '';
    if (urlParams && !isKnownDefaultRoute) {
      const decodedUrlParams = atob(urlParams);
      const data = decodedUrlParams.split('-');

      console.debug('>>> TEST: ', {
        urlParams,
        data,
      })

      const scoreData = JSON.parse(data[0]);
      const userData = JSON.parse(data[1]);
      mode = parseInt(data[2]); // 0 - view, 1 - personal (score) view


      const { type, score } = scoreData;
      const { email, location } = userData;

      scoreType = scoreData.type
      console.debug('>>> FINAL: ', {
        type, // ProductType - known route with additional params
        score,
        email,
        location,
        mode,
      });
    } else {
      console.debug('>>> NO PARAMS - isKnownDefaultRoute')
    }

    return (
      <div className="homePageWrapper">
        <Header light />
        <ProductHero
          viewType={mode}
          scoreType={scoreType}
          title={TITLES[scoreType]}
          subtitle="Your Product Type is:"
        />
        <div className="productContent">
          <div className="left">
            <div className="intro">
              <h3>Intro</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="description">
              <h3>Strengths & Weaknesses</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="right">
          {mode === 1 ? (
            <Fragment>
              <div className='graph'>
                Graph
              </div>
              <div className='tipsBlock'>
                <p className='label'>Tip for the strategist</p>
                <p className='description'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
              </div>
            </Fragment>
          ) : (
            <div className='newUser'>
              <h3 className='title'>New here?</h3>
              <Button
                label='Take the test'
                onClick={() => history.push('/home')}
              />
            </div>
          )}

          </div>
        </div>
        <Footer page="PRODUCT_TYPE" />
      </div>
    );
  }
}
