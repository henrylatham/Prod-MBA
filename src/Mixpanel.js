import mixpanel from 'mixpanel-browser';

mixpanel.init('87c62ae60a6aad4c516c50d0fe7ceae6');

const currentEnvironment = process.env.NODE_ENV === 'development';

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
