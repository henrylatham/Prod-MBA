// @TODO - Henry Define Quiestions and Questions sections

export const QuestionsDataset = {
  productStrategy: {
    questions: [
      "My decisions result in significant strategic impact within organisations I work with",
      "I am an expert at balancing user and business needs",
      "I understand why trends are occuoring in my product data and what they mean",
      "I deliver features that achieve the wider business goals",
      "I have been a key contributor to product visions",
      "Every feature I deliver moves my team closer to our strategic goals",
      "My roadmap aligns the companies strategic goals",
    ],
  },
  execution: {
    questions: [
      "Teams I work with understand precisly the feature my user stories describe",
      "The technical teams I manage always deliver what I was expecting ",
      "I know how to launch a new product or feature for maximum success",
      "I have achieved an optimal balance when delivering products across time, quality & performance",
      "I can break a complex feature down into easily actionable iterations",
      "I have achieved product market fit",
      "I'm able to quickly adapt to new tools to help me do my job better",
    ],
  },
  influencer: {
    questions: [
      "People I have managed would say I inspire them",
      "I can confidently deliver performance reports on my product to c-suite/investors",
      "I'm confident managing difficult stakeholder relationships",
      "My leadership enables my team to perform their best",
      "I know who to talk to & how to get things done at my organisation",
      "I have clearly defined KPIs/OKRs for my project",
      "I understand the value of setting KPIs/OKRs",
    ],
  },
  customerInsight: {
    questions: [
      "I'm comfortable finding meaningful insights in complex data",
      "I know how to get to the root of a users problem and translate that into a great solution",
      "I know precisely what my customers want.",
      "I can translate data into an actionable product feature improvement",
      "I use a wide range of tools & methods to talk to my users",
      "I understand what User Experience Design is",
      "I have used creative or unconventional methods to better understand my users or potential users",
    ],
  },
}

export const TITLES = {
  productStrategy: "The Strategist",
  execution: "The Executioner",
  influencer: "The Influencer",
  customerInsight: "The Influencer",
  allRounder: "The All Rounder",
  student: "The Student",
}

export const QuestionsDatasetOrder = ['productStrategy', 'execution', 'influencer', 'customerInsight'];
export const TotalOutcomeLimit = 65;
export const DiffMargin = 5;
