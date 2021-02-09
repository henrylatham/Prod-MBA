import React, { Component } from 'react';
import { map, findIndex, size, omit, kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { Header, Hero } from '../../blocks';
import { Button, Input } from '../../elements';
import { Mixpanel } from '../../../Mixpanel';
import './Quiz.scss';
import {
  QuestionsDataset,
  QuestionsDatasetOrder,
  TotalOutcomeLimit,
  DiffMargin,
} from './Questions';

export default class Quiz extends Component<any> {
  constructor() {
    const questionsConstructor = {};
    const resultsConstructor = {};
    map(QuestionsDataset, (val, key) => {
      questionsConstructor[key] = {};
      resultsConstructor[key] = 0;
    });
    super();
    this.quizRef = React.createRef();
    this.state = {
      isGeneralEnabled: false,
      generalStep: false,
      currentSection: QuestionsDatasetOrder[0],
      answers: questionsConstructor,
      results: resultsConstructor,
      userData: {
        email: null,
        location: null,
      },
    };
  }

  componentDidMount() {
    Mixpanel.track(`1.Skills / Home`);

    const isTake = this.props.match.params.take;
    if (isTake) {
      this.scrollIntoView();
      Mixpanel.track(`1.Skills / Take Quiz`);
    }
  }

  onChangeValue = (questionNo, e) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [this.state.currentSection]: {
          ...this.state.answers[this.state.currentSection],
          [`Q-${questionNo}`]: parseInt(e.target.value, 10),
        },
      },
    });
  };

  calculateSectionResults = () => {
    const { answers, currentSection } = this.state;
    let sectionResult = 0;
    map(answers[currentSection], answerPoints => {
      sectionResult += answerPoints;
    });

    const currentSectionIndex =
      findIndex(QuestionsDatasetOrder, o => o === currentSection) + 1;

    let canGoNext = false;
    if (currentSectionIndex < QuestionsDatasetOrder.length) {
      canGoNext = true;
      this.scrollIntoView();
      Mixpanel.track(`1.Skills / Next Section`);
    }

    const results = {
      ...this.state.results,
      [currentSection]: sectionResult,
    };

    this.setState({
      results,
      currentSection: canGoNext
        ? QuestionsDatasetOrder[currentSectionIndex]
        : QuestionsDatasetOrder[currentSectionIndex - 1],
    });

    if (!canGoNext) {
      // It is Final
      const final = this.calculateFinalResults(results);
      this.submitResults(final);
    }
  };

  // @TODO - comment out
  calculateFinalResults = results => {
    // const { results } = this.state;
    // @TODO - Henry - here is dummy data for fast testing. Change this to see outcome you want
    // const results = {
    //   customerInsight: 10,
    //   execution: 10,
    //   influencer: 10,
    //   productStrategy: 30,
    // };

    let total = 0;
    let allRounderDiff = false;
    let highestScore = 0;
    let highestResult = null;
    map(results, (result, key) => {
      total += result;
      // Get highest score and map result as key. e.g. productStrategy
      if (result > highestScore) {
        highestScore = result;
        highestResult = key;
      }

      // compare each with others to get possible "All Rounder"
      const newLoopResults = omit(results, key);
      map(newLoopResults, result2 => {
        if (Math.abs(result - result2) < DiffMargin) {
          allRounderDiff = false;
        }
      });
    });

    const isStrategist =
      total >= TotalOutcomeLimit && highestResult === 'productStrategy'
        ? 'productStrategy'
        : null;
    const isExecutioner =
      total >= TotalOutcomeLimit && highestResult === 'execution'
        ? 'execution'
        : null;
    const isInfluencer =
      total >= TotalOutcomeLimit && highestResult === 'influencer'
        ? 'influencer'
        : null;
    const isVisionary =
      total >= TotalOutcomeLimit && highestResult === 'customerInsight'
        ? 'customerInsight'
        : null;
    const isAllRounder =
      total >= TotalOutcomeLimit && allRounderDiff ? 'allRounder' : null;
    const isStudent = total < TotalOutcomeLimit ? 'student' : null; // Total below 64 or below

    const outcome =
      isAllRounder ||
      isStrategist ||
      isExecutioner ||
      isInfluencer ||
      isVisionary ||
      isStudent;

    const finalData = {
      type: outcome,
      score: total,
      overal: results,
    };

    this.setState({ generalStep: true });
    return finalData;
  };

  submitResults = finalData => {
    const { userData } = this.state;
    const uniqParam = window.btoa(
      `${JSON.stringify(finalData)}$-$${JSON.stringify(userData)}$-$1`
    );
    this.props.history.push(`/product-type/${uniqParam}`);
    this.scrollIntoView();
  };

  onInputChange = (type, e) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [type]: e.target.value,
      },
    });
  };

  scrollIntoView = () => {
    return this.quizRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  handleGoTo = strategy => {
    this.props.history.push(`/product-type/${kebabCase(strategy)}`);
  };

  render() {
    const {
      currentSection,
      answers,
      generalStep,
      userData,
      isGeneralEnabled,
    } = this.state;
    const dataset = QuestionsDataset[currentSection];
    const numberOfSections = QuestionsDatasetOrder.length;

    const currentSectionIndex =
      findIndex(QuestionsDatasetOrder, o => o === currentSection) + 1;
    const progress = `${(currentSectionIndex / numberOfSections) * 100}%`;

    const buttonLabel =
      currentSectionIndex === QuestionsDatasetOrder.length
        ? 'Finish & View Product Type'
        : 'Next Section';
    const isButtonDisabled =
      dataset.questions.length !== size(answers[currentSection]);

    return (
      <div className="quizWrapper">
        <Helmet>
          <title>Product Skills Test</title>
          <meta property="og:title" content="Product Skills Test" />
          <meta
            property="og:description"
            content="Try the Prod MBA Product Skills Test for Product Managers or Owners"
          />
          <meta property="og:image" content="/thumbnail.jpg" />
          <meta property="og:url" content="/thumbnail.jpg" />
          <meta name="twitter:title" content="Product Skills Test" />
          <meta
            name="twitter:description"
            content="Try the Prod MBA Product Skills Test for Product Managers or Owners"
          />
          <meta name="twitter:image" content="/thumbnail.jpg" />
          <meta name="twitter:card" content="/thumbnail.jpg" />
          <meta name="twitter:image:alt" content="What is your product type?" />

          <link rel="apple-touch-icon" href="logo192.png" />
        </Helmet>

        <Header
          light
          onDefaultClick={this.scrollIntoView}
          onGoTo={this.handleGoTo}
          showQuiz
        />
        <Hero
          title="Product Skills Test"
          subtitle="Assess your product skills to learn how to level-up your product career"
        />
        <div className="quizQuestionsWrapper" ref={this.quizRef}>
          <div className="statusBar">
            <div className="progress" style={{ width: progress }} />
          </div>
          <div className="questions" key={`${currentSection}`}>
            {generalStep && isGeneralEnabled && (
              <div>
                <Input
                  className="general"
                  label="Where are you based?"
                  placeholder="e.g. London"
                  value={userData.location}
                  onChange={this.onInputChange.bind(this, 'location')}
                />
                <Input
                  className="general"
                  label="What's the best email address to get in touch with you?"
                  placeholder="e.g. user@company.com"
                  value={userData.email}
                  onChange={this.onInputChange.bind(this, 'email')}
                />
              </div>
            )}
            {(!generalStep || !isGeneralEnabled) &&
              map(dataset.questions, (question, key) => (
                <div
                  className="question"
                  key={`${currentSection}-${key}`}
                  onChange={this.onChangeValue.bind(this, key)}
                >
                  <p>{question}</p>
                  <div className="question_answer">
                    <span>Agree</span>
                    <input
                      /* disabled */ type="radio"
                      value="5"
                      name={`${currentSection}-Q${key + 1}`}
                    />
                    <input
                      type="radio"
                      value="4"
                      name={`${currentSection}-Q${key + 1}`}
                    />
                    <input
                      type="radio"
                      value="3"
                      name={`${currentSection}-Q${key + 1}`}
                    />
                    <input
                      type="radio"
                      value="2"
                      name={`${currentSection}-Q${key + 1}`}
                    />
                    <input
                      type="radio"
                      value="1"
                      name={`${currentSection}-Q${key + 1}`}
                    />
                    <span>Disag.</span>
                  </div>
                </div>
              ))}
            {generalStep && isGeneralEnabled ? (
              <Button
                label="Calculate Results"
                disabled={!userData.location || !userData.email}
                onClick={this.submitResults}
              />
            ) : (
              <Button
                label={buttonLabel}
                disabled={isButtonDisabled}
                onClick={this.calculateSectionResults}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
