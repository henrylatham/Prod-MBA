import mixpanel from 'mixpanel-browser';

mixpanel.init('b66343d4eb034bb50462251c38c76304');

const currentEnvironment = process.env.NODE_ENV === 'production';

const actions = {
  identify: id => {
    if (currentEnvironment) mixpanel.identify(id);
  },
  alias: id => {
    if (currentEnvironment) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (currentEnvironment) mixpanel.track(name, props);
  },
  people: {
    set: props => {
      if (currentEnvironment) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
