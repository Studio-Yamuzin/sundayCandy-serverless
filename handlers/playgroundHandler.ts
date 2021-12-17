import { main as graphqlHandler } from './graphqlHandler';

const lambdaPlayground = require('graphql-playground-middleware-lambda').default;

export const service = graphqlHandler;

export const main = lambdaPlayground({
  endpoint: '/dev',
});
