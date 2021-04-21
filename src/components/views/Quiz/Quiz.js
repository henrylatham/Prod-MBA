import React, { Component } from 'react';
import { map, findIndex, size, kebabCase, orderBy, get, groupBy } from 'lodash';
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

import { NewQuestionsDataset } from './NewQuestionsDataset';

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
      // New Logic
      currentDatasetIndex: 0,
      newResults: {},
    };
  }

  componentDidMount() {
    Mixpanel.track(`Skills / Home`);

    const isTake = this.props.match.params.take;
    if (isTake) {
      this.scrollIntoView();
      Mixpanel.track(`Skills / Start`);
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

  onSelectAnswer = data => {
    const { currentDatasetIndex, newResults } = this.state;
    const { questionIndex, answerScore, answerIndex, questionType } = data;
    // Events for Mixpanel progress checking...
    const isFirstQuestion = currentDatasetIndex === 0;
    const isThirdQuestion = currentDatasetIndex === 2;
    /**
      ### Data Example ###
      {
        0: {
          questionIndex: 0,
          questionType: 'productStrategy',
          score: 1,
          answerIndex: 3,
        },
        1. {
          questionIndex: 1,
          questionType: 'execution',
          score: 0,
          answerIndex: 2
        }
      }
      */

    this.setState({
      newResults: {
        ...newResults,
        [questionIndex]: {
          questionIndex,
          questionType,
          answerScore,
          answerIndex,
        },
      },
    });

    const isLast = NewQuestionsDataset.length - 1 === currentDatasetIndex;

    if (!isLast) {
      setTimeout(() => {
        this.setState({
          currentDatasetIndex: currentDatasetIndex + 1,
        });
      }, 600);
    }

    if (isFirstQuestion) {
      Mixpanel.track(`Skills / First Question`);
    }
    if (isThirdQuestion) {
      Mixpanel.track(`Skills / Third Question`);
    }
  };

  goToNextQuestion = () => {
    this.setState({
      currentDatasetIndex: this.state.currentDatasetIndex + 1,
    });
  };

  goToPrevQuestion = () => {
    this.setState({
      currentDatasetIndex: this.state.currentDatasetIndex - 1,
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
      Mixpanel.track(`Skills / Next`);
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
  calculateFinalResults = () => {
    const { newResults, isGeneralEnabled } = this.state;
    // @TODO - Henry - here is dummy data for fast testing. Change this to see outcome you want
    // const results = {
    //   customerInsight: 22,
    //   execution: 23,
    //   influencer: 28,
    //   productStrategy: 20,
    // };

    // Transform Results
    let results = {
      customerInsight: 0,
      execution: 0,
      influencer: 0,
      productStrategy: 0,
    };

    // 1. Group By product type
    const groupedResults = groupBy(newResults, function(res) {
      return res.questionType;
    });

    map(groupedResults, (group, key) => {
      let groupScore = results[key];
      map(group, groupAnswer => {
        groupScore = groupScore + groupAnswer.answerScore;
      });
      results = {
        ...results,
        [key]: groupScore,
      };
    });

    let total = 0;
    let highestScore = 0;
    let highestResult = null;
    const sortedArray = map(results, res => res).sort();
    map(results, (result, key) => {
      total += result;

      // Get highest score and map result as key. e.g. productStrategy
      if (result > highestScore) {
        highestScore = result;
        highestResult = key;
      }
    });

    const pastHighScore = sortedArray[sortedArray.length - 2];
    const allRounderDiff = highestScore - pastHighScore < DiffMargin;

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

    console.debug('>>> finalData: ', finalData);

    if (isGeneralEnabled) {
      this.setState({ generalStep: true });
    } else {
      this.submitResults(finalData);
    }
  };

  submitResults = finalData => {
    const { userData } = this.state;
    const uniqParam = window.btoa(
      `${JSON.stringify(finalData)}$-$${JSON.stringify(userData)}$-$1`
    );
    this.props.history.push(`/product-type/${uniqParam}`);
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
      generalStep,
      userData,
      isGeneralEnabled,
      currentDatasetIndex,
      newResults,
    } = this.state;
    const numberOfSections = QuestionsDatasetOrder.length;

    const currentSectionIndex =
      findIndex(QuestionsDatasetOrder, o => o === currentSection) + 1;
    const progress = `${(currentSectionIndex / numberOfSections) * 100}%`;

    // NEW LOGIC
    const newDataset = NewQuestionsDataset;
    const orderedDataset = orderBy(newDataset, ['order'], ['asc']);
    const currentDataset = orderedDataset[currentDatasetIndex];

    const currentDatasetResult = newResults[currentDatasetIndex];
    const currentDatasetAnswerIndex = get(currentDatasetResult, 'answerIndex');
    const isLast = newDataset.length - 1 === currentDatasetIndex;
    const isFirst = currentDatasetIndex === 0;
    const canSubmit = isLast && size(newResults) === newDataset.length;

    return (
      <div className="quizWrapper">
        <Helmet>
          <title>Product Skills Test</title>
          <meta property="og:title" content="Product Skills Test" />
          <meta
            property="og:description"
            content="Try the Prod MBA Product Skills Test for Product Managers or Owners"
          />
          <meta
            property="og:image"
            content="../../../../public/thumbnail.jpg"
          />
          <meta property="og:url" content="../../../../public/thumbnail.jpg" />
          <meta name="twitter:title" content="Product Skills Test" />
          <meta
            name="twitter:description"
            content="Try the Prod MBA Product Skills Test for Product Managers or Owners"
          />
          <meta
            name="twitter:image"
            content="../../../../public/thumbnail.jpg"
          />
          <meta
            name="twitter:card"
            content="../../../../public/thumbnail.jpg"
          />
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
          subtitle="Assess your product skills below to learn how to level-up your product career:"
          onClick={this.scrollIntoView}
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
            {(!generalStep || !isGeneralEnabled) && (
              <div className="question" key={currentDataset.question}>
                <p>{currentDataset.question}</p>
                {map(currentDataset.answers, (answerObj, index) => {
                  return (
                    <div
                      key={index}
                      className="inputGroup"
                      onChange={this.onSelectAnswer.bind(this, {
                        questionIndex: currentDatasetIndex,
                        answerScore: answerObj.points,
                        answerIndex: index,
                        questionType: currentDataset.type,
                      })}
                    >
                      <input
                        key={index}
                        type="radio"
                        id={`option${index}`}
                        name={`option-${currentDataset.order}`}
                        defaultChecked={index === currentDatasetAnswerIndex}
                      />
                      <label htmlFor={`option${index}`}>
                        {answerObj.answer}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            {isLast && canSubmit ? (
              <Button
                label="Finish & View Product Type"
                onClick={this.calculateFinalResults}
              />
            ) : (
              <div className="prvNextActions">
                <Button
                  label="Previous"
                  disabled={isFirst}
                  onClick={this.goToPrevQuestion}
                />
                <Button
                  label="Next"
                  disabled={isLast}
                  onClick={this.goToNextQuestion}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
