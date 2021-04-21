import React, { Component } from 'react';
import { map, startCase } from 'lodash';
import { Radar } from '@reactchartjs/react-chart.js';

export default class RadarChart extends Component<any> {
  render() {
    const { scoreData } = this.props;

    const labels = [];
    const scores = [];
    map(scoreData.overal, (score, type) => {
      labels.push(startCase(type));
      scores.push(score);
    });

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
    };

    const options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 12,
          stepSize: 7,
          display: false,
        },
        gridLines: { circular: true },
        pointLabels: {
          fontSize: 12,
          fontStyle: 'bold',
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true,
      },
    };

    return <Radar data={data} options={options} />;
  }
}
