import { IResolvers } from 'graphql-tools';
import Query from './Query'
import { user} from './Mutation/user';

const resolvers: IResolvers = {
  Query,
  Mutation: {
    ...user
  }
}

export {resolvers};