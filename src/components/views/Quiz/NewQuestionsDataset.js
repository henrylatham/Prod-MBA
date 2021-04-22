export const NewQuestionsDataset = [
  //
  // True or False Questions
  // Type options: productStrategy, execution, influencer, customerInsight
  {
    question:
      'Before working on any solution, I should have a clear product vision defined.',
    order: 1,
    type: 'productStrategy',
    answers: [
      {
        answer: 'True',
        points: 2,
      },
      {
        answer: 'False',
        points: 0,
      },
    ],
  },
  {
    question:
      'I must have a business plan in place before I start validating my niche.',
    order: 2,
    type: 'productStrategy',
    answers: [
      {
        answer: 'True',
        points: 0,
      },
      {
        answer: 'False',
        points: 2,
      },
    ],
  },
  {
    question:
      'If I need to pivot a product idea early on, I did not carry out the correct research.',
    order: 3,
    type: 'customerInsight',
    answers: [
      {
        answer: 'True',
        points: 0,
      },
      {
        answer: 'False',
        points: 2,
      },
    ],
  },
  {
    question:
      'A great product should be driven by one unique customer insight.',
    order: 4,
    type: 'customerInsight',
    answers: [
      {
        answer: 'True',
        points: 2,
      },
      {
        answer: 'False',
        points: 0,
      },
    ],
  },
  {
    question:
      'Managing my ability to stay objective & resilient when assessing an opportunity is as important as using the most up-to-date frameworks & processes.',
    order: 5,
    type: 'influencer',
    answers: [
      {
        answer: 'True',
        points: 2,
      },
      {
        answer: 'False',
        points: 0,
      },
    ],
  },
  {
    question:
      'It is possible to objectively determine when to pivot or persist.',
    order: 6,
    type: 'influencer',
    answers: [
      {
        answer: 'True',
        points: 0,
      },
      {
        answer: 'False',
        points: 2,
      },
    ],
  },
  {
    question:
      'My team should never build something unless they are clear on what they expect the outcome to be.',
    order: 7,
    type: 'execution',
    answers: [
      {
        answer: 'True',
        points: 2,
      },
      {
        answer: 'False',
        points: 0,
      },
    ],
  },
  {
    question:
      'Building features quickly is more important than taking time to work out what the "right" feature to build might be.',
    order: 8,
    type: 'execution',
    answers: [
      {
        answer: 'True',
        points: 0,
      },
      {
        answer: 'False',
        points: 2,
      },
    ],
  },

  // Longer form questions
  // Types: productStrategy, execution, influencer, customerInsight
  //

  {
    question: 'Which of the following is not a revenue model:',
    order: 9, // You can change question appeareance by changing order number
    type: 'productStrategy', // One of productStrategy, execution, influencer, customerInsight
    answers: [
      // You can put as much you want. Just one or 999 answers. Pay attention that all fields are populated ( answer and points )
      {
        answer: 'Affiliate Model',
        points: 0,
      },
      {
        answer: 'Cast and Return Model',
        points: 2,
      },
      {
        answer: 'Leasing model',
        points: 0,
      },
      {
        answer: 'Substantive model',
        points: 0,
      },
    ],
  },
  {
    question: 'Which of the following is not a business model:',
    order: 10,
    type: 'productStrategy',
    answers: [
      {
        answer: 'Franchise Model',
        points: 0,
      },
      {
        answer: 'Brokerage Model',
        points: 0,
      },
      {
        answer: 'Leasing Model',
        points: 0,
      },
      {
        answer: 'Substantive Model',
        points: 2,
      },
    ],
  },
  {
    question: 'Which statement best describes what a product strategy is?',
    order: 11,
    type: 'productStrategy',
    answers: [
      {
        answer: 'A good plan',
        points: 0,
      },
      {
        answer: 'A framework for helping you make decisions',
        points: 2,
      },
      {
        answer: 'A detailed roadmap & well-defined backlog',
        points: 0,
      },
    ],
  },
  {
    question: 'Which is a good example of a product strategy?',
    order: 12,
    type: 'productStrategy',
    answers: [
      {
        answer: 'Internet access for the whole world',
        points: 0,
      },
      {
        answer: 'End child poverty',
        points: 0,
      },
      {
        answer: 'Build a lightning-fast email service',
        points: 2,
      },
    ],
  },
  {
    question: 'People I have managed would say I inspire them:',
    order: 13,
    type: 'influencer',
    answers: [
      {
        answer: 'Strongly disagree',
        points: 0,
      },
      {
        answer: 'Disagree',
        points: 0,
      },
      {
        answer: 'Unsure',
        points: 0,
      },
      {
        answer: 'Agree',
        points: 1,
      },
      {
        answer: 'Strongly agree',
        points: 2,
      },
    ],
  },
  {
    question:
      'Which of the following is NOT an important consideration when motivating a team?',
    order: 14,
    type: 'influencer',
    answers: [
      {
        answer: 'How you can make them work harder',
        points: 2,
      },
      {
        answer: 'What their individual goals are',
        points: 0,
      },
      {
        answer: 'Creating open lines of communication',
        points: 0,
      },
      {
        answer: 'Their learning styles',
        points: 0,
      },
    ],
  },
  {
    question:
      'What is the best way to navigate a difficult stakeholder when prioritising work?',
    order: 15,
    type: 'influencer',
    answers: [
      {
        answer: 'Exert your authority as the final decision maker',
        points: 0,
      },
      {
        answer:
          'Identify their motivation and help them understand your process & decisions',
        points: 2,
      },
      {
        answer:
          'Squeeze their work in when the developers have time between tasks',
        points: 0,
      },
      {
        answer: 'Do what they want if they are more senior',
        points: 0,
      },
    ],
  },
  {
    question:
      'What is the best way to navigate a difficult stakeholder when prioritising work?',
    order: 16,
    type: 'influencer',
    answers: [
      {
        answer: 'Exert your authority as the final decision maker',
        points: 0,
      },
      {
        answer:
          'Identify their motivation and help them understand your process & decisions',
        points: 2,
      },
      {
        answer:
          'Squeeze their work in when the developers have time between tasks',
        points: 0,
      },
      {
        answer: 'Do what they want if they are more senior',
        points: 0,
      },
    ],
  },
  {
    question:
      'I know how to launch a new product or feature for maximum success:',
    order: 17,
    type: 'execution',
    answers: [
      {
        answer: 'Strongly disagree',
        points: 0,
      },
      {
        answer: 'Disagree',
        points: 0,
      },
      {
        answer: 'Unsure',
        points: 0,
      },
      {
        answer: 'Agree',
        points: 1,
      },
      {
        answer: 'Strongly agree',
        points: 2,
      },
    ],
  },
  {
    question: 'When launching a new product, what would you do first?',
    order: 18,
    type: 'execution',
    answers: [
      {
        answer: 'Fundraise for the project (e.g. investors or kickstarter)',
        points: 0,
      },
      {
        answer: 'Create a landing page to gather emails',
        points: 0,
      },
      {
        answer:
          'Speak to people in my network that are within the target niche',
        points: 2,
      },
      {
        answer: 'Build a prototype ',
        points: 0,
      },
    ],
  },
  {
    question:
      'How would you determine whether a feature was successful or not?',
    order: 19,
    type: 'execution',
    answers: [
      {
        answer: 'Rapid delivery according to preagreed specifications',
        points: 0,
      },
      {
        answer: 'Ability of the user to complete the user story',
        points: 0,
      },
      {
        answer: 'Delivery of expected customer & business value',
        points: 2,
      },
    ],
  },
  {
    question:
      'When launching a feature, what is the most important final step?',
    order: 20,
    type: 'execution',
    answers: [
      {
        answer: 'Celebrate with the team to keep them motivated',
        points: 0,
      },
      {
        answer: 'Ensure we can measure the expected outcome for that feature',
        points: 2,
      },
      {
        answer: 'Forget about it & move on to the next feature',
        points: 0,
      },
    ],
  },
  {
    question: 'I know what my customers want:',
    order: 21,
    type: 'customerInsight',
    answers: [
      {
        answer: 'Strongly disagree',
        points: 0,
      },
      {
        answer: 'Disagree',
        points: 0,
      },
      {
        answer: 'Unsure',
        points: 0,
      },
      {
        answer: 'Agree',
        points: 1,
      },
      {
        answer: 'Strongly agree',
        points: 2,
      },
    ],
  },
  {
    question: 'How would you best define your customer wants?',
    order: 22,
    type: 'customerInsight',
    answers: [
      {
        answer: 'Analysis of demographic data (e.g. age)',
        points: 0,
      },
      {
        answer:
          'Analysis of psychographic traits (e.g. desire to be respected by others)',
        points: 2,
      },
      {
        answer: 'Using existing assumptions within your company',
        points: 0,
      },
    ],
  },
  {
    question:
      'What might your first step be to validate a new product or feature idea?',
    order: 23,
    type: 'customerInsight',
    answers: [
      {
        answer: 'Speak to people at my company/on my team',
        points: 0,
      },
      {
        answer: 'Speak to people in your target customer group',
        points: 2,
      },
    ],
  },
  {
    question: 'What might you do to differentiate your product offer?',
    order: 24,
    type: 'customerInsight',
    answers: [
      {
        answer:
          'Research competitors in the space to see what value they promise their customers',
        points: 2,
      },
      {
        answer: 'Come up with a motivational product vision',
        points: 0,
      },
    ],
  },
];
