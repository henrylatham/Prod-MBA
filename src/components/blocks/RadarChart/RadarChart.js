import React, { Component } from 'react';
import { map, startCase } from 'lodash';
import { Radar } from '@reactchartjs/react-chart.js';

// const data = {
//   labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [2, 9, 3, 5, 2, 3],
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// }

export default class RadarChart extends Component<any> {
  render() {
    const { scoreData } = this.props;

    const labels = [];
    const scores = [];
    const scoreParams = map(scoreData.overal, (score, type) => {
      labels.push(startCase(type));
      scores.push(score);
    })

    // console.debug('>>> Score Data: ', {scoreData,labels,data});

    const data = {
      labels,
      datasets: [
        {
          label: 'Score',
          data: scores,
          backgroundColor: 'rgba(247, 199, 67, 0.5)',
          borderColor: 'transparent',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(247, 199, 67, 1)',
          borderWidth: 1,
        },
      ],
    }

    const options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 35,
          stepSize: 7,
          display: false
        },
        gridLines: { circular: true },
        pointLabels: {
          fontSize: 12,
          fontStyle: 'bold',
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      }
    }


    return (
      <Radar data={data} options={options} />
    );
  }
}