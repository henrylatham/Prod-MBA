import React, { Component } from 'react';
import { find, map, findIndex, size, omit } from 'lodash';
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
    console.debug('>> questionsConstructor: ', questionsConstructor);
    console.debug('>> resultsConstructor: ', resultsConstructor);
    super();
    this.state = {
      testStep: true,
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

  onChangeValue = (questionNo, e) => {
    console.debug('>>> questionNo: ', questionNo);
    console.debug('>>> VAL: ', e.target.value);
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
      console.debug('>>> answerPoints: ', answerPoints);
      sectionResult = sectionResult + answerPoints;
    })

    console.debug('>>> sectionResult: ', sectionResult);

    const currentSectionIndex = findIndex(QuestionsDatasetOrder, (o) => o == currentSection) + 1;

    console.debug('>>> currentSectionIndex: ', currentSectionIndex);
    let canGoNext = false;
    if (currentSectionIndex < QuestionsDatasetOrder.length) {
      console.debug('>>> canGoNext');
      canGoNext = true;
    }

    const results = {
      ...this.state.results,
      [currentSection]: sectionResult,
    };
    console.debug('>>> results: ', results);
    console.debug('>>> NEXT section: ', currentSectionIndex, currentSectionIndex + 1, canGoNext);


    console.debug('>>> NN: ', QuestionsDatasetOrder[currentSectionIndex], QuestionsDatasetOrder[currentSectionIndex + 1]);

    this.setState({
      results,
      currentSection: canGoNext ? (QuestionsDatasetOrder[currentSectionIndex]) : QuestionsDatasetOrder[currentSectionIndex - 1],
    });

    console.debug('>>> NEW STATE: ', this.state)

    if (!canGoNext) {
      console.debug('>>> FINAL CALC')
      // It is Final
      this.calculateFinalResults(results);
    }
  };

  // @TODO - comment out
  // calculateFinalResults = (results) => {
  calculateFinalResults = () => {
    const results = {
      customerInsight: 10,
      execution: 20,
      influencer: 40,
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
      console.debug('>>> RR: ', key, newLoopResults);
      map(newLoopResults, result2 => {
        if (Math.abs(result - result2) < DiffMargin) {
          console.debug('>>> SET all rounder: ', result, result2, result - result2, Math.abs(result - result2));
          allRounderDiff = true;
        }
      })
    });

    console.debug('>>> RESULTS: ', {
      total,
      highestScore,
      highestResult,
      allRounderDiff,
      state: this.state,
    })

    const isStrategist = (total >= TotalOutcomeLimit) && (highestResult === 'productStrategy') ? 'strategist' : null;
    const isExecutioner = (total >= TotalOutcomeLimit) && (highestResult === 'execution') ? 'executioner' : null
    const isInfluencer = (total >= TotalOutcomeLimit) && (highestResult === 'influencer') ? 'influencer' : null
    const isVisionary = (total >= TotalOutcomeLimit) && (highestResult === 'customerInsight') ? 'visionary' : null
    const isAllRounder = (total >= TotalOutcomeLimit) && allRounderDiff ? 'allRounder' : null;
    const isStudent = total < TotalOutcomeLimit ? 'student' : null; // Total below 64 or below

    console.debug('>>> TYPE: ', {
      isStrategist,
      isExecutioner,
      isInfluencer,
      isVisionary,
      isAllRounder,
      isStudent,
    })

    const outcome = isAllRounder || isStrategist || isExecutioner || isInfluencer || isVisionary || isStudent;
    console.debug('>>> outcome: ', outcome);

    const finalData = {
      type: outcome,
      score: total,
    };

    this.setState({ finalData });
    return finalData;
  };

  submitResults = () => {
    const { userData } = this.state;
    const finalData = this.calculateFinalResults();
    // score: 100
    // type: influencer
    console.debug('>>> finalData: ', finalData);
    console.debug('>>> userData: ', userData);
    const uniqParam = window.btoa(`${JSON.stringify(finalData)}-${JSON.stringify(userData)}-1`);
    console.debug('>>> uniqParam: ', uniqParam);
    this.props.history.push(`/product-type/${uniqParam}`)
  };

  onInputChange = (type, e) => {
    console.debug('>>> CHANGE: ', {type, e})
    this.setState({
      userData: {
        ...this.state.userData,
        [type]: e.target.value,
      },
    });
  }

  render() {
    const { currentSection, answers, testStep, userData } = this.state;
    const dataset = QuestionsDataset[currentSection];
    console.debug('>>> dataset: ', {dataset, currentSection});
    const numberOfSections = QuestionsDatasetOrder.length;

    const currentSectionIndex = findIndex(QuestionsDatasetOrder, (o) => o === currentSection) + 1;
    console.debug('>>> currentSectionIndex: ', currentSectionIndex);
    const progress = `${(currentSectionIndex / numberOfSections) * 100}%`;

    console.debug('>>> Progress: ', progress);

    console.debug('>>> ANS: ', this.state.answers, this.state.results);

    const buttonLabel = currentSectionIndex === QuestionsDatasetOrder.length ? 'Finish Quiz' : 'Next';

    console.debug('>>> AA 1: ', dataset.questions.length);
    console.debug('>>> AA 2: ', size(answers[currentSection]));
    const isButtonDisabled = dataset.questions.length !== size(answers[currentSection]);

    return (
      <div className='quizWrapper'>
        <Header light />
        <Hero
          title='Product Skills Test'
          subtitle='Assess your product skills to learn how to level-up your product career'
        />
        <div className='quizQuestionsWrapper'>
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
