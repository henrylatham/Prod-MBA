// @TODO - Henry to Define Quiestions and Questions sections

export const NewQuestionsDataset = [
  {
    question: 'Which of the following is not a revenue model:',
    order: 1, // You can change question appeareance by changing order number
    type: 'productStrategy', // One of productStrategy, execution, influencer, customerInsight
    answers: [
      // You can put as much you want. Just one or 999 answers. Pay attention that all fields are populated ( answer and points )
      {
        answer: 'Affiliate model',
        points: 1,
      },
      {
        answer: 'Cast and return model',
        points: 0,
      },
      {
        answer: 'Leasing model',
        points: 0,
      },
      {
        answer: 'Substantive model',
        points: 5,
      },
    ],
  },
];
