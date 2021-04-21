import ReactPixel from 'react-facebook-pixel';

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

ReactPixel.init('2514357432204795', options);

const currentEnvironment = process.env.NODE_ENV === 'production'; // development

const actions = {
  track: (event, data) => {
    if (currentEnvironment) ReactPixel.track(event, data);
  },
};

export const FacebookPixel = actions;
