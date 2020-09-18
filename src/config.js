// dev config variables name
const dev = {
  hostName: 'https://zhweyzgnzg.execute-api.us-east-2.amazonaws.com/prod',
  // hostName: 'http://localhost:5001',
};

// production variables name
const prod = {
  hostName: 'https://zhweyzgnzg.execute-api.us-east-2.amazonaws.com/prod',
  // hostName: 'http://localhost:5001',
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

// export the default configuration
export default {
  ...config,
};
