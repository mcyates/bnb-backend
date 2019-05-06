import { booking } from "./Mutation/booking";
import { IResolvers } from "graphql-tools";
import Query from "./Query";
import { listing } from "./Mutation/listing";
import { user } from "./Mutation/user";
import { review } from "./Mutation/review";
const resolvers: IResolvers = {
	Query,
	Mutation: {
		...booking,
		...listing,
		...review,
		...user
	}
};

export { resolvers };
