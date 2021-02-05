import React, { Component } from 'react';
import { find, map, findIndex, size, omit, kebabCase } from 'lodash';
import { Header, Hero, Featured, Footer } from '../../blocks';
import { Button, Input } from '../../elements';
import './Quiz.scss';
import { QuestionsDataset, QuestionsDatasetOrder, TotalOutcomeLimit, DiffMargin } from './Questions';


export default class Quiz extends Component {
  constructor() {
    const questionsConstructor = {};
    const resultsConstructor = {};
    map(QuestionsDataset, (val, key) => {
      questionsConstructor[key] = {};
      resultsConstructor[key] = 0;
    });
    super();
    this.quizRef = React.createRef()
    this.state = {
      // @TODO - Henry - change this state (true / false) for fast (quiz / general) questions switching
      //               - Now is set to general questions - enter email and location to see dummy data output (Comment added above dummy data so you can change params)
      testStep: true,
      // End TODO
      currentSection: QuestionsDatasetOrder[0],
      answers: questionsConstructor,
      results: resultsConstructor,
      finalData: {},
      userData: {
        email: null,
        location: null,
      },
    };
  }

  componentDidMount() {
    const isTake = this.props.match.params.take;
    if (isTake) {
      this.scrollIntoView();
    }
  }

  onChangeValue = (questionNo, e) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [this.state.currentSection]: {
          ...this.state.answers[this.state.currentSection],
          [`Q-${questionNo}`]: parseInt(e.target.value),
        }
      }
    });
  };

  calculateSectionResults = () => {
    const { answers, currentSection } = this.state;
    let sectionResult = 0;
    map(answers[currentSection], (answerPoints) => {
      sectionResult = sectionResult + answerPoints;
    })

    const currentSectionIndex = findIndex(QuestionsDatasetOrder, (o) => o == currentSection) + 1;

    let canGoNext = false;
    if (currentSectionIndex < QuestionsDatasetOrder.length) {
      canGoNext = true;
    }

    const results = {
      ...this.state.results,
      [currentSection]: sectionResult,
    };

    this.setState({
      results,
      currentSection: canGoNext ? (QuestionsDatasetOrder[currentSectionIndex]) : QuestionsDatasetOrder[currentSectionIndex - 1],
    });

    if (!canGoNext) {
      // It is Final
      this.calculateFinalResults(results);
    }
  };

  // @TODO - comment out
  // calculateFinalResults = (results) => {
  calculateFinalResults = () => {
    // @TODO - Henry - here is dummy data for fast testing. Change this to see outcome you want
    const results = {
      customerInsight: 10,
      execution: 20,
      influencer: 35,
      productStrategy: 30,
    }

    let total = 0;
    let allRounderDiff = false;
    let highestScore = 0;
    let highestResult = null;
    map(results, (result, key) => {
      total = total + result;
      // Get highest score and map result as key. e.g. productStrategy
      if (result > highestScore) {
        highestScore = result;
        highestResult = key;
      }

      // compare each with others to get possible "All Rounder"
      const newLoopResults = omit(results, key);
      map(newLoopResults, result2 => {
        if (Math.abs(result - result2) < DiffMargin) {
          allRounderDiff = true;
        }
      })
    });

    const isStrategist = (total >= TotalOutcomeLimit) && (highestResult === 'productStrategy') ? 'productStrategy' : null;
    const isExecutioner = (total >= TotalOutcomeLimit) && (highestResult === 'execution') ? 'execution' : null
    const isInfluencer = (total >= TotalOutcomeLimit) && (highestResult === 'influencer') ? 'influencer' : null
    const isVisionary = (total >= TotalOutcomeLimit) && (highestResult === 'customerInsight') ? 'customerInsight' : null
    const isAllRounder = (total >= TotalOutcomeLimit) && allRounderDiff ? 'allRounder' : null;
    const isStudent = total < TotalOutcomeLimit ? 'student' : null; // Total below 64 or below

    const outcome = isAllRounder || isStrategist || isExecutioner || isInfluencer || isVisionary || isStudent;

    const finalData = {
      type: outcome,
      score: total,
      overal: results,
    };

    this.setState({ finalData });
    return finalData;
  };

  submitResults = () => {
    const { userData } = this.state;
    const finalData = this.calculateFinalResults();
    const uniqParam = window.btoa(`${JSON.stringify(finalData)}-${JSON.stringify(userData)}-1`);
    this.props.history.push(`/product-type/${uniqParam}`)
  };

  onInputChange = (type, e) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [type]: e.target.value,
      },
    });
  }

  scrollIntoView = () => {
    return this.quizRef.current.scrollIntoView({ behavior: "smooth" })
  }

  handleGoTo = (strategy) => {
    this.props.history.push(`/product-type/${kebabCase(strategy)}`);
  }

  render() {
    const { currentSection, answers, testStep, userData } = this.state;
    const dataset = QuestionsDataset[currentSection];
    const numberOfSections = QuestionsDatasetOrder.length;

    const currentSectionIndex = findIndex(QuestionsDatasetOrder, (o) => o === currentSection) + 1;
    const progress = `${(currentSectionIndex / numberOfSections) * 100}%`;

    const buttonLabel = currentSectionIndex === QuestionsDatasetOrder.length ? 'Finish Quiz' : 'Next';
    const isButtonDisabled = dataset.questions.length !== size(answers[currentSection]);

    return (
      <div className='quizWrapper'>
        <Header
          light
          onDefaultClick={this.scrollIntoView}
          onGoTo={this.handleGoTo}
          showQuiz
        />
        <Hero
          title='Product Skills Test'
          subtitle='Assess your product skills to learn how to level-up your product career'
        />
        <div className='quizQuestionsWrapper' ref={this.quizRef}>
          <div className='statusBar'>
            <div className='progress' style={{ width: progress }} />
          </div>
          <div className='questions' key={`${currentSection}`}>
            {testStep && (
              <div>
                <p>test step</p>
                <Input
                  className='general'
                  label='Where are you based?'
                  placeholder='e.g. London'
                  value={userData.location}
                  onChange={this.onInputChange.bind(this, 'location')}
                />
                <Input
                  className='general'
                  label="What's the best email address to get in touch with you?"
                  placeholder='e.g. user@company.com'
                  value={userData.email}
                  onChange={this.onInputChange.bind(this, 'email')}
                />
              </div>
            )}
            {!testStep && map(dataset.questions, (question, key) => (
              <div className='question' key={`${currentSection}-${key}`} onChange={this.onChangeValue.bind(this, key)}>
              <p>{question}</p>
              <span>Agree</span>
              <input /* disabled */ type="radio" value="1" name={`${currentSection}-Q${key + 1}`} />
              <input type="radio" value="2" name={`${currentSection}-Q${key + 1}`} />
              <input type="radio" value="3" name={`${currentSection}-Q${key + 1}`} />
              <input type="radio" value="4" name={`${currentSection}-Q${key + 1}`} />
              <input type="radio" value="5" name={`${currentSection}-Q${key + 1}`} />
              <span>Disagree</span>
              </div>
            ))}
            {testStep ? (
              <Button
                label='Finish'
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
